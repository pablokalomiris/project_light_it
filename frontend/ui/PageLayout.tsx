import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
`;

export const Empty = styled.div`
  text-align: center;
  color: #475569;
  padding: 40px 0;
`;

export const Alert = styled.div<{ kind: 'success' | 'error' }>`
  padding: 14px;
  border-radius: 10px;
  background: ${p => (p.kind === 'success' ? '#ecfdf5' : '#fef2f2')};
  color: ${p => (p.kind === 'success' ? '#065f46' : '#991b1b')};
`;
