import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Language, translations } from '../data/translations';
import { X, Download, ExternalLink, FileCheck, CheckCircle2, BookOpen, Loader2, Globe } from 'lucide-react';

export const TranscriptModal: React.FC = () => {
  const { isTranscriptOpen, setIsTranscriptOpen, language } = usePortfolio();
  const [downloadLang, setDownloadLang] = useState<Language>(language);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync default filename language whenever site language changes or modal opens
  useEffect(() => {
    setDownloadLang(language);
  }, [language, isTranscriptOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTranscriptOpen) {
        setIsTranscriptOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTranscriptOpen, setIsTranscriptOpen]);

  if (!isTranscriptOpen) return null;

  // Keep modal content consistently in Korean while changing downloaded filename by selected language
  const koT = translations.ko.transcriptModal;
  const activeFileName = translations[downloadLang].transcriptModal.fileName;

  const pdfUrl = '/assets/aistudio/_______________________3fb06eab.pdf';
  const currentPdfSrc = pdfUrl;

  const fileLangOptions: { code: Language; label: string }[] = [
    { code: 'ko', label: '한국어 (KR)' },
    { code: 'en', label: '영어 (EN)' },
    { code: 'ja', label: '일본어 (JP)' },
  ];

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const targetFileName = activeFileName;
    setDownloadStatus('loading');
    setToastMessage(`"${targetFileName}" 다운로드 준비 중...`);

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const fileBlob = new Blob([blob], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(fileBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = targetFileName;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();

      setTimeout(() => {
        if (document.body.contains(downloadLink)) {
          document.body.removeChild(downloadLink);
        }
        window.URL.revokeObjectURL(blobUrl);
      }, 3000);

      setDownloadStatus('success');
      setToastMessage(`✓ "${targetFileName}" 다운로드가 시작되었습니다.`);
      setTimeout(() => {
        setDownloadStatus('idle');
        setToastMessage(null);
      }, 4000);
    } catch (err) {
      console.warn('Blob download error, opening direct PDF fallback', err);
      window.open(pdfUrl, '_blank');
      setDownloadStatus('idle');
      setToastMessage('새 탭에서 원본 문서를 열었습니다. 브라우저 저장 버튼을 사용해주세요.');
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const gradeCourses = [
    { nameKo: '일본어연습 III (Practicum in Japanese III)', grade: '秀 (S)', points: '90~100점', credits: '1학점' },
    { nameKo: '사회심리학 (Social Psychology)', grade: '優 (A)', points: '80~89점', credits: '2학점' },
    { nameKo: '중소기업론 (Small Business Theory)', grade: '優 (A)', points: '80~89점', credits: '2학점' },
    { nameKo: '글로벌기업론 (Global Corporations)', grade: '優 (A)', points: '80~89점', credits: '2학점' },
    { nameKo: '리스크매니지먼트론 (Risk Management)', grade: '秀 (S)', points: '90~100점', credits: '2학점' },
    { nameKo: '소셜 마케팅 (Social Marketing)', grade: '秀 (S)', points: '90~100점', credits: '2학점' },
    { nameKo: '일본어 DI (Japanese DI)', grade: '秀 (S)', points: '90~100점', credits: '1학점' },
    { nameKo: '환경회계론 (Green Accounting)', grade: '秀 (S)', points: '90~100점', credits: '2학점' },
    { nameKo: '소비자행동론 I (Consumer Behavior I)', grade: '秀 (S)', points: '90~100점', credits: '2학점' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1120]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsTranscriptOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification if triggered */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            {downloadStatus === 'loading' ? (
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            ) : downloadStatus === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <ExternalLink className="w-4 h-4 text-blue-400" />
            )}
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Top Header (Korean Content) */}
        <div className="relative bg-[#0B1120] text-white p-6 sm:p-8 border-b border-slate-800 shrink-0">
          <button
            onClick={() => setIsTranscriptOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label={koT.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-400 mb-2">
            <span className="font-bold">{koT.badge}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-slate-300">{koT.institution}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {koT.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-3xl">
            {koT.subtitle}
          </p>

          {/* Quick Metrics & Actions Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs">
                <span className="text-slate-400 font-medium">이수 학점: </span>
                <strong className="text-emerald-400 font-extrabold">{koT.summaryUnits}</strong>
              </div>
              <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs">
                <span className="text-slate-400 font-medium">평가 등급: </span>
                <strong className="text-blue-400 font-extrabold">{koT.summaryGrades}</strong>
              </div>
              <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs">
                <strong className="text-amber-400 font-extrabold">{koT.summaryStatus}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Language Selector for Download Filename */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-700 rounded-xl">
                <span className="px-2 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-blue-400" />
                  <span>파일명:</span>
                </span>
                {fileLangOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setDownloadLang(opt.code)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                      downloadLang === opt.code
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleDownload}
                disabled={downloadStatus === 'loading'}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-75"
                title={`${activeFileName} 다운로드`}
              >
                {downloadStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    <span>다운로드 중...</span>
                  </>
                ) : downloadStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">다운로드 완료!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>{koT.downloadBtn}</span>
                  </>
                )}
              </button>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700 cursor-pointer"
                title="새 탭에서 원본 열기"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{koT.openNewTabBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Unified Document Info & Direct Download Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
                <FileCheck className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {koT.docNotice}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {koT.docPagesSummary}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-500">저장 파일명:</span>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all cursor-pointer hover:shadow-xs group"
                title="클릭하여 파일 즉시 다운로드"
              >
                <Download className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
                <span>{activeFileName}</span>
              </button>
            </div>
          </div>

          {/* Quick Notice & Direct Tab Link for Iframe Users */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-600">💡 Tip:</span>
              <span>브라우저 환경에 따라 다운로드가 즉시 반응하지 않을 경우, 우측의 <strong>[새 탭에서 열기 &amp; 인쇄/저장]</strong>을 누르시면 새 창에서 원본 PDF 전체(3페이지)를 즉시 확인 및 저장(Ctrl+S)하실 수 있습니다.</span>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 hover:underline shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{koT.openNewTabBtn}</span>
            </a>
          </div>

          {/* Interactive Document Viewer Canvas */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-inner relative flex flex-col items-center justify-center min-h-[480px]">
            <object
              data={currentPdfSrc}
              type="application/pdf"
              className="w-full h-[620px] rounded-2xl"
            >
              {/* Fallback iframe */}
              <iframe
                src={currentPdfSrc}
                title="Academic Transcript Preview"
                className="w-full h-[620px] rounded-2xl border-0"
              >
                <div className="p-8 text-center space-y-4">
                  <p className="text-sm text-slate-600">브라우저 내 PDF 뷰어를 지원하지 않는 환경입니다.</p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{koT.downloadBtn}</span>
                  </button>
                </div>
              </iframe>
            </object>
          </div>

          {/* Detailed Coursework & Grades Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>가나가와대학교 이수 교과목 및 성적 상세 (총 16학점)</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-md">
                전 9과목 최우수 (S·A)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {gradeCourses.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200/90 rounded-xl flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {c.nameKo}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {c.credits} · {c.points}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                      c.grade.includes('S')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {c.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">인증 기관:</span>
            <span>가나가와대학교 (Kanagawa University) 총장 직인 날인 완료</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              title="클릭하여 파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {downloadStatus === 'loading'
                  ? '다운로드 중...'
                  : downloadStatus === 'success'
                  ? '✓ 다운로드 완료'
                  : `${koT.downloadBtn} (${activeFileName})`}
              </span>
            </button>
            <button
              onClick={() => setIsTranscriptOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
            >
              {koT.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
