import * as Accordion from '@radix-ui/react-accordion';
import styled from 'styled-components';
import type { Patient } from '../types/patient';
import { Card } from '../../../ui/Card';

interface Props {
  patient: Patient;
}

const Header = styled(Accordion.Trigger)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  background: #f9fafb;
  border: 0;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled(Accordion.Content)`
  padding: 12px;
  border-top: 1px solid #f1f5f9;
  animation: slideDown 200ms ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Field = styled.p`
  margin: 6px 0;
  color: #374151;
  font-size: 14px;
`;

export const PatientCard = ({ patient }: Props) => {
  return (
    <Card>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value={`patient-${patient.id}`}>
          <Header>
            <Photo src={`http://localhost:3000${patient.photoUrl}`} alt={`${patient.fullName} document`} />
            <Name>{patient.fullName}</Name>
          </Header>
          <Content>
            <Field><strong>Email:</strong> {patient.email}</Field>
            <Field><strong>Phone:</strong> {patient.phone}</Field>
          </Content>
        </Accordion.Item>
      </Accordion.Root>
    </Card>
  );
};
