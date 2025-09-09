import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto, PatientResponseDto, UpdatePatientDto } from './dto';
import { memoryStorage } from 'multer';
import { CreatePatientWithPhotoDto } from './dto/create-patient-with-photo.dto.ts';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({
    status: 200,
    description: 'List of patients returned successfully.',
    type: [PatientResponseDto],
  })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by id' })
  @ApiResponse({
    status: 200,
    description: 'Patient returned successfully.',
    type: PatientResponseDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new patient',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePatientWithPhotoDto,
  })
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        if (!file) return cb(new ConflictException('Photo is required'), false);
        cb(null, true);
      },
    }),
  )
  @ApiResponse({
    status: 201,
    description: 'Patient created successfully.',
    type: PatientResponseDto,
  })
  async create(
    @Body() dto: CreatePatientDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.patientsService.create(dto, photo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient by id' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', required: true, description: 'Patient ID' })
  @ApiResponse({
    status: 200,
    description: 'Patient updated successfully',
    type: PatientResponseDto,
  })
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        if (!file) return cb(null, true); // allow no file
        if (/^image\/(jpe?g)$/i.test(file.mimetype)) return cb(null, true);
        cb(new Error('Only JPG/JPEG files are allowed'), false);
      },
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.patientsService.update(id, dto, photo);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Patient deleted successfully.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.patientsService.remove(id);
    return { message: 'Patient deleted successfully' };
  }
}
