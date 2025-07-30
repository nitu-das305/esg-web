import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .login-container {
        min-height: 100vh;
        display: flex;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        overflow: hidden;
      }

      /* Left Side - ESG Welcome Section */
      .welcome-section {
        flex: 1;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3rem;
        position: relative;
        overflow: hidden;
      }

      .welcome-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.3;
      }

      .welcome-content {
        text-align: center;
        color: white;
        z-index: 2;
        position: relative;
        max-width: 600px;
      }

      .welcome-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, #ffffff, #e0e7ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: fadeInUp 1s ease-out;
      }

      .welcome-subtitle {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        animation: fadeInUp 1s ease-out 0.2s both;
      }

      .welcome-description {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 3rem;
        opacity: 0.8;
        animation: fadeInUp 1s ease-out 0.4s both;
      }

      .esg-features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 3rem;
        animation: fadeInUp 1s ease-out 0.6s both;
      }

      .feature-item {
        text-align: center;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
      }

      .feature-item:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        display: block;
        animation: float 3s ease-in-out infinite;
      }

      .feature-item:nth-child(2) .feature-icon {
        animation-delay: 0.5s;
      }

      .feature-item:nth-child(3) .feature-icon {
        animation-delay: 1s;
      }

      .feature-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .feature-description {
        font-size: 0.9rem;
        opacity: 0.8;
        line-height: 1.4;
      }

      /* Floating ESG Icons */
      .floating-icons {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
      }

      .floating-icon {
        position: absolute;
        font-size: 2rem;
        opacity: 0.1;
        animation: float 6s ease-in-out infinite;
      }

      .floating-icon:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
      .floating-icon:nth-child(2) { top: 20%; right: 15%; animation-delay: 1s; }
      .floating-icon:nth-child(3) { top: 60%; left: 5%; animation-delay: 2s; }
      .floating-icon:nth-child(4) { top: 70%; right: 10%; animation-delay: 3s; }
      .floating-icon:nth-child(5) { top: 40%; left: 20%; animation-delay: 4s; }
      .floating-icon:nth-child(6) { top: 80%; left: 30%; animation-delay: 5s; }

      /* Right Side - Login Form */
      .login-section {
        flex: 1;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;
      }

      .login-card {
        width: 100%;
        max-width: 450px;
        animation: slideInRight 1s ease-out;
      }

      .login-header {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      .login-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.5rem;
      }

      .login-subtitle {
        color: #64748b;
        font-size: 1.1rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #374151;
        font-size: 0.95rem;
      }

      .form-input, .form-select {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: #f8fafc;
      }

      .form-input:focus, .form-select:focus {
        outline: none;
        border-color: #2563eb;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        transform: translateY(-1px);
      }

      .form-select {
        cursor: pointer;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
      }

      .role-description {
        font-size: 0.9rem;
        color: #64748b;
        margin-top: 0.75rem;
        padding: 0.75rem;
        background: #f1f5f9;
        border-radius: 8px;
        border-left: 4px solid #2563eb;
        line-height: 1.5;
      }

      .login-btn {
        width: 100%;
        padding: 0.875rem 1rem;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: #ffffff;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 1rem;
        position: relative;
        overflow: hidden;
      }

      .login-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #1d4ed8, #1e40af);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
      }

      .login-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      .error-message {
        color: #dc2626;
        font-size: 0.9rem;
        margin-top: 1rem;
        padding: 0.75rem;
        background: #fef2f2;
        border-radius: 8px;
        border-left: 4px solid #dc2626;
        animation: shake 0.5s ease-in-out;
      }

      .demo-info {
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 12px;
        padding: 1.5rem;
        margin-top: 2rem;
        border: 1px solid #e2e8f0;
      }

      .demo-info h4 {
        color: #1e293b;
        margin-bottom: 0.75rem;
        font-size: 1rem;
      }

      .demo-info p {
        color: #64748b;
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      .demo-credentials {
        background: #ffffff;
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        margin-top: 0.75rem;
        font-family: 'Courier New', monospace;
        font-size: 0.85rem;
      }

      /* Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .login-container {
          flex-direction: column;
        }
        
        .welcome-section {
          padding: 2rem;
          min-height: 40vh;
        }
        
        .welcome-title {
          font-size: 2.5rem;
        }
        
        .esg-features {
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .feature-item {
          padding: 1rem;
        }
        
        .feature-icon {
          font-size: 2rem;
        }
      }

      @media (max-width: 768px) {
        .welcome-section {
          min-height: 35vh;
          padding: 1.5rem;
        }
        
        .welcome-title {
          font-size: 2rem;
        }
        
        .welcome-subtitle {
          font-size: 1.2rem;
        }
        
        .esg-features {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .login-section {
          padding: 2rem 1.5rem;
        }
        
        .login-card {
          max-width: 100%;
        }
      }

      @media (max-width: 480px) {
        .welcome-section {
          min-height: 30vh;
          padding: 1rem;
        }
        
        .welcome-title {
          font-size: 1.8rem;
        }
        
        .welcome-subtitle {
          font-size: 1rem;
        }
        
        .welcome-description {
          font-size: 0.9rem;
        }
        
        .login-section {
          padding: 1.5rem 1rem;
        }
        
        .login-title {
          font-size: 2rem;
        }
      }
    </style>

    <div class="login-container">
      <!-- Left Side - ESG Welcome Section -->
      <div class="welcome-section">
        <!-- Floating ESG Icons -->
        <div class="floating-icons">
          <div class="floating-icon">🌱</div>
          <div class="floating-icon">🌍</div>
          <div class="floating-icon">⚡</div>
          <div class="floating-icon">💧</div>
          <div class="floating-icon">🏭</div>
          <div class="floating-icon">🌿</div>
        </div>

        <div class="welcome-content">
          <h1 class="welcome-title">Welcome to ESG Dashboard</h1>
          <p class="welcome-subtitle">Empowering Sustainable Business Decisions</p>
          <p class="welcome-description">
            Transform your organization's approach to Environmental, Social, and Governance (ESG) 
            reporting with our comprehensive dashboard. Monitor, analyze, and drive sustainable 
            business practices with real-time insights and actionable data.
          </p>

          <div class="esg-features">
            <div class="feature-item">
              <span class="feature-icon">🌱</span>
              <div class="feature-title">Environmental</div>
              <div class="feature-description">Track carbon footprint, energy consumption, and sustainability initiatives</div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">👥</span>
              <div class="feature-title">Social</div>
              <div class="feature-description">Monitor diversity, community impact, and employee engagement</div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">⚖️</span>
              <div class="feature-title">Governance</div>
              <div class="feature-description">Ensure compliance, transparency, and ethical business practices</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="login-section">
        <div class="login-card">
          <div class="login-header">
            <h1 class="login-title">Sign In</h1>
            <p class="login-subtitle">Access your ESG dashboard</p>
          </div>
          
          <form (submit)="onLogin($event)">
            <div class="form-group">
              <label class="form-label">Username</label>
              <input 
                type="text" 
                class="form-input" 
                [(ngModel)]="username" 
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Password</label>
              <input 
                type="password" 
                class="form-input" 
                [(ngModel)]="password" 
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Role</label>
              <select 
                class="form-select" 
                [(ngModel)]="selectedRole" 
                name="role"
                (change)="onRoleChange()"
                required
              >
                <option value="marketing_head">Marketing Head</option>
                <option value="sustainability-head">Sustainability Head</option>
                <option value="esg-specialist">ESG Specialist</option>
                <option value="environmental-manager">Environmental Manager</option>
                <option value="social-manager">Social Manager</option>
                <option value="governance-manager">Governance Manager</option>
              </select>
              <div class="role-description" *ngIf="selectedRole">
                {{ getRoleDescription() }}
              </div>
            </div>
            
            <button 
              type="submit" 
              class="login-btn"
              [disabled]="!username || !password || !selectedRole"
            >
              Sign In
            </button>
          </form>
          
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
          
          
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  selectedRole = '';
  errorMessage = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Check if user is already logged in
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        this.redirectToDashboard(user.role);
      }
    }
  }

  onRoleChange() {
    this.errorMessage = '';
  }

  getRoleDescription(): string {
    const descriptions: { [key: string]: string } = {
      'sustainability-head': 'Full access to all ESG dashboards and reporting capabilities. Strategic oversight and decision-making authority.',
      'esg-specialist': 'Access to Environmental, Social, and Governance dashboards. Comprehensive ESG analysis and monitoring.',
      'marketing_head': 'Access to Marketing dashboards. Comprehensive Marketing analysis and monitoring.',
      'environmental-manager': 'Focus on environmental metrics, carbon footprint, energy consumption, and sustainability initiatives.',
      'social-manager': 'Employee engagement, community impact, diversity & inclusion, and social responsibility metrics.',
      'governance-manager': 'Board composition, compliance status, ethics & transparency, and governance frameworks.'
    };
    return descriptions[this.selectedRole] || '';
  }

  onLogin(event: Event) {
    event.preventDefault();
    
    // Simple validation
    if (!this.username || !this.password || !this.selectedRole) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Mock authentication - in real app, this would call an API
    if (this.username === 'admin' && this.password === 'admin') {
      // Store user info in localStorage or service
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify({
          username: this.username,
          role: this.selectedRole
        }));
      }
      
      // Redirect based on role
      this.redirectToDashboard(this.selectedRole);
    } else {
      this.errorMessage = 'Invalid username or password. Use admin/admin for demo.';
    }
  }

  redirectToDashboard(role: string) {
    switch (role) {
      case 'sustainability-head':
        this.router.navigate(['/environmental-dashboard']);
        break;
      case 'esg-specialist':
        this.router.navigate(['/esg-specialist']);
        break;
      case 'marketing_head':
        this.router.navigate(['/marketing-dashboard']);
        break;
      case 'environmental-manager':
        this.router.navigate(['/environmental-dashboard']);
        break;
      case 'social-manager':
        this.router.navigate(['/social-dashboard']);
        break;
      case 'governance-manager':
        this.router.navigate(['/goverance-dashboard']);
        break;
      default:
        this.router.navigate(['/environmental-dashboard']);
    }
  }

  // Static method to logout (can be called from other components)
  static logout(router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
    router.navigate(['/login']);
  }

  // Method to clear session for testing
  clearSession() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    window.location.reload();
  }
} 