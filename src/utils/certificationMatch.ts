import { CertificationItem, SkillCompetencyId } from '../types/portfolio';

export const getCertificationSkillCategory = (cert: CertificationItem): SkillCompetencyId => {
  if (
    cert.skillCategoryId === 'data-tech' ||
    cert.skillCategoryId === 'hr-domain' ||
    cert.skillCategoryId === 'languages'
  ) {
    return cert.skillCategoryId;
  }

  const text = `${cert.id} ${cert.name} ${cert.issuer || ''}`.toLowerCase();

  if (
    cert.category === 'lang' ||
    /(jlpt|opic|toeic|toefl|hsk|teps|jpt|ielts|일본어|영어|중국어|어학)/.test(text)
  ) {
    return 'languages';
  }

  if (
    /(연말정산|급여|payroll|인사|노무|채용|hrm|tax|세무|회계|4대보험|사회보험|전산세무|전산회계|재경|tat|fat)/.test(
      text
    )
  ) {
    return 'hr-domain';
  }

  return 'data-tech';
};
