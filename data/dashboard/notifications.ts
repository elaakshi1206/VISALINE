export type NotificationCategory = 'status' | 'action' | 'info' | 'document';

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  date: string;
  isRead: boolean;
  applicationId?: string;
  actionRequired?: boolean;
  actionLabel?: string;
}

export const mockNotifications: DashboardNotification[] = [
  {
    id: 'notif-001',
    title: 'Application Submitted Successfully',
    message: 'Your Tourist eVisa application (IND123456) has been submitted successfully. You will receive updates as your application progresses.',
    category: 'status',
    date: 'Today, 10:42 AM',
    isRead: false,
    applicationId: 'app-001',
  },
  {
    id: 'notif-002',
    title: 'Passport Document Verified',
    message: 'Your passport document for application IND123456 has been verified successfully.',
    category: 'document',
    date: 'Yesterday',
    isRead: false,
    applicationId: 'app-001',
  },
  {
    id: 'notif-003',
    title: 'Action Required — Additional Document',
    message: 'Your Business eVisa application (IND123789) requires an additional document before processing can continue. Please upload your business invitation letter.',
    category: 'action',
    date: '2 days ago',
    isRead: false,
    applicationId: 'app-002',
    actionRequired: true,
    actionLabel: 'Upload Document',
  },
  {
    id: 'notif-004',
    title: 'Important Visa Update',
    message: 'The Government of India has updated the list of eligible nationalities for e-Medical Visa. Please review the updated eligibility criteria before submitting a new application.',
    category: 'info',
    date: '3 days ago',
    isRead: true,
  },
];
