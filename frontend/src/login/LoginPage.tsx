import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/useAuthStore';
import { routes } from '../routes/routes';
import { Button } from '../../ui/Button';

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(15,23,42,0.6));
`;

const Visual = styled.div`
  display: none;
  background: url('/rod-of-asclepius.svg') center/200px no-repeat;
  background-color: rgba(15,23,42,0.6);
  @media (min-width: 880px) {
    display: block;
  }
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: var(--panel);
  color: var(--text);
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
`;

const Subtitle = styled.p`
  margin: 0 0 18px;
  color: var(--muted);
`;

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
      navigate(routes.patients);
    }, 800);
  };

  return (
    <Shell>
      <Visual />
      <Panel>
        <Card>
          <Title>Welcome back</Title>
          <Subtitle>Sign in to manage patients</Subtitle>
          <Button onClick={handleLogin} disabled={loading} style={{ opacity: loading ? 0.7 : 1, width: '100%' }}>
            {loading ? 'Logging in…' : 'Continue'}
          </Button>
        </Card>
      </Panel>
    </Shell>
  );
};
