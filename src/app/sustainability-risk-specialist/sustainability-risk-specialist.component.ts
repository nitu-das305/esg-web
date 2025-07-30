import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sustainability-risk-specialist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="src-header">
      <div class="src-header-content">
        <span class="src-header-logo">🛡️ ESG Platform</span>
        <span class="src-header-welcome">Welcome, {{ username || 'Specialist' }}! <span class="src-header-role">(Sustainability Risk & Compliance Tech Specialist)</span></span>
      </div>
    </header>
    <div class="src-dashboard-main">
      <section class="src-hero-section animate-fade-in">
        <div class="src-hero-bg"></div>
        <div class="src-hero-content">
          <div class="src-hero-icon">🛡️</div>
          <h1 class="src-hero-title animate-slide-in">Risk & Compliance Technology Dashboard</h1>
          <span class="src-hero-role animate-fade-in-delay">Sustainability Risk & Compliance Tech Specialist</span>
          <p class="src-hero-lead animate-fade-in-delay2">Empowering you to manage risk, compliance, and technology for a sustainable future.</p>
        </div>
      </section>
      <section class="src-responsibilities-grid">
        <div class="src-resp-card animate-stagger">
          <div class="src-resp-icon">💻</div>
          <h2>Developing & Implementing Sustainability Technology Strategies</h2>
          <p>Design and deploy technology solutions that support sustainability goals, such as IoT for energy monitoring, AI for predictive analytics, and cloud-based ESG data platforms.</p>
        </div>
        <div class="src-resp-card animate-stagger">
          <div class="src-resp-icon">📜</div>
          <h2>Ensuring Compliance with Sustainability Regulations</h2>
          <p>Monitor and ensure adherence to global and local sustainability regulations, automate compliance checks, and maintain audit-ready records.</p>
        </div>
        <div class="src-resp-card animate-stagger">
          <div class="src-resp-icon">⚠️</div>
          <h2>Managing Sustainability Risks</h2>
          <p>Identify, assess, and mitigate risks related to environmental, social, and governance factors using advanced risk management tools and dashboards.</p>
        </div>
        <div class="src-resp-card animate-stagger">
          <div class="src-resp-icon">🔗</div>
          <h2>Integrating Sustainability into Business Processes</h2>
          <p>Embed sustainability criteria into procurement, operations, and supply chain management systems for end-to-end ESG integration.</p>
        </div>
        <div class="src-resp-card animate-stagger">
          <div class="src-resp-icon">📊</div>
          <h2>Promoting Transparency and Reporting</h2>
          <p>Automate ESG data collection and reporting, generate real-time dashboards, and facilitate transparent communication with stakeholders.</p>
        </div>
        <div class="src-resp-card animate-stagger">
          <div class="src-resp-icon">🚀</div>
          <h2>Staying Abreast of Emerging Technologies and Trends</h2>
          <p>Continuously research and evaluate new technologies, such as blockchain for traceability or machine learning for risk prediction, to enhance sustainability initiatives.</p>
        </div>
      </section>
    </div>
    <footer class="src-footer">
      <div class="src-footer-content">
        <span>© 2024 ESG Platform. All rights reserved.</span>
      </div>
    </footer>
  `,
  styles: [`
    .src-header {
      width: 100%;
      background: linear-gradient(135deg, #2d2e83, #6c63ff);
      color: #fff;
      padding: 1.2rem 2rem;
      border-radius: 0 0 1.2rem 1.2rem;
      box-shadow: 0 4px 16px 0 #6c63ff22;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: fadeInHeader 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    @keyframes fadeInHeader {
      0% { opacity: 0; transform: translateY(-30px); }
      100% { opacity: 1; transform: none; }
    }
    .src-header-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .src-header-logo {
      font-size: 1.8rem;
      font-weight: 900;
      color: #fff;
      text-shadow: 2px 2px 4px #6c63ff88;
    }
    .src-header-welcome {
      font-size: 1.2rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(90deg, #fff 0%, #e0e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .src-header-role {
      font-weight: 700;
      color: #fff;
    }
    .src-dashboard-main {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2.5rem;
      animation: fadeInFeatures 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    .src-hero-section {
      position: relative;
      width: 100%;
      height: 300px;
      border-radius: 1.2rem;
      overflow: hidden;
      margin-bottom: 2.5rem;
      box-shadow: 0 8px 32px 0 #6c63ff22;
      animation: fadeInHero 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    @keyframes fadeInHero {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: none; }
    }
    .src-hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('https://images.unsplash.com/photo-1517486803460-6396898505c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover;
      filter: blur(5px) brightness(0.7);
      z-index: -1;
    }
    .src-hero-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #fff;
      z-index: 1;
    }
    .src-hero-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 15px #4bc0c0cc);
    }
    .src-hero-title {
      font-size: 2.8rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
      color: #fff;
      text-shadow: 2px 2px 4px #6c63ff88;
    }
    .src-hero-role {
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.5px;
      text-shadow: 1px 1px 2px #6c63ff88;
    }
    .src-hero-lead {
      font-size: 1.1rem;
      color: #fff;
      margin-top: 0.8rem;
      max-width: 800px;
      padding: 0 1rem;
      text-shadow: 1px 1px 2px #6c63ff88;
    }
    .src-responsibilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2.2rem;
      width: 92%;
      max-width: 1200px;
      padding: 0 1.5rem;
    }
    .src-resp-card {
      background: #fff;
      border-radius: 1.2rem;
      box-shadow: 0 2px 12px 0 #6c63ff22;
      padding: 1.5rem 1.2rem 1.2rem 1.2rem;
      min-width: 320px;
      max-width: 420px;
      width: 100%;
      margin-bottom: 1.5rem;
      animation: fadeInCard 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    @keyframes fadeInCard {
      0% { opacity: 0; transform: translateY(40px) scale(0.97); }
      100% { opacity: 1; transform: none; }
    }
    .src-resp-card:hover {
      transform: translateY(-6px) scale(1.04);
      box-shadow: 0 8px 32px 0 #6c63ff33;
    }
    .src-resp-icon {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 0 8px #4bc0c0cc);
    }
    .src-footer {
      width: 100%;
      background: linear-gradient(135deg, #2d2e83, #6c63ff);
      color: #fff;
      padding: 1.5rem 2rem;
      border-radius: 1.2rem 1.2rem 0 0;
      box-shadow: 0 -4px 16px 0 #6c63ff22;
      margin-top: 2rem;
      text-align: center;
      font-size: 0.9rem;
      animation: fadeInFooter 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    @keyframes fadeInFooter {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: none; }
    }
    .src-footer-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .src-footer-content span {
      color: #e0e7ff;
      font-weight: 500;
    }
  `]
})
export class SustainabilityRiskSpecialistComponent {
  username = '';
} 