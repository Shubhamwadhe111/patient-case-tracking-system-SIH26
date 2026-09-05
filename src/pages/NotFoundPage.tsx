import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: '600px', margin: '2rem auto' }}>
      <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-primary-700)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        The requested route does not exist on the CareConnect platform.
      </p>
      <Button variant="primary" icon={<Home size={18} />} onClick={() => navigate('/')}>
        Return to Home Page
      </Button>
    </Card>
  );
};
