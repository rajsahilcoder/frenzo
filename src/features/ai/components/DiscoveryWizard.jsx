import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '../api/aiService';
import { projectService } from '../../projects/api/projectService';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/ui/Button';

const QUESTIONS = [
  {
    id: 'goal',
    text: "What is your primary business goal right now?",
    options: ["Launch a new product", "Scale existing operations", "Automate workflows", "Rebrand / Redesign"]
  },
  {
    id: 'platform',
    text: "What kind of platform do you envision?",
    options: ["Web Application (SaaS)", "Mobile App", "E-commerce Store", "Internal Tool / Dashboard"]
  },
  {
    id: 'ai',
    text: "Are you interested in AI integration?",
    options: ["Yes, I want to automate tasks", "Maybe, if it adds value", "No, just standard software"]
  },
  {
    id: 'budget',
    text: "What is your approximate budget range?",
    options: ["₹1L - ₹3L", "₹3L - ₹10L", "₹10L+"]
  }
];

const DiscoveryWizard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState(null);
  const [creatingProject, setCreatingProject] = useState(false);

  const handleAnswer = async (answer) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: answer };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Finished
      setStep('generating');
      setIsGenerating(true);
      try {
        const result = await aiService.generateProjectProposal(newAnswers);
        setProposal(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsGenerating(false);
        setStep('result');
      }
    }
  };

  const handleCreateProject = async () => {
    if (!currentUser) {
        navigate('/login', { state: { from: '/design-system' } }); // Redirect to login if guest
        return;
    }

    setCreatingProject(true);
    try {
        const projectData = {
            title: proposal.title,
            requirements: proposal.requirements,
            estimatedCost: proposal.estimatedCost,
            clientNotes: "AI Generated based on Discovery Wizard.",
            clientId: currentUser.uid,
            clientEmail: currentUser.email,
            clientName: currentUser.displayName || 'Client',
            isPublic: false,
            isAiAssisted: true
        };
        
        const projectId = await projectService.createProject(projectData);
        navigate(`/projects/${projectId}`);
    } catch (error) {
        console.error("Failed to create project", error);
        alert("Failed to initialize project. Please try again.");
    } finally {
        setCreatingProject(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
            width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            marginBottom: '1rem', boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}>
            <Bot size={32} color="#fff" />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Design Your Growth System</h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
             Let our AI architect the perfect solution for your business in seconds.
        </p>
      </div>

      {step !== 'result' && step !== 'generating' && (
        <div className="card" style={{ padding: '2rem', border: '1px solid #333', background: '#111' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem' }}>
             <span>STEP {step + 1} OF {QUESTIONS.length}</span>
             <span>{Math.round(((step)/QUESTIONS.length)*100)}% COMPLETE</span>
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', lineHeight: '1.3' }}>
            {QUESTIONS[step].text}
          </h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {QUESTIONS[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                style={{
                    padding: '1.2rem', textAlign: 'left', background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px',
                    color: '#ddd', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = '#222'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.background = '#1a1a1a'; }}
              >
                {opt}
                <ArrowRight size={18} color="#666" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'generating' && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
           <Loader2 size={48} className="animate-spin" style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />
           <h3 style={{ fontSize: '1.5rem' }}>Analyzing your requirements...</h3>
           <p style={{ color: '#888' }}>Our AI is drafting a custom architecture proposal.</p>
        </div>
      )}

      {step === 'result' && proposal && (
        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--accent-primary)' }}>
           <div style={{ background: 'linear-gradient(to right, var(--accent-primary), #7c3aed)', padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', width: 'fit-content', margin: '0 auto 1rem', padding: '6px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                 <Sparkles size={16} /> AI Generated Proposal
              </div>
              <h2 style={{ fontSize: '2rem', color: '#fff', margin: 0 }}>{proposal.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem', fontSize: '1.2rem' }}>Estimated Investment: ₹{proposal.estimatedCost.toLocaleString()}</p>
           </div>

           <div style={{ padding: '2rem' }}>
              <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #333' }}>
                 <div style={{ whiteSpace: 'pre-wrap', color: '#ccc', lineHeight: '1.6' }}>
                    {proposal.requirements}
                 </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                 <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                    This proposal is a starting point. Book a strategy call to refine costs and timeline.
                 </p>
                 <Button 
                   onClick={handleCreateProject} 
                   disabled={creatingProject}
                   style={{ 
                     width: '100%', padding: '1.2rem', fontSize: '1.1rem', 
                     background: creatingProject ? '#555' : 'var(--accent-primary)',
                     cursor: creatingProject ? 'wait' : 'pointer'
                   }}
                 >
                   {creatingProject ? 'Initializing Project...' : 'Approve & Schedule Strategy Call'}
                 </Button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default DiscoveryWizard;
