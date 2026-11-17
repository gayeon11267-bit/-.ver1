import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InquiryNotifyPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  type?: 'interview' | 'coffee_chat' | 'project' | 'other';
  message?: string;
}

const TYPE_LABELS: Record<string, string> = {
  interview: '정규직 채용 / 면접 제안',
  coffee_chat: '가벼운 커피챗 제안',
  project: '인턴십 / 채용연계 제안',
  other: '기타 협업 및 문의',
};

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeHeaderText = (str: string): string =>
  str.replace(/[\r\n]+/g, ' ').trim();

async function createServer() {
  const app = express();
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(express.json({ limit: '200kb' }));

  // Send email notification to owner's Google Mail when an inquiry is submitted
  app.post('/api/notify-inquiry', async (req: Request, res: Response) => {
    const body = (req.body || {}) as InquiryNotifyPayload;
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
    const company = typeof body.company === 'string' ? body.company.trim().slice(0, 160) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 50) : '';
    const type = typeof body.type === 'string' && TYPE_LABELS[body.type] ? body.type : 'other';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : '';

    if (!name || !email || !message) {
      res.status(400).json({ ok: false, error: 'Missing required fields' });
      return;
    }

    const typeLabel = TYPE_LABELS[type];
    const toEmail = (process.env.NOTIFY_TO_EMAIL || process.env.GMAIL_USER || 'gayeon11267@gmail.com').trim();
    const gmailUser = (process.env.GMAIL_USER || toEmail).trim();
    const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

    const subject = sanitizeHeaderText(
      `[포트폴리오 ${typeLabel}] ${name}${company ? ` (${company})` : ''}`
    );

    const kstTimestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const plainText = [
      `새로운 포트폴리오 제안이 도착했습니다.`,
      ``,
      `■ 제안 유형: ${typeLabel}`,
      `■ 보낸 분: ${name}`,
      `■ 소속/회사: ${company || '(미입력)'}`,
      `■ 회신 이메일: ${email}`,
      `■ 연락처: ${phone || '(미입력)'}`,
      `■ 접수 시각(KST): ${kstTimestamp}`,
      ``,
      `[메시지 내용]`,
      message,
      ``,
      `---`,
      `이 메일에 바로 답장하시면 ${email} 주소로 회신됩니다.`,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #0f172a;">
        <div style="background: #0b1120; padding: 24px 28px; color: #ffffff;">
          <div style="font-size: 12px; font-weight: 700; color: #60a5fa; letter-spacing: 0.06em; margin-bottom: 6px;">
            LEE GAYEON · PORTFOLIO PROPOSAL
          </div>
          <h2 style="margin: 0; font-size: 20px; font-weight: 800;">
            ${escapeHtml(typeLabel)}이 도착했습니다
          </h2>
        </div>

        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 110px; font-weight: 600;">보낸 분</td>
              <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">소속 / 회사</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(company || '미입력')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">회신 이메일</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${escapeHtml(email)}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">연락처</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(phone || '미입력')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">접수 시각</td>
              <td style="padding: 8px 0; color: #475569;">${escapeHtml(kstTimestamp)} (KST)</td>
            </tr>
          </table>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
            <div style="font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 8px;">메시지 내용</div>
            <div style="font-size: 14px; line-height: 1.65; color: #1e293b; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>

          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
            이 메일에 바로 <strong>답장</strong>을 누르시면 제안하신 분(${escapeHtml(email)})에게 즉시 회신됩니다.
          </p>
        </div>
      </div>
    `;

    // Primary transport: Gmail SMTP via Google App Password
    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        await transporter.sendMail({
          from: `"포트폴리오 제안 알림" <${gmailUser}>`,
          to: toEmail,
          replyTo: sanitizeHeaderText(email),
          subject,
          text: plainText,
          html: htmlBody,
        });

        res.json({ ok: true, emailed: true, provider: 'gmail' });
        return;
      } catch (err) {
        console.error('Gmail SMTP send failed:', err);
        res.status(502).json({
          ok: false,
          emailed: false,
          error: err instanceof Error ? err.message : 'SMTP delivery failed',
        });
        return;
      }
    }

    // Optional fallback transport: Resend API if configured
    const resendKey = (process.env.RESEND_API_KEY || '').trim();
    if (resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
            to: [toEmail],
            reply_to: sanitizeHeaderText(email),
            subject,
            text: plainText,
            html: htmlBody,
          }),
        });

        if (!resendRes.ok) {
          const text = await resendRes.text();
          throw new Error(`Resend API error ${resendRes.status}: ${text}`);
        }

        res.json({ ok: true, emailed: true, provider: 'resend' });
        return;
      } catch (err) {
        console.error('Resend API send failed:', err);
        res.status(502).json({
          ok: false,
          emailed: false,
          error: err instanceof Error ? err.message : 'Resend delivery failed',
        });
        return;
      }
    }

    // Not configured yet: do not block visitor submission (Firestore still records it)
    res.json({ ok: true, emailed: false, reason: 'email_credentials_not_configured' });
  });

  const distDir = path.resolve(__dirname, 'dist');
  const distIndex = path.join(distDir, 'index.html');
  const isDevMode = process.argv.includes('--dev');

  if (!isDevMode && fs.existsSync(distIndex)) {
    app.use('/src/assets/images', express.static(path.resolve(__dirname, 'src/assets/images')));
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(distIndex);
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

void createServer();
