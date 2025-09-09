/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Test, TestingModule } from '@nestjs/testing';
// import { EmailService } from './email.service';
// import { ConfigService } from '@nestjs/config';
// import sgMail from '@sendgrid/mail';

// jest.mock('@sendgrid/mail');

// describe('EmailService', () => {
//   let service: EmailService;
//   let configService: Partial<ConfigService>;

//   beforeEach(async () => {
//     configService = {
//       get: jest.fn((key: string) => {
//         if (key === 'sendgrid.apiKey') return 'FAKE_API_KEY';
//         if (key === 'sendgrid.from') return 'no-reply@clinic.com';
//         return undefined;
//       }),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         EmailService,
//         { provide: ConfigService, useValue: configService },
//       ],
//     }).compile();

//     service = module.get<EmailService>(EmailService);
//   });

//   it('should initialize correctly with config', () => {
//     const setApiKey = sgMail.setApiKey as jest.Mock;
//     expect(service).toBeDefined();
//     expect(setApiKey).toHaveBeenCalledWith('FAKE_API_KEY');
//   });

//   it('should throw if apiKey is missing', () => {
//     configService.get = jest
//       .fn()
//       .mockImplementation((key) =>
//         key === 'sendgrid.from' ? 'from@domain.com' : undefined,
//       );
//     expect(() => new EmailService(configService as any)).toThrow(
//       'SENDGRID_API_KEY is not set in environment variables',
//     );
//   });

//   it('should throw if from is missing', () => {
//     configService.get = jest
//       .fn()
//       .mockImplementation((key) =>
//         key === 'sendgrid.apiKey' ? 'FAKE_KEY' : undefined,
//       );
//     expect(() => new EmailService(configService as any)).toThrow(
//       'SENDGRID_FROM is not set in environment variables',
//     );
//   });

//   it('should call sgMail.send with correct parameters', async () => {
//     const mockSend = jest.fn();
//     (sgMail.send as jest.Mock) = mockSend;

//     await service.sendPatientConfirmation('test@example.com', 'John Doe');

//     expect(mockSend).toHaveBeenCalledWith({
//       to: 'test@example.com',
//       from: 'no-reply@clinic.com',
//       subject: 'Patient Registration Successful',
//       text: 'Hello John Doe, your registration was successful!',
//       html: '<p>Hello <b>John Doe</b>, your registration was successful!</p>',
//     });
//   });
// });
