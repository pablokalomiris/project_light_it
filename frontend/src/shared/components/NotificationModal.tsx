import { Modal, ModalClose, ModalRoot } from '../../../ui/Dialog';
import { Alert } from '../../../ui/PageLayout';

interface Props {
  open: boolean;
  kind: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const NotificationModal = ({ open, kind, message, onClose }: Props) => (
  <ModalRoot open={open} onOpenChange={onClose}>
    <Modal>
      <h2 style={{ margin: 0, marginBottom: 10 }}>{kind === 'success' ? 'Success' : 'Error'}</h2>
      <Alert kind={kind}>{message}</Alert>
      <ModalClose asChild>
        <button
          style={{
            marginTop: 12,
            background: '#2563eb',
            color: '#fff',
            border: 0,
            padding: '8px 12px',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          OK
        </button>
      </ModalClose>
    </Modal>
  </ModalRoot>
);
