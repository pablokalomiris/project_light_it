import { useState } from 'react';
import { usePatients } from '../patients/hooks/usePatients';
import { PatientForm } from '../patients/components/PatientForm';
import { PatientCard } from '../patients/components/PatientCard';
import { useAuthStore } from '../stores/useAuthStore';
import { Modal, ModalClose, ModalRoot } from '../../ui/Dialog';
import { Actions, Alert, Empty, Grid, Header, Page, Title } from '../../ui/PageLayout';
import { Button } from '../../ui/Button';
import { NotificationModal } from '../shared/components/NotificationModal';

export const PatientsPage = () => {
  const { patients, loading, error, addPatient, fetchPatients } = usePatients();
  const [showForm, setShowForm] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; kind: 'success' | 'error'; message: string } | null>(null);
  const logout = useAuthStore((state) => state.logout);

  const handleSubmit: React.ComponentProps<typeof PatientForm>['onSubmit'] = async (payload) => {
    const res = await addPatient(payload);
    if (res.success) {
      await fetchPatients();
      setShowForm(false);
      setModal({ open: true, kind: 'success', message: 'Patient added successfully!' });
      return { success: true };
    }
    setModal({ open: true, kind: 'error', message: res.message || 'An error occurred' });
    return { success: false, message: res.message };
  };
  
  return (
    <Page>
      <Header>
        <Title>Patients Dashboard</Title>
        <Actions>
          <Button onClick={() => setShowForm(true)}>Add Patient</Button>
          <Button onClick={logout} variant="dark">Logout</Button>
        </Actions>
      </Header>

      {loading && <Empty>Loading patients...</Empty>}
      {error && <Alert kind="error">{error}</Alert>}

      {(!loading && !error )
      ?
        patients?.length === 0 && (
        <Empty>No patients yet. Click "Add Patient" to create one.</Empty>
        )
      :
        <Grid>
          {patients?.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </Grid>
      }



      <ModalRoot open={showForm} onOpenChange={setShowForm}>
        <Modal>
          <h2 style={{ margin: 0, marginBottom: 10 }}>Add Patient</h2>
          <PatientForm onSubmit={handleSubmit} />
          <ModalClose asChild>
            <button style={{ marginTop: 10, background: 'transparent', border: 0, color: '#475569', cursor: 'pointer' }}>Close</button>
          </ModalClose>
        </Modal>
      </ModalRoot>

      {modal && (
        <NotificationModal
          open={modal.open}
          kind={modal.kind}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      )}
    </Page>
  );
};
