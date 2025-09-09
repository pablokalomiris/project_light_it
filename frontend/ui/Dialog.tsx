import * as Dialog from '@radix-ui/react-dialog';

export const ModalRoot = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;

export const Modal = ({ children }: { children: React.ReactNode }) => (
  <Dialog.Portal>
    <Dialog.Overlay style={{
      background: 'rgba(2,6,23,0.5)', position: 'fixed', inset: 0,
    }} />
    <Dialog.Content style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: 'min(560px, 92vw)', background: '#fff', borderRadius: 12, padding: 16,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      {children}
    </Dialog.Content>
  </Dialog.Portal>
);
