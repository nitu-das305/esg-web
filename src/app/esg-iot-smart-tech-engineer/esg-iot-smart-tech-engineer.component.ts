import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esg-iot-smart-tech-engineer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="iot-header">
      <div class="iot-header-content">
        <span class="iot-header-logo">📡 ESG Platform</span>
        <span class="iot-header-welcome">Welcome, {{ username || 'Engineer' }}! <span class="iot-header-role">(ESG IoT & Smart Tech Engineer)</span></span>
        <button class="iot-darkmode-toggle" (click)="toggleDarkMode()">{{ darkMode ? '🌙' : '☀️' }}</button>
      </div>
    </header>
    <div class="iot-sensor-bar">
      <span>🌡️ Temp: <b>{{ liveTemp }}°C</b></span>
      <span>💧 Humidity: <b>{{ liveHumidity }}%</b></span>
      <span>⚡ Energy: <b>{{ liveEnergy }} kWh</b></span>
      <span>🟢 Sensors Online: <b>{{ sensorsOnline }}/{{ sensorsTotal }}</b></span>
      <button class="iot-sensor-refresh" (click)="simulateSensors()">Simulate</button>
    </div>
    <div class="iot-progress-circles-row">
      <div class="iot-progress-circle-card">
        <svg class="iot-progress-circle" width="80" height="80">
          <circle cx="40" cy="40" r="34" stroke="#e0e7ff" stroke-width="8" fill="none" />
          <circle cx="40" cy="40" r="34" stroke="#4bc0c0" stroke-width="8" fill="none" stroke-dasharray="213.6" [attr.stroke-dashoffset]="(1-sensorsOnline/sensorsTotal)*213.6" stroke-linecap="round" style="transition: stroke-dashoffset 1s;" />
        </svg>
        <div class="iot-progress-label">Sensors Online</div>
        <div class="iot-progress-value">{{ sensorsOnline }}/{{ sensorsTotal }}</div>
      </div>
      <div class="iot-progress-circle-card">
        <svg class="iot-progress-circle" width="80" height="80">
          <circle cx="40" cy="40" r="34" stroke="#e0e7ff" stroke-width="8" fill="none" />
          <circle cx="40" cy="40" r="34" stroke="#e84393" stroke-width="8" fill="none" stroke-dasharray="213.6" [attr.stroke-dashoffset]="(1-liveEnergy/1000)*213.6" stroke-linecap="round" style="transition: stroke-dashoffset 1s;" />
        </svg>
        <div class="iot-progress-label">Energy (kWh)</div>
        <div class="iot-progress-value">{{ liveEnergy }}</div>
      </div>
    </div>
    <div class="iot-dashboard-main">
      <section class="iot-features-grid">
        <div class="iot-feature-card animate-stagger" *ngFor="let card of featureCards" (click)="openFeatureModal(card)">
          <div class="iot-feature-icon">{{ card.icon }}</div>
          <h2>{{ card.title }}</h2>
          <p>{{ card.desc }}</p>
        </div>
      </section>
      <div class="iot-device-status">
        <h4>Device Status</h4>
        <ul>
          <li>Online: <b>{{ sensorsOnline }}</b></li>
          <li>Offline: <b>{{ sensorsTotal - sensorsOnline }}</b></li>
          <li>Last Sync: <b>{{ lastSync }}</b></li>
        </ul>
      </div>
      <div class="iot-alerts-feed">
        <h4>Recent Alerts</h4>
        <ul>
          <li *ngFor="let alert of alerts">{{ alert }}</li>
        </ul>
      </div>
    </div>
    <footer class="iot-footer">
      <div class="iot-footer-content">
        <span>© 2024 ESG Platform. All rights reserved.</span>
      </div>
    </footer>
    <div class="iot-modal-backdrop" *ngIf="featureModal">
      <div class="iot-modal">
        <button class="iot-modal-close" (click)="closeFeatureModal()">✖</button>
        <h2>{{ featureModal.title }}</h2>
        <p>{{ featureModal.detail }}</p>
        <div *ngIf="featureModal.chart" class="iot-modal-chart">{{ featureModal.chart }}</div>
      </div>
    </div>
  `,
  styles: [`
    .iot-header {
      width: 100%;
      background: linear-gradient(135deg, #2d2e83, #4bc0c0);
      color: #fff;
      padding: 1.2rem 2rem;
      border-radius: 0 0 1.2rem 1.2rem;
      box-shadow: 0 4px 16px 0 #4bc0c022;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: fadeInHeader 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    .iot-darkmode-toggle {
      background: #e84393;
      color: #fff;
      padding: 0.45rem 1rem;
      border-radius: 0.7rem;
      border: none;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      box-shadow: 0 2px 8px 0 #e8439355;
    }
    .iot-darkmode-toggle:hover { background: #c53070; transform: translateY(-2px); }
    .iot-darkmode-toggle:active { background: #388e3c; }
    .iot-sensor-bar {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 1.2rem;
      box-shadow: 0 2px 12px 0 #4bc0c022;
      padding: 1rem 2rem;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      animation: fadeInCard 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    .iot-sensor-refresh {
      background: #4bc0c0;
      color: #fff;
      border: none;
      border-radius: 0.7rem;
      padding: 0.5rem 1.2rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      margin-left: 1.5rem;
      transition: background 0.2s;
    }
    .iot-sensor-refresh:hover { background: #2d2e83; }
    .iot-progress-circles-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 2rem;
      width: 92%;
      max-width: 1200px;
      padding: 0 1.5rem;
      margin-bottom: 2.5rem;
      justify-content: center;
    }
    .iot-progress-circle-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #fff;
      border-radius: 1.2rem;
      box-shadow: 0 2px 12px 0 #4bc0c022;
      padding: 1.5rem 1.2rem 1.2rem 1.2rem;
      min-width: 120px;
      max-width: 150px;
      width: 100%;
      margin-bottom: 1.5rem;
      animation: fadeInCard 1.2s cubic-bezier(.8,-0.6,0,1.5);
    }
    .iot-progress-circle-card:hover { transform: translateY(-6px) scale(1.04); box-shadow: 0 8px 32px 0 #4bc0c033; }
    .iot-progress-circle { transform: rotate(-90deg); transform-origin: 50% 50%; }
    .iot-progress-label { font-size: 0.9rem; color: #4a4a68; margin-top: 0.8rem; }
    .iot-progress-value { font-size: 1.8rem; font-weight: 900; color: #2d2e83; margin-top: 0.3rem; }
    .iot-dashboard-main { width: 100%; display: flex; flex-direction: column; align-items: center; margin-bottom: 2.5rem; animation: fadeInFeatures 1.2s cubic-bezier(.8,-0.6,0,1.5); }
    .iot-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.2rem; width: 92%; max-width: 1200px; padding: 0 1.5rem; }
    .iot-feature-card { background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 12px 0 #2d2e8322; padding: 1.5rem 1.2rem 1.2rem 1.2rem; min-width: 320px; max-width: 420px; width: 100%; margin-bottom: 1.5rem; animation: fadeInCard 1.2s cubic-bezier(.8,-0.6,0,1.5); cursor: pointer; transition: box-shadow 0.2s, transform 0.2s; }
    .iot-feature-card:hover { transform: translateY(-6px) scale(1.04); box-shadow: 0 8px 32px 0 #2d2e8333; background: #f0f4ff; }
    .iot-feature-icon { font-size: 2.2rem; margin-bottom: 0.5rem; filter: drop-shadow(0 0 8px #4bc0c0cc); }
    .iot-device-status, .iot-alerts-feed { background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 12px 0 #4bc0c022; padding: 1.2rem 1.2rem 1.2rem 1.2rem; margin: 1.2rem 0; width: 92%; max-width: 600px; animation: fadeInCard 1.2s cubic-bezier(.8,-0.6,0,1.5); }
    .iot-device-status h4, .iot-alerts-feed h4 { font-size: 1.2rem; font-weight: 800; color: #2d2e83; margin-bottom: 1rem; text-align: center; }
    .iot-device-status ul, .iot-alerts-feed ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.7rem; }
    .iot-device-status li, .iot-alerts-feed li { font-size: 0.95rem; color: #4a4a68; display: flex; align-items: center; gap: 0.5rem; }
    .iot-footer { width: 100%; background: linear-gradient(135deg, #2d2e83, #4bc0c0); color: #fff; padding: 1.5rem 2rem; border-radius: 1.2rem 1.2rem 0 0; box-shadow: 0 -4px 16px 0 #4bc0c022; margin-top: 2rem; text-align: center; font-size: 0.9rem; animation: fadeInFooter 1.2s cubic-bezier(.8,-0.6,0,1.5); }
    .iot-footer-content { display: flex; flex-direction: column; gap: 0.5rem; }
    .iot-footer-content span { color: #e0e7ff; font-weight: 500; }
    .iot-modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeInBackdrop 0.5s cubic-bezier(.8,-0.6,0,1.5); }
    .iot-modal { background: #fff; border-radius: 1.2rem; box-shadow: 0 10px 30px 0 #4bc0c044; padding: 2.5rem; max-width: 500px; width: 90%; position: relative; animation: fadeInModal 0.5s cubic-bezier(.8,-0.6,0,1.5); }
    .iot-modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: #e84393; color: #fff; border: none; border-radius: 50%; width: 35px; height: 35px; font-size: 1.5rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px 0 #e8439355; transition: background 0.2s, transform 0.1s; }
    .iot-modal-close:hover { background: #c53070; transform: rotate(90deg); }
    .iot-modal-close:active { background: #388e3c; }
    .iot-modal-chart { margin-top: 1.5rem; text-align: center; font-size: 1.1rem; color: #2d2e83; }
    @keyframes fadeInCard { 0% { opacity: 0; transform: translateY(40px) scale(0.97); } 100% { opacity: 1; transform: none; } }
    @keyframes fadeInHeader { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: none; } }
    @keyframes fadeInHero { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: none; } }
    @keyframes fadeInFeatures { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: none; } }
    @keyframes fadeInFooter { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: none; } }
    @keyframes fadeInBackdrop { 0% { opacity: 0; } 100% { opacity: 1; } }
    @keyframes fadeInModal { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: none; } }
  `]
})
export class ESGIoTSmartTechEngineerComponent {
  username = '';
  darkMode = false;
  liveTemp = 22;
  liveHumidity = 45;
  liveEnergy = 320;
  sensorsOnline = 18;
  sensorsTotal = 20;
  lastSync = '2 min ago';
  alerts = [
    'Temperature spike in Plant B',
    'Sensor #12 offline',
    'Energy use above target in HQ',
    'Air quality alert in Office 3'
  ];
  featureModal: any = null;
  featureCards = [
    {
      icon: '🛰️',
      title: 'Deploying IoT Sensors for ESG Data',
      desc: 'Install and configure IoT sensors to collect data on energy, water, air quality, waste, and other ESG metrics across facilities.',
      detail: 'You can add new sensors, view sensor status, and configure data collection intervals for each facility. All sensor data is encrypted and sent to the ESG cloud platform.'
    },
    {
      icon: '🌡️',
      title: 'Real-Time Environmental Monitoring',
      desc: 'Monitor environmental conditions in real time, set up alerts for anomalies, and ensure compliance with sustainability targets.',
      detail: 'Live dashboards show temperature, humidity, CO₂, and more. Set custom thresholds and receive instant alerts for any anomalies.'
    },
    {
      icon: '🏢',
      title: 'Smart Building Automation',
      desc: 'Integrate IoT with building management systems to automate lighting, HVAC, and resource usage for optimal efficiency.',
      detail: 'Automate lighting, HVAC, and water systems based on occupancy and environmental data. Reduce costs and improve comfort.'
    },
    {
      icon: '🔧',
      title: 'Predictive Maintenance & Analytics',
      desc: 'Use IoT data and AI analytics to predict equipment failures, schedule maintenance, and reduce downtime and costs.',
      detail: 'AI-driven analytics predict failures before they happen. Schedule maintenance and track asset health in real time.'
    },
    {
      icon: '📊',
      title: 'Integrating IoT with ESG Reporting',
      desc: 'Automate the flow of IoT data into ESG dashboards and reports, ensuring accuracy and transparency for stakeholders.',
      detail: 'All sensor data is automatically included in ESG reports. Generate custom reports for stakeholders and compliance.'
    },
    {
      icon: '🚀',
      title: 'Researching Emerging Smart Tech',
      desc: 'Stay ahead of the curve by evaluating new smart technologies, such as edge computing, AI-driven sensors, and digital twins.',
      detail: 'Explore the latest in smart tech: edge AI, digital twins, smart glass, and more. Pilot new solutions and measure impact.'
    }
  ];

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  simulateSensors() {
    this.liveTemp = Math.round(20 + Math.random() * 6);
    this.liveHumidity = Math.round(40 + Math.random() * 20);
    this.liveEnergy = Math.round(250 + Math.random() * 200);
    this.sensorsOnline = 16 + Math.floor(Math.random() * 5);
    this.lastSync = 'just now';
    this.alerts.unshift('Sensor simulation updated (' + new Date().toLocaleTimeString() + ')');
    if (this.alerts.length > 5) this.alerts.pop();
  }

  openFeatureModal(card: any) {
    this.featureModal = card;
  }

  closeFeatureModal() {
    this.featureModal = null;
  }
} 