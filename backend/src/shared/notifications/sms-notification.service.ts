import { Injectable } from '@nestjs/common';
import { NotificationChannel } from './interfaces/notification-channel.interface';

@Injectable()
export class SMSNotificationService implements NotificationChannel {
  async sendPatientConfirmation(to: string, fullName: string) {
    await Promise.resolve();
    console.log(`SMS to ${to}: Hello ${fullName}, registration successful!`);
  }
}
