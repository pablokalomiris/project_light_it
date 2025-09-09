import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Frank D' })
  fullName: string;

  @ApiProperty({ example: 'frank.d@email.com' })
  email: string;

  @ApiProperty({ example: '+1 555 123 4567' })
  phone: string;

  @ApiProperty({
    example: 'http://localhost:3000/uploads/1694091234567-photo.jpg',
    description: 'URL to the patient’s uploaded photo',
  })
  photoUrl: string;

  @ApiProperty({ example: '2025-09-07T21:52:35.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-07T21:52:35.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;
}
