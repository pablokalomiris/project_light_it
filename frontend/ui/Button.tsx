import styled from 'styled-components';

export const Button = styled.button<{ variant?: 'primary' | 'dark' }>`
  background: ${({ variant }) => (variant === 'dark' ? '#0f172a' : '#2563eb')};
  color: white;
  border: 0;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;
