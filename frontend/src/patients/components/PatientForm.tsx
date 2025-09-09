import { useState, type DragEvent, type FormEvent, useRef } from 'react';
import { validateEmail, validateFullName, validatePhone, validatePhoto } from '../../shared/utils/validation';
import type { NewPatientPayload } from '../types/patient';
import { DropArea, ErrorText, Form, Input, PhoneRow, Row } from '../../../ui/Form';
import { Button } from '../../../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onSubmit: (payload: NewPatientPayload) => Promise<{ success: boolean; message?: string }>;
}

export const PatientForm = ({ onSubmit }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+598');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file);
  };

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;
    if (validatePhoto(file)) {
      setPhoto(file);
      setErrors(prev => ({ ...prev, photo: '' }));
    } else {
      setErrors(prev => ({ ...prev, photo: 'Only .jpg images allowed' }));
    }
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    if (!validateFullName(fullName)) newErrors.fullName = 'Only letters allowed';
    if (!validateEmail(email)) newErrors.email = 'Must be a valid @gmail.com';
    if (!validatePhone(phone)) newErrors.phone = 'Invalid phone';
    if (!photo) newErrors.photo = 'Document photo is required (.jpg)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validateAll()) return;

  const result = await onSubmit({
    fullName,
    email,
    countryCode,
    phone,
    photo: photo as File,
  });

  if (result.success) {
    setFullName('');
    setEmail('');
    setCountryCode('+598');
    setPhone('');
    setPhoto(null);
    setErrors({});
    setSubmitted(false);
  }
  };

  return (
    <Form onSubmit={submit} noValidate>
      <Row>
        <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
        <AnimatePresence>
          {submitted && errors.fullName && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorText>{errors.fullName}</ErrorText>
            </motion.div>
          )}
        </AnimatePresence>
      </Row>

      <Row>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (@gmail.com)" />
        <AnimatePresence>
          {submitted && errors.email && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorText>{errors.email}</ErrorText>
            </motion.div>
          )}
        </AnimatePresence>
      </Row>

      <PhoneRow>
        <Input value={countryCode} onChange={e => setCountryCode(e.target.value)} placeholder="+598" />
        <div>
          <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
          <AnimatePresence>
            {submitted && errors.phone && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ErrorText>{errors.phone}</ErrorText>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PhoneRow>

      <Row>
        <DropArea
          dragging={dragging}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div>{photo ? photo.name : 'Drag and drop a .jpg document photo here, or click to select'}</div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,image/jpeg"
            onChange={e => handleFileChange(e.target.files?.[0])}
            style={{ display: 'none' }}
          />
        </DropArea>
        <AnimatePresence>
          {submitted && errors.photo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorText>{errors.photo}</ErrorText>
            </motion.div>
          )}
        </AnimatePresence>
      </Row>

      <Button type="submit">Add Patient</Button>
    </Form>
  );
};
