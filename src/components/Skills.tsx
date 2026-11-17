import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Calculator, GraduationCap } from 'lucide-react';
import { getCertificationSkillCategory } from '../utils/certificationMatch';

export const Skills: React.FC = () => {
  const { data, displayCertifications, displayEducation, t, language } = usePortfolio();
  const skillCategories =
    language === 'ko' && data.skillCategories?.length > 0
      ? data.skillCategories
      : t.skills.skillCategories;
  const [activeTab, setActiveTab] = useState<string>(skillCategories[0]?.id || 'data-tech');

  // Interactive Recruiting & Payroll Practical Workbench State
  const [calculatorMode, setCalculatorMode] = useState<'payroll' | 'tax' | 'recruiting'>('payroll');

  // Monthly 4-Insurance Payroll Deduction Calculator State (in 10,000 KRW units)
  const [monthlyPay, setMonthlyPay] = useState<number>(300);
  const [taxFreeMeal, setTaxFreeMeal] = useState<number>(20);
  const cappedTaxFree = Math.min(20, Math.max(0, taxFreeMeal));
  const taxableMan = Math.max(0, monthlyPay - cappedTaxFree);
  const taxableKrw = taxableMan * 10000;
  const grossKrw = Math.max(0, monthlyPay) * 10000;
  const pensionKrw = Math.floor((taxableKrw * 0.045) / 10) * 10;
  const healthBaseKrw = Math.floor((taxableKrw * 0.03545) / 10) * 10;
  const longTermCareKrw = Math.floor((healthBaseKrw * 0.1295) / 10) * 10;
  const healthTotalKrw = healthBaseKrw + longTermCareKrw;
  const employmentKrw = Math.floor((taxableKrw * 0.009) / 10) * 10;
  const totalInsuranceKrw = pensionKrw + healthTotalKrw + employmentKrw;
  const netBeforeTaxKrw = Math.max(0, grossKrw - totalInsuranceKrw);
  const krwUnit = language === 'ko' ? '원' : language === 'ja' ? 'ウォン' : ' KRW';

  // Tax Deduction state
  const [annualSalary, setAnnualSalary] = useState<number>(4200);
  const [creditCardUse, setCreditCardUse] = useState<number>(1800);
  const threshold = Math.round(annualSalary * 0.25);
  const excess = Math.max(0, creditCardUse - threshold);
  const estimatedDeduction = Math.round(excess * 0.15);

  // Recruiting Funnel & Interview Attendance Calculator state
  const [applicants, setApplicants] = useState<number>(120);
  const [screened, setScreened] = useState<number>(24);
  const [attended, setAttended] = useState<number>(22);
  const passRate = applicants > 0 ? Math.min(100, (screened / applicants) * 100).toFixed(1) : '0.0';
  const attendRateNum = screened > 0 ? Math.min(100, (attended / screened) * 100) : 0;
  const attendRate = attendRateNum.toFixed(1);

  return (
    <div className="animate-in fade-in duration-200">
      {/* Dedicated Page Header Banner */}
      <section className="bg-[#0B1120] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <span>DEDICATED PAGE</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>{t.skills.dedicatedTag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.skills.pageTitle}
            </h1>
            <p className="text-base text-slate-300 max-w-2xl font-normal">
              {t.skills.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Tab Controls */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-10 overflow-x-auto">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {idx === 0 ? t.skills.tabData : idx === 1 ? t.skills.tabHR : t.skills.tabLang}
              </button>
            ))}
          </div>

          {/* Skills Cards Grid (Matched Certifications First per Competency) */}
          <div className="mb-16">
            {skillCategories
              .filter((cat) => cat.id === activeTab)
              .map((cat) => {
                const matchedCerts = displayCertifications.filter(
                  (cert) => getCertificationSkillCategory(cert) === cat.id
                );

                return (
                  <div key={cat.id} className="space-y-7">
                    <p className="text-sm text-slate-500 font-semibold">
                      {cat.description}
                    </p>

                    {/* Matched Certifications First */}
                    <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600 shrink-0" />
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                            {t.skills.matchedCertsLabel}
                          </h3>
                        </div>
                        <span className="text-xs font-extrabold text-blue-700 bg-white border border-blue-200 px-2.5 py-0.5 rounded-md tabular-nums">
                          {matchedCerts.length}{t.skills.matchedCertsCountSuffix}
                        </span>
                      </div>

                      {matchedCerts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {matchedCerts.map((item) => (
                            <div
                              key={item.id}
                              className="px-4 py-3.5 rounded-xl border border-blue-200/80 bg-white shadow-2xs flex items-center justify-between gap-3"
                            >
                              <div className="min-w-0 space-y-0.5">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                                  <h4 className="text-sm font-extrabold text-slate-900 truncate">
                                    {item.name}
                                  </h4>
                                  {item.score && (
                                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded shrink-0">
                                      {item.score}
                                    </span>
                                  )}
                                </div>
                                {item.issuer && (
                                  <div className="text-xs text-slate-500 pl-4 truncate">
                                    {item.issuer}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2.5 shrink-0">
                                <span className="text-xs font-bold text-slate-600 tabular-nums">
                                  {item.date}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 font-medium">
                          {t.skills.matchedCertsEmpty}
                        </p>
                      )}
                    </div>

                    {/* Competency Detail Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 hover:border-slate-300 hover:shadow-md transition-all space-y-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-xs font-bold text-blue-600 mb-1">
                                COMPETENCY 0{sIdx + 1}
                              </div>
                              <h3 className="text-lg font-extrabold text-slate-900">
                                {skill.name}
                              </h3>
                            </div>
                            {skill.badge && (
                              <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs shrink-0">
                                {skill.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-600 leading-relaxed font-normal">
                            {skill.description}
                          </p>

                          {/* Capabilities Highlights */}
                          <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                            <span className="font-bold text-slate-700">{t.skills.readinessLabel}</span>
                            <span className="text-slate-600 font-medium">{t.skills.readinessValue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Interactive Recruiting & Payroll Practical Workbench */}
          <div className="bg-[#0B1120] text-white rounded-3xl p-8 sm:p-10 mb-16 shadow-xl border border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>{t.skills.simulatorKicker}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {t.skills.simulatorTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {t.skills.simulatorDesc}
                </p>
              </div>

              {/* Mode switch */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-700 rounded-xl shrink-0">
                <button
                  onClick={() => setCalculatorMode('payroll')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    calculatorMode === 'payroll'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.skills.simPayroll}
                </button>
                <button
                  onClick={() => setCalculatorMode('tax')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    calculatorMode === 'tax'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.skills.simTax}
                </button>
                <button
                  onClick={() => setCalculatorMode('recruiting')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    calculatorMode === 'recruiting'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.skills.simRecruiting}
                </button>
              </div>
            </div>

            {/* Calculator Interactive Body */}
            {calculatorMode === 'payroll' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-xs text-blue-300 font-bold">{t.skills.simPayrollFormula}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.skills.simPayrollInput1}
                      </label>
                      <input
                        type="number"
                        value={monthlyPay}
                        onChange={(e) => setMonthlyPay(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.skills.simPayrollInput2}
                      </label>
                      <input
                        type="number"
                        max={20}
                        value={taxFreeMeal}
                        onChange={(e) => setTaxFreeMeal(Math.min(20, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    {t.skills.simPayrollTaxBaseLabel}{' '}
                    <span className="text-blue-400 tabular-nums">
                      {taxableMan.toLocaleString()} {t.skills.simTaxUnit} ({taxableKrw.toLocaleString()}{krwUnit})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.skills.simPayrollNote}
                  </p>
                </div>

                <div className="lg:col-span-6 bg-slate-900/90 border border-slate-700 p-6 rounded-2xl space-y-4">
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400 mb-1 font-bold">{t.skills.simPayrollPension}</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-100 tabular-nums">
                        {pensionKrw.toLocaleString()}{krwUnit}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400 mb-1 font-bold">{t.skills.simPayrollHealth}</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-100 tabular-nums">
                        {healthTotalKrw.toLocaleString()}{krwUnit}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400 mb-1 font-bold">{t.skills.simPayrollEmployment}</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-100 tabular-nums">
                        {employmentKrw.toLocaleString()}{krwUnit}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400 font-bold mb-1">{t.skills.simPayrollTotalDed}</div>
                      <div className="text-xl font-extrabold text-amber-400 tabular-nums">
                        -{totalInsuranceKrw.toLocaleString()}{krwUnit}
                      </div>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/60 text-center">
                      <div className="text-[11px] text-slate-400 font-bold mb-1">{t.skills.simPayrollNetBeforeTax}</div>
                      <div className="text-xl font-extrabold text-emerald-400 tabular-nums">
                        {netBeforeTaxKrw.toLocaleString()}{krwUnit}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {calculatorMode === 'tax' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="text-xs text-blue-300 font-bold">{t.skills.simTaxFormula}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{t.skills.simTaxInput1}</label>
                      <input
                        type="number"
                        value={annualSalary}
                        onChange={(e) => setAnnualSalary(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{t.skills.simTaxInput2}</label>
                      <input
                        type="number"
                        value={creditCardUse}
                        onChange={(e) => setCreditCardUse(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t.skills.simTaxNote}
                  </p>
                </div>

                <div className="md:col-span-5 bg-slate-900/90 border border-slate-700 p-6 rounded-2xl text-center space-y-2">
                  <div className="text-xs text-slate-400 font-bold">{t.skills.simTaxResult}</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
                    {estimatedDeduction.toLocaleString()} {t.skills.simTaxUnit}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {t.skills.simTaxThresholdText} ({threshold.toLocaleString()} {t.skills.simTaxUnit})
                  </div>
                </div>
              </div>
            )}

            {calculatorMode === 'recruiting' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="text-xs text-blue-300 font-bold">{t.skills.simRecruitFormula}</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{t.skills.simRecruitInput1}</label>
                      <input
                        type="number"
                        value={applicants}
                        onChange={(e) => setApplicants(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{t.skills.simRecruitInput2}</label>
                      <input
                        type="number"
                        value={screened}
                        onChange={(e) => setScreened(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">{t.skills.simRecruitInput3}</label>
                      <input
                        type="number"
                        value={attended}
                        onChange={(e) => setAttended(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t.skills.simRecruitNote}
                  </p>
                </div>

                <div className="md:col-span-5 bg-slate-900/90 border border-slate-700 p-6 rounded-2xl text-center space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl">
                      <div className="text-xs text-slate-400 mb-1 font-bold">{t.skills.simRecruitResult1}</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tabular-nums">
                        {passRate}%
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl">
                      <div className="text-xs text-slate-400 mb-1 font-bold">{t.skills.simRecruitResult2}</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
                        {attendRate}%
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-medium text-slate-300">
                    {attendRateNum >= 90 ? t.skills.simRecruitHigh : t.skills.simRecruitLow}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Education & Academic Exchange Section */}
          <div className="pt-8 border-t border-slate-200 mb-14">
            <div className="flex items-center gap-2.5 mb-8">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.skills.eduTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50 hover:bg-white hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>{edu.period}</span>
                      <span className="text-blue-600">{edu.status}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {edu.school}
                    </h4>
                    <div className="text-xs font-semibold text-slate-700">
                      {edu.major}
                    </div>
                    {edu.gpa && (
                      <div className="inline-block text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                        {edu.gpa}
                      </div>
                    )}
                    {edu.note && (
                      <p className="text-xs text-slate-500 leading-relaxed pt-1">{edu.note}</p>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Concise Certifications Section (자격증명 - 취득일) */}
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2.5 mb-8">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.skills.certsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayCertifications.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                      {item.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-600 tabular-nums">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
