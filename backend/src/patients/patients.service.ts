import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto, PatientResponseDto, UpdatePatientDto } from './dto';
import { join } from 'path';
import { promises as fs } from 'fs';
import { fileTypeFromBuffer } from 'file-type';
import { NotificationsService } from 'src/shared/notifications/notifications.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
    private readonly notifications: NotificationsService,
  ) {}

  private toResponse(p: Patient): PatientResponseDto {
    return {
      id: p.id,
      fullName: p.fullName,
      email: p.email,
      phone: p.phone,
      photoUrl: p.photoUrl,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      deletedAt: p.deletedAt ?? null,
    };
  }

  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.repo.find();
    return patients.map((p) => this.toResponse(p));
  }

  async findOne(id: number): Promise<PatientResponseDto> {
    const patient = await this.repo.findOne({ where: { id } });
    if (!patient) throw new NotFoundException(`Patient ${id} not found`);
    return this.toResponse(patient);
  }

  async create(
    dto: CreatePatientDto,
    photo: Express.Multer.File,
  ): Promise<PatientResponseDto> {
    if (!photo?.buffer) throw new ConflictException('Photo is required');

    const type = await fileTypeFromBuffer(photo.buffer);
    if (!type || type.mime !== 'image/jpeg') {
      throw new ConflictException('Uploaded file is not a valid JPEG');
    }

    if (!['jpg', 'jpeg'].includes(type.ext)) {
      throw new ConflictException('Only .jpg or .jpeg files are allowed');
    }

    const uploadsDir = join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const filename = `${Date.now()}-${photo.originalname}`;
    const filePath = join(uploadsDir, filename);

    try {
      await fs.writeFile(filePath, photo.buffer);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to store uploaded photo');
    }

    const photoUrl = `/uploads/${filename}`;
    const entity = this.repo.create({ ...dto, photoUrl });

    try {
      const saved = await this.repo.save(entity);

      void this.notifications
        .sendPatientConfirmation(saved.email, saved.fullName)
        .catch((err) => {
          console.error('Email sending failed', err);
        });

      return this.toResponse(saved);
    } catch (e) {
      if ((e as { code?: string })?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw e;
    }
  }

  async update(
    id: number,
    dto: UpdatePatientDto,
    photo?: Express.Multer.File,
  ): Promise<PatientResponseDto> {
    const patient = await this.repo.findOne({ where: { id } });
    if (!patient) throw new NotFoundException(`Patient ${id} not found`);

    if (dto.fullName !== undefined) patient.fullName = dto.fullName;
    if (dto.email !== undefined) patient.email = dto.email;
    if (dto.phone !== undefined) patient.phone = dto.phone;
    if (photo?.buffer && photo.originalname) {
      const uploadsDir = join(__dirname, '../../uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${photo.originalname}`;
      const filePath = join(uploadsDir, filename);
      await fs.writeFile(filePath, photo.buffer);
      patient.photoUrl = `/uploads/${filename}`;
    }

    try {
      const saved = await this.repo.save(patient);
      return this.toResponse(saved);
    } catch (e: unknown) {
      if ((e as { code?: string })?.code === '23505')
        throw new ConflictException('Email already exists');
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    const patient = await this.repo.findOne({ where: { id } });
    if (!patient) throw new NotFoundException(`Patient ${id} not found`);
    await this.repo.softRemove(patient);
  }
}
