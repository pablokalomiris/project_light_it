import { ApiProperty } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';

export class CreatePatientWithPhotoDto extends CreatePatientDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Patient photo (image/JPG, required)',
  })
  photo: unknown;
}
