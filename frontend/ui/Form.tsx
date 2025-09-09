import styled, { keyframes } from 'styled-components';

export const Form = styled.form`
  display: grid;
  gap: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
`;

export const Row = styled.div`
  display: grid;
  gap: 8px;
`;

export const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`;

export const PhoneRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 8px;
`;

const shake = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(-2px) }
  50% { transform: translateX(2px) }
  75% { transform: translateX(-1px) }
  100% { transform: translateX(0) }
`;

export const ErrorText = styled.span`
  color: #dc2626;
  font-size: 12px;
  animation: ${shake} 250ms ease-in-out;
`;

export const DropArea = styled.div<{ dragging: boolean }>`
  border: 2px dashed ${p => (p.dragging ? '#2563eb' : '#cbd5e1')};
  background: ${p => (p.dragging ? '#eff6ff' : '#f8fafc')};
  color: #475569;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
`;
