import { Injectable } from '@nestjs/common';
import { NotificationChannel } from './interfaces/notification-channel.interface';

@Injectable()
export class NotificationsService {
  constructor(private readonly channels: NotificationChannel[]) {}

  async sendPatientConfirmation(to: string, fullName: string) {
    await Promise.all(
      this.channels.map((channel) =>
        channel.sendPatientConfirmation(to, fullName).catch(console.error),
      ),
    );
  }
}
