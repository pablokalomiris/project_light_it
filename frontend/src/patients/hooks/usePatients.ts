import { useEffect, useState, useCallback } from 'react';
import type { Patient, NewPatientPayload } from '../types/patient';
import { patientService } from '../services/patient.service';

interface AddPatientResult {
  success: boolean;
  data?: Patient;
  message?: string;
  detail?: unknown;
}

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getAll();
      setPatients(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load patients.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addPatient = async (payload: NewPatientPayload): Promise<AddPatientResult> => {
    try {
      const res = await patientService.create(payload);
      return { success: true, data: res };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Error adding patient', detail: err };
    }
  };

  useEffect(() => {
    void fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    addPatient,
  };
};
