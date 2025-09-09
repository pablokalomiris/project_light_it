export interface Patient {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface NewPatientPayload {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  photo: File;
}