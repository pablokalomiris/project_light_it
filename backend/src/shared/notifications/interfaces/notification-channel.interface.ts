export interface NotificationChannel {
  sendPatientConfirmation(to: string, fullName: string): Promise<void>;
}
