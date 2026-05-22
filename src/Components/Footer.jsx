import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" rx="24" fill="url(#footerGrad)"/>
                <path d="M50 30 L65 55 L35 55 Z" fill="white"/>
                <circle cx="50" cy="55" r="8" fill="white"/>
                <rect x="46" y="55" width="8" height="25" rx="2" fill="white"/>
                <defs><linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#38BDF8"/></linearGradient></defs>
              </svg>
              <span>Mr. Chills</span>
            </div>
            <p>Smart expense tracking for modern individuals.</p>
          </div>
          <div className="footer-links">
            <div><h4>Product</h4><Link to="/">Features</Link><Link to="/pricing">Pricing</Link><Link to="/dashboard">Dashboard</Link></div>
            <div><h4>Company</h4><Link to="/">About</Link><Link to="/">Blog</Link><Link to="/">Careers</Link></div>
            <div><h4>Legal</h4><Link to="/">Privacy</Link><Link to="/">Terms</Link><Link to="/">Security</Link></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Mr. Chills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}