/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Test, TestingModule } from '@nestjs/testing';
// import { PatientsService } from './patients.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Patient } from './patient.entity';
// import { NotificationsService } from 'src/shared/notifications/notifications.service';
// import { NotFoundException, ConflictException } from '@nestjs/common';
// import { fileTypeFromBuffer } from 'file-type';

// jest.mock('file-type');
// jest.mock('fs', () => ({
//   promises: { mkdir: jest.fn(), writeFile: jest.fn() },
// }));

// describe('PatientsService', () => {
//   let service: PatientsService;
//   let repo;
//   let notifications;

//   beforeEach(async () => {
//     repo = {
//       find: jest.fn(),
//       findOne: jest.fn(),
//       create: jest.fn(),
//       save: jest.fn(),
//       softRemove: jest.fn(),
//     };
//     notifications = { sendPatientConfirmation: jest.fn() };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PatientsService,
//         { provide: getRepositoryToken(Patient), useValue: repo },
//         { provide: NotificationsService, useValue: notifications },
//       ],
//     }).compile();

//     service = module.get<PatientsService>(PatientsService);
//   });

//   it('should return all patients', async () => {
//     const fakePatients = [{ id: 1, fullName: 'John Doe' }];
//     repo.find.mockResolvedValue(fakePatients);
//     const result = await service.findAll();
//     expect(result).toHaveLength(1);
//     expect(result[0].fullName).toBe('John Doe');
//   });

//   it('should throw NotFoundException if findOne fails', async () => {
//     repo.findOne.mockResolvedValue(null);
//     await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
//   });

//   it('should create patient with valid photo', async () => {
//     (fileTypeFromBuffer as jest.Mock).mockResolvedValue({
//       mime: 'image/jpeg',
//       ext: 'jpg',
//     });
//     const dto = { fullName: 'Jane Doe', email: 'jane@gmail.com', phone: '123' };
//     const photo = { buffer: Buffer.from('123'), originalname: 'photo.jpg' };
//     repo.create.mockReturnValue(dto);
//     repo.save.mockResolvedValue({
//       ...dto,
//       id: 1,
//       photoUrl: '/uploads/photo.jpg',
//     });
//     const result = await service.create(dto, photo as any);
//     expect(result.id).toBe(1);
//   });

//   it('should throw ConflictException if photo is missing', async () => {
//     await expect(service.create({} as any, null as any)).rejects.toThrow(
//       ConflictException,
//     );
//   });
// });
