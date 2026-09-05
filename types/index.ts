// Visa Types
export type VisaCategory = 
  | 'e-tourist' 
  | 'e-business' 
  | 'e-medical' 
  | 'e-medical-attendant'
  | 'e-student'
  | 'e-family'
  | 'e-transit'
  | 'e-miscellaneous';

export type VisaType = 'evisa' | 'regular' | 'arrival-card' | 'visa-on-arrival';

export type VisaDuration = '30-days' | '1-year' | '5-years' | '6-months' | '3-months';

export type VisaPurpose = 
  | 'tourism'
  | 'business'
  | 'medical'
  | 'education'
  | 'family'
  | 'transit'
  | 'conference'
  | 'other';

export interface VisaCategoryDetail {
  id: VisaCategory;
  title: string;
  code: string;
  description: string;
  icon: string;
  durations: DurationOption[];
  maxStay: string;
  entries: string;
  documents: string[];
  color: string;
}

export interface DurationOption {
  label: string;
  value: string;
  code: string;
  fee: string;
}

// Application Types
export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under-verification'
  | 'processing'
  | 'decision-made'
  | 'approved'
  | 'rejected';

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface ApplicationFormData {
  // Step 1: Visa Type
  visaType: VisaType;
  visaCategory: VisaCategory;
  visaDuration: string;
  travelPurpose: VisaPurpose;
  
  // Step 2: Applicant Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  email: string;
  phone: string;
  occupation: string;
  
  // Step 3: Passport Details
  passportNumber: string;
  passportType: string;
  passportIssueDate: string;
  passportExpiry: string;
  passportIssuingCountry: string;
  placeOfBirth: string;
  countryOfBirth: string;
  
  // Step 4: Travel Information
  expectedArrival: string;
  expectedDeparture: string;
  portOfArrival: string;
  addressInIndia: string;
  cityInIndia: string;
  lastCountryVisited: string;
  
  // Step 5: Additional Information
  hasCriminalRecord: boolean;
  previouslyRejected: boolean;
  visitedInLast10Years: boolean;
  referenceInIndia: string;
  
  // Step 6: Documents
  passportPhoto: File | null;
  passportCopy: File | null;
  supportingDoc: File | null;
}

// Status Types
export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  applicantName: string;
  visaType: VisaType;
  visaCategory: string;
  submissionDate: string;
  status: ApplicationStatus;
  passportNumber: string;
  nationality: string;
  processingDate?: string;
  decisionDate?: string;
}

export interface StatusTimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

// Country Types
export interface Country {
  code: string;
  name: string;
  flag: string;
  eligible: boolean;
  voaEligible?: boolean;
}

// FAQ Types
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

// Advisory Types
export interface Advisory {
  id: string;
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'danger';
  date: string;
  category: string;
}

// Dashboard Types
export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

// Payment Types
export interface PaymentSummary {
  visaType: string;
  visaCategory: string;
  applicantName: string;
  applicationFee: number;
  serviceFee: number;
  currency: string;
}
