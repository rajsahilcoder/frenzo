import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertTriangle, ArrowRight, Save } from 'lucide-react';

const Audit = () => {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  // ... (questions array remains the same)

  const questions = [
    {
      id: 'platform',
      question: "What is your primary digital platform?",
      options: [
        { label: "Custom Website / Web App", points: 10 },
        { label: "WordPress / Wix / Shopify", points: 5 },
        { label: "Social Media Only", points: 0 }
      ]
    },
    {
      id: 'ai',
      question: "Are you using AI to automate workflows?",
      options: [
        { label: "Yes, fully automated agents", points: 20 },
        { label: "A little (ChatGPT wrappers)", points: 10 },
        { label: "No, everything is manual", points: 0 }
      ]
    },
    {
      id: 'mobile',
      question: "Do you have a mobile app?",
      options: [
        { label: "Yes", points: 15 },
        { label: "No", points: 0 }
      ]
    },
    {
      id: 'revenue',
      question: "How do you collect revenue?",
      options: [
        { label: "Custom Stripe/Payment Integration", points: 10 },
        { label: "Third-party Platform (Gumroad, etc)", points: 5 },
        { label: "Manual Invoicing", points: 0 }
      ]
    }
  ];

  const handleAnswer = (points, answer) => {
    setScore(prev => prev + points);
    setAnswers(prev => ({ ...prev, [questions[step-1].id]: answer }));
    
    if (step < questions.length) {
      setStep(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const getResult = () => {
    if (score >= 40) return { title: "Scalable Foundation", color: "#22c55e", desc: "You have a solid tech stack, but there's room to optimize with advanced AI agents." };
    if (score >= 20) return { title: "Growing Pains", color: "#fbbf24", desc: "You are relying too much on manual work or rented platforms. It's time to build your own assets." };
    return { title: "At Risk", color: "#ef4444", desc: "Your business is highly dependent on manual labor or third-party rules. You need a custom infrastructure immediately." };
  };

  const result = step === 'result' ? getResult() : null;

  // Auto-save effect
  useEffect(() => {
    if (step === 'result' && currentUser) {
      saveAuditToProfile();
    }
  }, [step, currentUser]);

  const saveAuditToProfile = async () => {
      if (!currentUser) return;

      setSaving(true);
      try {
          // Construct formatted audit data
          const auditData = {
              score,
              maxScore: 55,
              status: result.title,
              answers: answers,
              completedAt: new Date().toISOString(),
              summary: result.desc
          };

          const userRef = doc(db, "users", currentUser.uid);
          // Merge this into an 'audit' field
          await setDoc(userRef, { 
              audit: auditData,
              requirements: `[Audit - ${result.title}]: ${result.desc}` 
          }, { merge: true });

          // No navigation, just visual confirmation via state if needed, 
          // but we'll rely on the UI showing "Saved" or just being done.
      } catch (error) {
          console.error("Error saving audit:", error);
      } finally {
          setSaving(false);
      }
  };

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section className="text-center">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tech Stack Audit</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Answer {questions.length} questions to see if your business is ready to scale.
        </p>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {step !== 'result' ? (
            <Card>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-tertiary)' }}>
                <span>Question {step} of {questions.length}</span>
                <span>{Math.round(((step-1)/questions.length)*100)}% Complete</span>
              </div>
              
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{questions[step-1].question}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {questions[step-1].options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAnswer(opt.points, opt.label)}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '0.5rem',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onMouseOut={(e) => e.target.style.borderColor = 'var(--border-light)'}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Card>
          ) : (
            <Card style={{ borderColor: result.color, borderWidth: '2px' }}>
              <div style={{ color: result.color, marginBottom: '1rem' }}>
                {score >= 40 ? <CheckCircle size={48} /> : <AlertTriangle size={48} />}
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{result.title}</h2>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>{score}/55</div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                {result.desc}
              </p>
              
              <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Prescription</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Based on your audit, we recommend a <strong style={{ color: 'var(--text-primary)' }}>Custom Infrastructure Strategy</strong> to fix your scalability gaps.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentUser ? (
                      <div style={{ 
                          background: 'rgba(34, 197, 94, 0.1)', 
                          color: '#22c55e', 
                          padding: '1rem', 
                          borderRadius: '0.5rem', 
                          textAlign: 'center', 
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          border: '1px solid rgba(34, 197, 94, 0.2)'
                      }}>
                          <CheckCircle size={16} style={{ marginBottom: '-2px', marginRight: '6px' }}/>
                          Audit results saved to your profile.
                      </div>
                  ) : (
                      <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sign in to save these results to your profile permanently.</p>
                          <Button to="/login" state={{ from: '/audit' }} variant="outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Login to Save</Button>
                      </div>
                  )}

                  <Button 
                    to="/contact" 
                    state={{ details: `I completed the Tech Audit and scored ${score}/55 (${result.title}). I need help fixing my scalability gaps.` }} 
                    variant="primary"
                    style={{ width: '100%' }}
                  >
                    Book Strategy Call Now <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                  </Button>
              </div>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
};

export default Audit;
