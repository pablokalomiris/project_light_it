import { Injectable } from '@nestjs/common';
import { NotificationChannel } from './interfaces/notification-channel.interface';
import { EmailService } from '../email/email.service';

@Injectable()
export class EmailNotificationService implements NotificationChannel {
  constructor(private readonly emailService: EmailService) {}

  async sendPatientConfirmation(to: string, fullName: string) {
    await this.emailService.sendPatientConfirmation(to, fullName);
  }
}
