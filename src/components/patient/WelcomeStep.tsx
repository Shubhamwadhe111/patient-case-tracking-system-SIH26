import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Stethoscope, User, FileText, UserCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../../config/appConfig';

export interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Card style={{
        background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-800) 100%)',
        color: '#ffffff',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Stethoscope size={36} color="#ffffff" />
          </div>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginBottom: '0.5rem' }}>
          {APP_CONFIG.name}
        </h1>

        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-primary-100)', fontWeight: 500, marginBottom: '1.25rem' }}>
          {APP_CONFIG.tagline}
        </p>

        <p style={{
          fontSize: 'var(--font-size-lg)',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          lineHeight: 1.5,
          margin: '0 auto 1.5rem auto',
          maxWidth: '650px',
        }}>
          "CareConnect helps you share your health information with the hospital before your consultation."
        </p>

        {/* 3 Step Visual Explanation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <User size={22} color="var(--color-primary-100)" />
              <strong style={{ fontSize: 'var(--font-size-sm)' }}>1. Tell us about yourself</strong>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-100)' }}>
              Select language & register your name and contact details.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <FileText size={22} color="var(--color-primary-100)" />
              <strong style={{ fontSize: 'var(--font-size-sm)' }}>2. Share health info</strong>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-100)' }}>
              Select consultation department & grant data consent.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <UserCheck size={22} color="var(--color-primary-100)" />
              <strong style={{ fontSize: 'var(--font-size-sm)' }}>3. Doctor reviews</strong>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-100)' }}>
              Your physician gets a structured history for quick review.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Button 
            variant="primary" 
            icon={<ArrowRight size={22} />} 
            onClick={onStart}
            style={{
              padding: '1rem 2.5rem',
              fontSize: 'var(--font-size-lg)',
              backgroundColor: '#ffffff',
              color: 'var(--color-primary-900)',
              fontWeight: 800,
            }}
          >
            Start
          </Button>
          <Button 
            variant="outline" 
            icon={<HelpCircle size={20} />} 
            onClick={() => setIsHelpOpen(true)}
            style={{ borderColor: '#ffffff', color: '#ffffff' }}
          >
            Need Help?
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="CareConnect Assistance"
        footer={<Button variant="secondary" onClick={() => setIsHelpOpen(false)}>Close Help</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
            CareConnect is designed to be very easy to use for all patients, including elderly and first-time hospital visitors.
          </p>
          <ul style={{ fontSize: 'var(--font-size-sm)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
            <li>Press the big <strong>"Start"</strong> button to begin.</li>
            <li>You can choose your preferred regional language on the next screen.</li>
            <li>If you need physical assistance at the hospital, please request the kiosk helper staff stationed near the OPD entrance.</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};
