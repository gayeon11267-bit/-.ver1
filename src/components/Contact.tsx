import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, Linkedin, GraduationCap, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, addInquiry, t } = usePortfolio();
  const { contact, hero } = data;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'interview' as 'interview' | 'coffee_chat' | 'project' | 'other',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || submitting) return;

    setSubmitting(true);
    try {
      await addInquiry(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        type: 'interview',
        message: '',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="animate-in fade-in duration-200">
      {/* Dedicated Page Header Banner */}
      <section className="bg-[#0B1120] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <span>DEDICATED PAGE</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>{t.contact.dedicatedTag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.contact.pageTitle}
            </h1>
            <p className="text-base text-slate-300 max-w-2xl font-normal">
              {t.contact.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  {t.contact.directKicker}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {t.contact.directTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {t.contact.closingSubcopy || contact.closingSubcopy}
                </p>
              </div>

              {/* Direct Contact Details Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  CONTACT CHANNELS
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">{t.contact.emailLabel}</div>
                      <div className="text-sm font-extrabold text-slate-900">{contact.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title={t.contact.copyEmailTitle}
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`mailto:${contact.email}?subject=[${hero.englishName}] ${t.contact.directTitle}`}
                      className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-sm"
                    >
                      {t.contact.writeEmailBtn}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold">{t.contact.phoneLabel}</div>
                    <div className="text-sm font-extrabold text-slate-900">{contact.phone}</div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-900/10 text-blue-700 flex items-center justify-center font-bold">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">LinkedIn</div>
                      <div className="text-sm font-extrabold text-slate-900">in/gayeon-lee2003</div>
                    </div>
                  </div>
                  <a
                    href={contact.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold"
                  >
                    {t.contact.openProfileBtn}
                  </a>
                </div>

                {/* Academic Status & Availability (No Street Address) */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    {t.contact.locationValue}
                  </span>
                  <span className="text-emerald-600 font-bold">{t.contact.statusValue || contact.availableStatus}</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-page Proposal Submission Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200">
              <div className="mb-7">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  {t.contact.formKicker}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {t.contact.formDesc}
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900">
                    {t.contact.successTitle}
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                    {t.contact.successDesc}
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                    >
                      {t.contact.additionalBtn}
                    </button>
                    <a
                      href={`mailto:${contact.email}?subject=[제안 확인] ${hero.englishName} HR Specialist`}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all"
                    >
                      {t.contact.directMailBtn}
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.contact.fieldName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.contact.placeholderName}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.contact.fieldCompany}
                      </label>
                      <input
                        type="text"
                        placeholder={t.contact.placeholderCompany}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.contact.fieldEmail} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.contact.fieldPhone}
                      </label>
                      <input
                        type="tel"
                        placeholder={t.contact.placeholderPhone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.contact.fieldType}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'interview', label: t.contact.typeInterview },
                        { id: 'coffee_chat', label: t.contact.typeCoffeeChat },
                        { id: 'project', label: t.contact.typeProject },
                        { id: 'other', label: t.contact.typeOther },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setFormData({ ...formData, type: item.id as any })}
                          className={`py-2.5 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            formData.type === item.id
                              ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.contact.fieldMessage} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={t.contact.placeholderMessage}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-y font-normal"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">
                      {t.contact.formNotice}
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 rounded-xl transition-all shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{submitting ? '전송 중...' : t.contact.submitBtn}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
