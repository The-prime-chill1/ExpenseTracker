import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { 
  FiTrendingUp, 
  FiTarget, 
  FiSmartphone, 
  FiLock, 
  FiBarChart2, 
  FiCpu,
  FiAward,
  FiArrowRight 
} from 'react-icons/fi'
import '../styles/home.css'

export default function Home() {
  const featuresRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile for better UX
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '50px' }) // Added rootMargin for better triggering

    const fadeElements = document.querySelectorAll('.fade-up')
    fadeElements.forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  // Smooth scroll for anchor links
  const handleGetStarted = (e) => {
    e.preventDefault()
    const pricingSection = document.querySelector('.pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-bg-gradient"></div>
        <div className="container">
          <div className="hero-content fade-up">
            <div className="hero-badge">
              <FiAward size={isMobile ? 12 : 14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              <span>#1 Smart Expense Tracker</span>
            </div>
            <h1 className="hero-title">
              {/* Responsive line break */}
              {isMobile ? (
                <>Take Control of Your<br /><span className="gradient-text">Financial Future</span></>
              ) : (
                <>Take Control of Your<br /><span className="gradient-text">Financial Future</span></>
              )}
            </h1>
            <p className="hero-subtitle">
              Join 50,000+ chill users who track their expenses effortlessly with Mr. Chills. 
              Beautiful analytics, smart insights, and complete financial freedom.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary hero-cta">
                Start Tracking Free <FiArrowRight style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
              </Link>
              <Link to="/login" className="btn btn-outline">
                View Demo
              </Link>
            </div>
            <div className="hero-stats">
              <div><strong>$2.5B+</strong><span>Tracked</span></div>
              <div><strong>50k+</strong><span>Users</span></div>
              <div><strong>4.9★</strong><span>Rating</span></div>
            </div>
          </div>
          <div className="hero-dashboard-preview fade-up">
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-dots"><span></span><span></span><span></span></div>
                <div className="preview-title">Mr. Chills Dashboard</div>
              </div>
              <div className="preview-stats">
                <div className="preview-stat"><div>$12,450</div><span>Balance</span></div>
                <div className="preview-stat"><div>$4,200</div><span>Income</span></div>
                <div className="preview-stat"><div>$1,850</div><span>Expenses</span></div>
              </div>
              <div className="preview-chart"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" ref={featuresRef}>
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-badge">Features</span>
            <h2>Everything you need to master your money</h2>
            <p>Powerful tools that make expense tracking effortless and actually enjoyable.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="feature-card fade-up" 
                style={{ animationDelay: `${Math.min(i * 0.1, 0.5)}s` }} // Cap delay at 0.5s
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-badge">Pricing</span>
            <h2>Simple, transparent pricing</h2>
            <p>Start free, upgrade when you need more power.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card fade-up">
              <div className="pricing-badge">Most Popular</div>
              <h3>Free</h3>
              <div className="price">$0<span>/month</span></div>
              <ul className="pricing-features">
                <li>✓ Unlimited transactions</li>
                <li>✓ 10 categories</li>
                <li>✓ Basic reports</li>
                <li>✓ 1 month history</li>
              </ul>
              <Link to="/signup" className="btn btn-outline">Get Started</Link>
            </div>
            <div className="pricing-card premium fade-up">
              <h3>Pro</h3>
              <div className="price">$9<span>/month</span></div>
              <ul className="pricing-features">
                <li>✓ Everything in Free</li>
                <li>✓ Unlimited categories</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Lifetime history</li>
                <li>✓ Export to CSV/PDF</li>
                <li>✓ Priority support</li>
              </ul>
              <Link to="/signup" className="btn btn-primary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card fade-up">
            <h2>Ready to take control of your finances?</h2>
            <p>Join thousands of users who've transformed their financial habits with Mr. Chills.</p>
            <Link to="/signup" className="btn btn-primary cta-btn">
              Start Tracking Free <FiArrowRight style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const features = [
  { icon: <FiTrendingUp size={40} />, title: 'Smart Analytics', desc: 'Visualize your spending with beautiful, interactive charts that reveal insights.' },
  { icon: <FiTarget size={40} />, title: 'Budget Goals', desc: 'Set monthly budgets and get smart alerts when you are close to limits.' },
  { icon: <FiSmartphone size={40} />, title: 'Mobile First', desc: 'Beautiful experience on any device with our responsive design.' },
  { icon: <FiLock size={40} />, title: 'Privacy First', desc: 'Your data stays on your device. No servers, no tracking.' },
  { icon: <FiBarChart2 size={40} />, title: 'Investment Tracking', desc: 'Track your investments alongside daily expenses.' },
  { icon: <FiCpu size={40} />, title: 'AI Insights', desc: 'Get personalized recommendations to optimize spending.' },
]