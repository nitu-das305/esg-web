import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme.service';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'on leave' | 'overdue';
  campaignsManaged: number;
  contentPublished: number;
  engagementScore: number;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  deadline: string;
}

interface TrainingRecord {
  memberName: string;
  training: string;
  status: 'certified' | 'in-progress' | 'not-attended';
}

interface Issue {
  id: number;
  memberName: string;
  description: string;
  status: 'pending' | 'resolved';
}

interface Goal {
  memberName: string;
  goal: string;
  target: string;
}

@Component({
  selector: 'marketing-team',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <style>
      .edash-root {
        min-height: 100vh;
        background: #f8fafc;
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        flex-direction: row;
      }
      .edash-sidenav {
        width: 260px;
        background: #fff;
        border-right: 1px solid #ececec;
        box-shadow: 2px 0 8px rgba(0,0,0,0.03);
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 1000;
        overflow-y: auto;
        overflow-x: hidden;
        transition: all 0.3s ease;
      }
      
      .edash-sidenav::-webkit-scrollbar {
        width: 6px;
      }
      .edash-sidenav::-webkit-scrollbar-track {
        background: transparent;
      }
      .edash-sidenav::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
      }
      .edash-sidenav::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      .edash-sidenav.dark-mode::-webkit-scrollbar-thumb {
        background: #475569;
      }
      .edash-sidenav.dark-mode::-webkit-scrollbar-thumb:hover {
        background: #64748b;
      }
      
      .edash-sidenav.collapsed {
        width: 70px;
      }
      .edash-sidenav.collapsed .edash-nav-link {
        justify-content: center;
        padding: 0.75rem 0.5rem;
      }
      .edash-sidenav.collapsed .edash-nav-icon {
        margin-right: 0;
      }
      .edash-sidenav.collapsed .edash-nav-actions {
        padding: 0 0.5rem 1rem 0.5rem;
      }
      .edash-sidenav.collapsed .edash-nav-actions button {
        justify-content: center;
        padding: 0.5rem;
        width: auto;
      }
      .edash-sidenav.collapsed .edash-nav-actions .icon {
        margin-right: 0;
      }
      
      .edash-sidenav.collapsed .edash-nav-link {
        position: relative;
      }
      .edash-sidenav.collapsed .edash-nav-link:hover::after {
        content: attr(data-title);
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        background: #1f2937;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        white-space: nowrap;
        z-index: 1001;
        margin-left: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .edash-sidenav.collapsed .edash-nav-link span:not(.edash-nav-icon),
      .edash-sidenav.collapsed .edash-nav-actions span:not(.icon) {
        display: none;
      }
      .edash-sidenav.collapsed .edash-title {
        display: none;
      }
      
      .edash-root > .edash-main {
        margin-left: 260px;
        transition: margin-left 0.3s ease;
        width: calc(100% - 260px);
        min-height: 100vh;
        padding: 2rem;
        background: #f8fafc;
        transition: background 0.3s, color 0.3s;
      }
      .edash-root > .edash-main.sidebar-collapsed {
        margin-left: 70px;
        width: calc(100% - 70px);
      }
      
      .edash-sidenav.dark-mode {
        background: #1a1a2e;
        color: #e0e0e0;
        border-right: 1px solid #333;
      }
      .edash-sidenav-header {
        padding: 2rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .edash-logo {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
        background: #dc2626;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
      }
      .edash-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2563eb;
      }
      .edash-sidenav.dark-mode .edash-title {
        color: #7eaaff;
      }
      .edash-nav {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        flex: 1 1 auto;
        overflow-y: auto;
        max-height: calc(100vh - 200px);
      }
      .edash-nav-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.5rem;
        color: #333;
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        border-right: 3px solid transparent;
        transition: background 0.2s, color 0.2s;
      }
      .edash-nav-link.active {
        background: #e6f0ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
      }
      .edash-nav-link:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .edash-sidenav.dark-mode .edash-nav-link {
        color: #e0e0e0;
      }
      .edash-sidenav.dark-mode .edash-nav-link.active {
        background: #223c2c;
        color: #7eaaff;
        border-right: 3px solid #7eaaff;
      }
      .edash-sidenav.dark-mode .edash-nav-link:hover {
        background: #22223c;
        color: #7eaaff;
      }
      .edash-nav-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 2rem;
        padding: 0 1rem 1rem 1rem;
      }
      .edash-nav-actions button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        padding: 0.5rem 1.5rem;
        border-radius: 6px;
        border: none;
        background: none;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #333;
        width: 100%;
        justify-content: flex-start;
      }
      .edash-nav-actions button:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
      .edash-nav-actions button:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .edash-sidenav.dark-mode .edash-nav-actions button {
        color: #e0e0e0;
      }
      .edash-sidenav.dark-mode .edash-nav-actions button:hover {
        background: #23284a;
        color: #7eaaff;
      }
      .edash-nav-actions .icon {
        font-size: 1.2rem;
        display: inline-block;
      }
      .edash-nav-actions .edash-logout {
        color: #dc3545;
        font-weight: 600;
      }
      .edash-sidenav.dark-mode .edash-nav-actions .edash-logout {
        color: #ffb3b3;
      }
      .edash-nav-actions .edash-logout:hover {
        background: #ffe6e6;
        color: #a71d2a;
      }
      .edash-sidenav.dark-mode .edash-nav-actions .edash-logout:hover {
        background: #3a1a1a;
        color: #ff4d4d;
      }

      .edash-root.dark-mode {
        background: #181828;
        color: #e0e0e0;
      }
      .edash-root.dark-mode .edash-main {
        background: #181828;
        color: #e0e0e0;
      }

      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .header-content h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0;
        margin-bottom: 0.5rem;
      }
      .edash-root.dark-mode .header-content h1 {
        color: #e0e0e0;
      }
      .header-content p {
        font-size: 1.1rem;
        color: #6b7280;
        margin: 0;
      }
      .edash-root.dark-mode .header-content p {
        color: #9ca3af;
      }
      .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn-primary {
        background: #2563eb;
        color: white;
      }
      .btn-primary:hover {
        background: #1d4ed8;
      }
      .btn-secondary {
        background: white;
        color: #374151;
        border: 1px solid #d1d5db;
      }
      .btn-secondary:hover {
        background: #f9fafb;
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
      }
      .dashboard-section {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        border: 1px solid #ececec;
        transition: background 0.3s, color 0.3s;
      }
      .edash-root.dark-mode .dashboard-section {
        background: #23284a;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .edash-root.dark-mode .section-title {
        color: #e0e0e0;
      }
      .section-icon {
        font-size: 1.5rem;
      }
      .ai-tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        margin-left: 1rem;
      }
      .ai-suggestion {
        background: #dbeafe;
        color: #1e40af;
      }
      .ai-smart-assignment {
        background: #dcfce7;
        color: #166534;
      }
      .ai-leaderboard {
        background: #fce7f3;
        color: #be185d;
      }
      .ai-recommendations {
        background: #fef3c7;
        color: #92400e;
      }
      .ai-summary {
        background: #dbeafe;
        color: #1e40af;
      }
      .ai-prioritization {
        background: #fee2e2;
        color: #991b1b;
      }
      .ai-forecast {
        background: #dcfce7;
        color: #166534;
      }
      .ai-goal-setting {
        background: #f3e8ff;
        color: #7c3aed;
      }

      .team-member {
        padding: 0.75rem 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .team-member:last-child {
        border-bottom: none;
      }
      .member-name {
        font-weight: 600;
        color: #1f2937;
      }
      .edash-root.dark-mode .member-name {
        color: #e0e0e0;
      }
      .member-role {
        color: #6b7280;
        font-size: 0.875rem;
      }
      .edash-root.dark-mode .member-role {
        color: #9ca3af;
      }

      .task-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      .task-table th,
      .task-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      .edash-root.dark-mode .task-table th,
      .edash-root.dark-mode .task-table td {
        border-bottom: 1px solid #374151;
      }
      .task-table th {
        background: #f8fafc;
        font-weight: 600;
        color: #1f2937;
      }
      .edash-root.dark-mode .task-table th {
        background: #1a1a2e;
        color: #e0e0e0;
      }
      .task-table tr:hover {
        background: #f8fafc;
      }
      .edash-root.dark-mode .task-table tr:hover {
        background: #1a1a2e;
      }

      .status-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
      }
      .status-pending {
        background: #fef3c7;
        color: #92400e;
      }
      .status-in-progress {
        background: #dbeafe;
        color: #1e40af;
      }
      .status-completed {
        background: #dcfce7;
        color: #166534;
      }
      .status-certified {
        background: #dcfce7;
        color: #166534;
      }
      .status-resolved {
        background: #dcfce7;
        color: #166534;
      }
      .edash-root.dark-mode .status-pending {
        background: #92400e;
        color: #fef3c7;
      }
      .edash-root.dark-mode .status-in-progress {
        background: #1e40af;
        color: #dbeafe;
      }
      .edash-root.dark-mode .status-completed {
        background: #166534;
        color: #dcfce7;
      }
      .edash-root.dark-mode .status-certified {
        background: #166534;
        color: #dcfce7;
      }
      .edash-root.dark-mode .status-resolved {
        background: #166534;
        color: #dcfce7;
      }

      .progress-bar {
        width: 100%;
        height: 8px;
        background: #e2e8f0;
        border-radius: 4px;
        overflow: hidden;
      }
      .edash-root.dark-mode .progress-bar {
        background: #374151;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      .kpi-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .kpi-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .kpi-item:last-child {
        border-bottom: none;
      }
      .kpi-label {
        font-weight: 600;
        color: #1f2937;
      }
      .edash-root.dark-mode .kpi-label {
        color: #e0e0e0;
      }
      .kpi-value {
        color: #6b7280;
        font-size: 0.875rem;
      }
      .edash-root.dark-mode .kpi-value {
        color: #9ca3af;
      }

      .leaderboard {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
      }
      .leaderboard-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .leaderboard-item:last-child {
        border-bottom: none;
      }
      .leaderboard-rank {
        font-weight: 600;
        color: #1f2937;
      }
      .edash-root.dark-mode .leaderboard-rank {
        color: #e0e0e0;
      }
      .leaderboard-score {
        color: #6b7280;
        font-size: 0.875rem;
      }
      .edash-root.dark-mode .leaderboard-score {
        color: #9ca3af;
      }

      .ai-suggestion-text {
        color: #1e40af;
        font-size: 0.875rem;
        font-style: italic;
        margin-top: 1rem;
        padding: 0.75rem;
        background: #eff6ff;
        border-radius: 8px;
        border-left: 4px solid #2563eb;
      }
      .edash-root.dark-mode .ai-suggestion-text {
        background: #1e3a8a;
        color: #dbeafe;
        border-left-color: #3b82f6;
      }

      .full-width-section {
        grid-column: 1 / -1;
      }

      @media (max-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
        .dashboard-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
      }
    </style>
    <div class="edash-root" [class.dark-mode]="darkMode">
      <aside class="edash-sidenav" [class.collapsed]="sidebarCollapsed" [class.dark-mode]="darkMode">
        <div class="edash-sidenav-header">
          <img src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnLogo.jpeg" alt="Logo" class="edash-logo" />
          <span *ngIf="!sidebarCollapsed" class="edash-title">Marketing Head</span>
        </div>
        <nav class="edash-nav">
          <a routerLink="/marketing-head" class="edash-nav-link" data-title="Dashboard">
            <span class="edash-nav-icon">📊</span>
            <span *ngIf="!sidebarCollapsed">Dashboard</span>
          </a>
          <a routerLink="/marketing-team" class="edash-nav-link active" data-title="Team Management">
            <span class="edash-nav-icon">👥</span>
            <span *ngIf="!sidebarCollapsed">Team Management</span>
          </a>
          <a routerLink="/leads" class="edash-nav-link" data-title="Leads">
            <span class="edash-nav-icon">🎯</span>
            <span *ngIf="!sidebarCollapsed">Leads</span>
          </a>
          
          <a routerLink="/resource-management" class="edash-nav-link" data-title="Resource Management">
            <span class="edash-nav-icon">📦</span>
            <span *ngIf="!sidebarCollapsed">Resource Management</span>
          </a>
          <a routerLink="/report-analytics" class="edash-nav-link" data-title="Report & Analytics">
            <span class="edash-nav-icon">📈</span>
            <span *ngIf="!sidebarCollapsed">Report & Analytics</span>
          </a>
         
          <a routerLink="/training" class="edash-nav-link" data-title="Training & Develop">
            <span class="edash-nav-icon">🎓</span>
            <span *ngIf="!sidebarCollapsed">Training & Develop</span>
          </a>
          
          <a routerLink="/help-support" class="edash-nav-link" data-title="Help & Support">
            <span class="edash-nav-icon">🆘</span>
            <span *ngIf="!sidebarCollapsed">Help & Support</span>
          </a>
          <div class="edash-nav-actions">
            <button class="edash-logout" (click)="logout()" aria-label="Logout" data-title="Logout">
              <span class="icon">🚪</span>
              <span *ngIf="!sidebarCollapsed">Logout</span>
            </button>
            <button class="edash-sidenav-toggle" (click)="sidebarCollapsed=!sidebarCollapsed" aria-label="Toggle sidenav" data-title="Collapse">
              <span class="icon">⬅️</span>
              <span *ngIf="!sidebarCollapsed">Collapse</span>
            </button>
            <button class="edash-dark-toggle" (click)="toggleDarkMode()" aria-label="Toggle dark mode" data-title="Light Mode">
              <span class="icon">☀️</span>
              <span *ngIf="!sidebarCollapsed">Light Mode</span>
            </button>
          </div>
        </nav>
      </aside>
      <main class="edash-main" [class.sidebar-collapsed]="sidebarCollapsed">
        <!-- Header -->
        <div class="dashboard-header">
          <div class="header-content">
            <h1>👥 Manage Team</h1>
            <p>Track, assign, guide, and improve your marketing team with smart tools and AI insights</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-primary" (click)="addTeamMember()">
              ➕ Add Team Member
            </button>
            <button class="btn btn-secondary" (click)="exportReport()">
              📊 Export Report
            </button>
          </div>
        </div>

        <!-- Team Structure & Hierarchy -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">👥</span>
            Team Structure & Hierarchy
            <span class="ai-tag ai-suggestion">AI Suggestion</span>
          </div>
          <div class="team-member">
            <div class="member-name">Life Cycle Assessment Specialist: Abdullah Al-Rashid</div>
          </div>
          <div class="team-member">
            <div class="member-name">ESG IoT and smart Tech engineer: Khalid Al-Sayed</div>
          </div>
          <div class="team-member">
            <div class="member-name">Content Strategist: Noura Al-Zahra</div>
          </div>
        </div>

        <!-- Reporting Hierarchy -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">📋</span>
            Reporting Hierarchy
          </div>
          <div class="team-member">
            <div class="member-name">Abdullah Al-Rashid (Supervisor) → Khalid Al-Sayed, Noura Al-Zahra</div>
          </div>
          <div class="ai-suggestion-text">
            AI: Suggests moving Noura Al-Zahra to Digital for better workload balance
          </div>
        </div>

        <!-- Task Assignment & Tracking -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">✅</span>
            Task Assignment & Tracking
            <span class="ai-tag ai-smart-assignment">AI Smart Assignment</span>
          </div>
          <table class="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let task of tasks">
                <td>{{ task.title }}</td>
                <td>{{ task.assignedTo }}</td>
                <td>
                  <span class="status-badge" [class]="'status-' + task.status">
                    {{ task.status }}
                  </span>
                </td>
                <td>
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="task.progress"></div>
                  </div>
                  {{ task.progress }}%
                </td>
                <td>{{ task.deadline }}</td>
                <td>
                  <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="ai-suggestion-text">
            AI: Assigns "Write Blog Series" to Noura Al-Zahra based on skill and availability
          </div>
        </div>

        <!-- Performance Dashboard -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">📊</span>
            Performance Dashboard
            <span class="ai-tag ai-leaderboard">AI Leaderboard</span>
          </div>
          <ul class="kpi-list">
            <li class="kpi-item">
              <div class="kpi-label">Social Media Handled:</div>
              <div class="kpi-value">Abdullah Al-Rashid (120), Noura Al-Zahra (90), Khalid Al-Sayed (80)</div>
            </li>
            <li class="kpi-item">
              <div class="kpi-label">Governance:</div>
              <div class="kpi-value">Abdullah Al-Rashid (30), Noura Al-Zahra (25), Khalid Al-Sayed (20)</div>
            </li>
            <li class="kpi-item">
              <div class="kpi-label">Initiative ROI:</div>
              <div class="kpi-value">Abdullah Al-Rashid (3.2x), Noura Al-Zahra (2.8x), Khalid Al-Sayed (2.5x)</div>
            </li>
          </ul>
          <div class="section-title" style="margin-top: 1.5rem; font-size: 1.25rem;">Leaderboard</div>
          <ul class="leaderboard">
            <li class="leaderboard-item">
              <span class="leaderboard-rank">1. Abdullah Al-Rashid</span>
              <span class="leaderboard-score">Score: 92</span>
            </li>
            <li class="leaderboard-item">
              <span class="leaderboard-rank">2. Noura Al-Zahra</span>
              <span class="leaderboard-score">Score: 88</span>
            </li>
            <li class="leaderboard-item">
              <span class="leaderboard-rank">3. Khalid Al-Sayed</span>
              <span class="leaderboard-score">Score: 85</span>
            </li>
          </ul>
          <div class="ai-suggestion-text">
            AI: Predicts Khalid Al-Sayed at risk of burnout
          </div>
        </div>

        <!-- Communication Center -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">💬</span>
            Communication Center
            <span class="ai-tag ai-summary">AI Summary</span>
          </div>
          <ul class="kpi-list">
            <li class="kpi-item">
              <div class="kpi-label">Announcement:</div>
              <div class="kpi-value">'Q2 Initiative Launch on July 10'</div>
            </li>
            <li class="kpi-item">
              <div class="kpi-label">Reminder:</div>
              <div class="kpi-value">'Submit weekly report by Friday'</div>
            </li>
            <li class="kpi-item">
              <div class="kpi-label">Brief:</div>
              <div class="kpi-value">'SOP for Event Coordination uploaded'</div>
            </li>
          </ul>
          <div class="ai-suggestion-text">
            AI: Top 3 updates for Abdullah Al-Rashid: Campaign Launch, Report Reminder, SOP Upload
          </div>
        </div>

        <!-- Issue Escalation Panel -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">⚠️</span>
            Issue Escalation Panel
            <span class="ai-tag ai-prioritization">AI Prioritization</span>
          </div>
          <div class="team-member">
            <div class="member-name">Khalid Al-Sayed: 'Cannot access Initiative analytics'</div>
            <span class="status-badge status-pending">Pending</span>
          </div>
          <div class="team-member">
            <div class="member-name">Noura Al-Zahra: 'Need approval for blog series'</div>
            <span class="status-badge status-resolved">Resolved</span>
          </div>
          <div class="ai-suggestion-text">
            AI: Prioritizes Khalid Al-Sayed's issue as urgent
          </div>
        </div>

        <!-- Attendance & Availability -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">📅</span>
            Attendance & Availability
            <span class="ai-tag ai-forecast">AI Forecast</span>
          </div>
          <div class="team-member">
            <div class="member-name">Abdullah Al-Rashid: Present</div>
          </div>
          <div class="team-member">
            <div class="member-name">Noura Al-Zahra: On Leave (July 8-10)</div>
          </div>
          <div class="team-member">
            <div class="member-name">Khalid Al-Sayed: Present</div>
          </div>
          <div class="ai-suggestion-text">
            AI: Predicts resource gap on July 8-10
          </div>
        </div>

        <!-- Goal Planning & Reviews -->
        <div class="dashboard-section">
          <div class="section-title">
            <span class="section-icon">🎯</span>
            Goal Planning & Reviews
            <span class="ai-tag ai-goal-setting">AI Goal Setting</span>
          </div>
          <div class="team-member">
            <div class="member-name">Abdullah Al-Rashid: July Goal - 40 Accounts</div>
          </div>
          <div class="team-member">
            <div class="member-name">Noura Al-Zahra: July Goal - 10 blog posts</div>
          </div>
          <div class="team-member">
            <div class="member-name">Khalid Al-Sayed: July Goal - 20 social Initiative</div>
          </div>
          <div class="ai-suggestion-text">
            AI: Suggests higher goal for Abdullah Al-Rashid based on past performance
          </div>
        </div>

        <!-- Training & Development Tracker -->
        <div class="dashboard-section full-width-section">
          <div class="section-title">
            <span class="section-icon">📚</span>
            Training & Development Tracker
            <span class="ai-tag ai-recommendations">AI Recommendations</span>
          </div>
          <div class="team-member">
            <div class="member-name">Abdullah Al-Rashid: Attended "Digital Initiative Bootcamp"</div>
            <span class="status-badge status-certified">Certified</span>
          </div>
          <div class="team-member">
            <div class="member-name">Noura Al-Zahra: Attended "Content Strategy Seminar"</div>
            <span class="status-badge status-pending">In Progress</span>
          </div>
          <div class="team-member">
            <div class="member-name">Khalid Al-Sayed: Not attended recent training</div>
          </div>
          <div class="ai-suggestion-text">
            AI: Recommends "Social Media Analytics" for Khalid Al-Sayed
          </div>
        </div>
      </main>
    </div>
  `
})
export class MarketingTeamComponent implements OnInit, OnDestroy {
  sidebarCollapsed = false;
  darkMode = false;
  private themeSubscription!: Subscription;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Launch Q2 Initiative',
      assignedTo: 'Abdullah Al-Rashid',
      status: 'in-progress',
      progress: 70,
      deadline: '2024-07-10'
    },
    {
      id: 2,
      title: 'Write Blog Series',
      assignedTo: 'Noura Al-Zahra',
      status: 'pending',
      progress: 0,
      deadline: '2024-07-12'
    },
    {
      id: 3,
      title: 'Social Media Audit',
      assignedTo: 'Khalid Al-Sayed',
      status: 'completed',
      progress: 100,
      deadline: '2024-06-30'
    }
  ];

    constructor(private router: Router, private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themeSubscription = this.themeService.darkMode$.subscribe(
      isDark => this.darkMode = isDark
    );
  }
  
  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  
  logout() { 
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  
  toggleDarkMode() { 
    this.themeService.toggleDarkMode(); 
  }

  addTeamMember() {
    alert('Add Team Member functionality will be implemented here!');
  }

  exportReport() {
    alert('Report exported successfully!');
  }
} 