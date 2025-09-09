import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Frank D', description: 'Full name' })
  @IsString()
  @Length(1, 150)
  fullName: string;

  @ApiProperty({ example: 'frank.d@email.com', description: 'Unique email' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: '+1 555 123 4567', description: 'Phone number' })
  @IsString()
  @Length(5, 20)
  @Matches(/^[0-9+()\-\s]+$/, { message: 'phone contains invalid characters' })
  phone: string;
}
