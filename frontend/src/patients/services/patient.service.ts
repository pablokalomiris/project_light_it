import axios from 'axios';
import type { NewPatientPayload, Patient } from '../types/patient';

const API_URL = `http://localhost:3000/patients`;

export const patientService = {
  getAll: async (): Promise<Patient[]> => {
    const { data } = await axios.get(API_URL);
    return data;
  },

  create: async (payload: NewPatientPayload): Promise<Patient> => {
    const formData = new FormData();
    formData.append('fullName', payload.fullName);
    formData.append('email', payload.email);
    formData.append('phone', `${payload.countryCode} ${payload.phone}`);
    formData.append('photo', payload.photo);

    const { data } = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  update: async (id: number, patient: Partial<Omit<Patient, 'id'>>): Promise<Patient> => {
    const { data } = await axios.patch(`${API_URL}/${id}`, patient);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
