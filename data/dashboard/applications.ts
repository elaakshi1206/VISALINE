// Mock data for dashboard — replace with API calls in production

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'verification'
  | 'processing'
  | 'action_required'
  | 'approved'
  | 'rejected'
  | 'completed';

export interface ApplicationStep {
  id: number;
  label: string;
  date?: string;
  active: boolean;
  completed: boolean;
}

export interface Application {
  id: string;
  applicationNo: string;
  visaType: string;
  visaCategory: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdated: string;
  nationality: string;
  passportNo: string; // masked display
  travelDate?: string;
  portOfEntry?: string;
  progress?: number; // for drafts, 0-100
  draftSections?: string[];
  lastSaved?: string;
  steps: ApplicationStep[];
  paymentAmount?: string;
  paymentStatus?: 'paid' | 'pending' | 'refunded';
  decisionDate?: string;
  visaNo?: string;
  remarks?: string;
}

export const mockApplications: Application[] = [
  {
    id: 'app-001',
    applicationNo: 'IND123456',
    visaType: 'Tourist eVisa',
    visaCategory: 'e-Tourist Visa',
    status: 'processing',
    submittedDate: '04 Sep 2026',
    lastUpdated: '05 Sep 2026, 11:42 AM',
    nationality: 'United States',
    passportNo: '••••••1234',
    travelDate: '20 Sep 2026',
    portOfEntry: 'Indira Gandhi International Airport, Delhi',
    paymentAmount: '₹2,500',
    paymentStatus: 'paid',
    steps: [
      { id: 1, label: 'Submitted', date: '04 Sep 2026, 10:15 AM', active: false, completed: true },
      { id: 2, label: 'Verified', date: '04 Sep 2026, 3:00 PM', active: false, completed: true },
      { id: 3, label: 'Processing', date: '05 Sep 2026, 9:00 AM', active: true, completed: false },
      { id: 4, label: 'Decision', date: undefined, active: false, completed: false },
      { id: 5, label: 'Completed', date: undefined, active: false, completed: false },
    ],
  },
  {
    id: 'app-002',
    applicationNo: 'IND123789',
    visaType: 'Business eVisa',
    visaCategory: 'e-Business Visa',
    status: 'action_required',
    submittedDate: '02 Sep 2026',
    lastUpdated: '05 Sep 2026, 8:00 AM',
    nationality: 'United Kingdom',
    passportNo: '••••••5678',
    travelDate: '15 Sep 2026',
    portOfEntry: 'Chhatrapati Shivaji International Airport, Mumbai',
    paymentAmount: '₹2,500',
    paymentStatus: 'paid',
    remarks: 'Additional document required: Business invitation letter.',
    steps: [
      { id: 1, label: 'Submitted', date: '02 Sep 2026, 9:00 AM', active: false, completed: true },
      { id: 2, label: 'Verified', date: '03 Sep 2026, 2:00 PM', active: false, completed: true },
      { id: 3, label: 'Processing', date: '04 Sep 2026', active: false, completed: true },
      { id: 4, label: 'Action Required', date: '05 Sep 2026, 8:00 AM', active: true, completed: false },
      { id: 5, label: 'Completed', date: undefined, active: false, completed: false },
    ],
  },
  {
    id: 'app-003',
    applicationNo: 'DRAFT-001',
    visaType: 'Business Visa',
    visaCategory: 'e-Business Visa',
    status: 'draft',
    submittedDate: '',
    lastUpdated: '',
    nationality: 'United States',
    passportNo: '••••••1234',
    progress: 60,
    lastSaved: 'Today, 1:42 PM',
    draftSections: ['Travel Information', 'Documents', 'Review'],
    steps: [],
  },
];

export const mockApplicationHistory: Application[] = [
  {
    id: 'hist-001',
    applicationNo: 'IND987654',
    visaType: 'Tourist eVisa',
    visaCategory: 'e-Tourist Visa',
    status: 'completed',
    submittedDate: '01 Jun 2026',
    lastUpdated: '12 Jun 2026',
    nationality: 'United States',
    passportNo: '••••••1234',
    visaNo: 'VN-2026-987654',
    paymentAmount: '₹2,500',
    paymentStatus: 'paid',
    steps: [],
  },
  {
    id: 'hist-002',
    applicationNo: 'IND876543',
    visaType: 'Business eVisa',
    visaCategory: 'e-Business Visa',
    status: 'rejected',
    submittedDate: '10 Mar 2026',
    lastUpdated: '18 Mar 2026',
    nationality: 'United States',
    passportNo: '••••••1234',
    remarks: 'Incomplete documentation. Missing invitation letter.',
    paymentAmount: '₹2,500',
    paymentStatus: 'refunded',
    steps: [],
  },
];

export function getStatusLabel(status: ApplicationStatus): string {
  const labels: Record<ApplicationStatus, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    verification: 'Under Verification',
    processing: 'Under Processing',
    action_required: 'Action Required',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed',
  };
  return labels[status];
}

export function getStatusColor(status: ApplicationStatus): string {
  const colors: Record<ApplicationStatus, string> = {
    draft: 'bg-slate-100 text-slate-600',
    submitted: 'bg-blue-100 text-blue-700',
    verification: 'bg-indigo-100 text-indigo-700',
    processing: 'bg-amber-100 text-amber-700',
    action_required: 'bg-red-100 text-red-700',
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
    completed: 'bg-emerald-100 text-emerald-700',
  };
  return colors[status];
}
