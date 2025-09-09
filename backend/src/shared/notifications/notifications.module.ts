import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { EmailNotificationService } from './email-notification.service';
import { NotificationsService } from './notifications.service';
import { SMSNotificationService } from './sms-notification.service';

@Module({
  imports: [EmailModule],
  providers: [
    NotificationsService,
    EmailNotificationService,
    SMSNotificationService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
