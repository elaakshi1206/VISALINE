export interface ApplicantProfile {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  passportNo: string; // masked
  avatar?: string;
  createdDate: string;
}

export const mockProfile: ApplicantProfile = {
  fullName: 'Elaakshi Walondre',
  email: 'elaakshiwalondre@example.com',
  phone: '+1 (555) 000-1234',
  nationality: 'American',
  dateOfBirth: '15 Mar 1990',
  passportNo: '••••••1234',
  createdDate: 'January 2025',
};
