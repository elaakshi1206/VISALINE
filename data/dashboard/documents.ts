export type DocumentStatus = 'uploaded' | 'required' | 'rejected' | 'under_review';

export interface DashboardDocument {
  id: string;
  name: string;
  type: string;
  status: DocumentStatus;
  uploadDate?: string;
  fileType?: string;
  fileSize?: string;
  applicationId?: string;
}

export const mockDocuments: DashboardDocument[] = [
  {
    id: 'doc-001',
    name: 'Passport (Bio Page)',
    type: 'passport',
    status: 'uploaded',
    uploadDate: '04 Sep 2026',
    fileType: 'PDF',
    fileSize: '256 KB',
    applicationId: 'app-001',
  },
  {
    id: 'doc-002',
    name: 'Recent Passport Photo',
    type: 'photo',
    status: 'uploaded',
    uploadDate: '04 Sep 2026',
    fileType: 'JPEG',
    fileSize: '120 KB',
    applicationId: 'app-001',
  },
  {
    id: 'doc-003',
    name: 'Business Invitation Letter',
    type: 'supporting',
    status: 'required',
    applicationId: 'app-002',
  },
  {
    id: 'doc-004',
    name: 'Passport (Bio Page)',
    type: 'passport',
    status: 'uploaded',
    uploadDate: '02 Sep 2026',
    fileType: 'PDF',
    fileSize: '280 KB',
    applicationId: 'app-002',
  },
  {
    id: 'doc-005',
    name: 'Recent Passport Photo',
    type: 'photo',
    status: 'under_review',
    uploadDate: '02 Sep 2026',
    fileType: 'JPEG',
    fileSize: '98 KB',
    applicationId: 'app-002',
  },
];

export function getDocStatusLabel(status: DocumentStatus): string {
  const labels: Record<DocumentStatus, string> = {
    uploaded: 'Uploaded',
    required: 'Required',
    rejected: 'Rejected',
    under_review: 'Under Review',
  };
  return labels[status];
}

export function getDocStatusColor(status: DocumentStatus): string {
  const colors: Record<DocumentStatus, string> = {
    uploaded: 'bg-emerald-100 text-emerald-700',
    required: 'bg-red-100 text-red-700',
    rejected: 'bg-red-100 text-red-700',
    under_review: 'bg-amber-100 text-amber-700',
  };
  return colors[status];
}
