import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientsController } from './patients.controller';
import { EmailModule } from 'src/shared/email/email.module';
import { EmailNotificationService } from 'src/shared/notifications/email-notification.service';
// import { SMSNotificationService } from 'src/shared/notifications/sms-notification.service';
import { NotificationsService } from 'src/shared/notifications/notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), EmailModule],
  providers: [
    PatientsService,
    EmailNotificationService,
    // SMSNotificationService,
    {
      provide: NotificationsService,
      useFactory: (
        email: EmailNotificationService,
        // sms: SMSNotificationService
      ) => {
        const channels = [email];
        return new NotificationsService(channels);
      },
      inject: [
        EmailNotificationService,
        // SMSNotificationService
      ],
    },
  ],
  controllers: [PatientsController],
  exports: [PatientsService],
})
export class PatientsModule {}
