import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme.service';

interface Lead {
  id: number;
  name: string;
  email: string;
  source: string;
  status: 'New' | 'Opportunities' | 'Interview Schedule' | 'Approved';
  assignedTo: string;
  lastContact: string;
  avatar: string;
}

@Component({
  selector: 'app-leads',
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
      .btn-primary {
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn-primary:hover {
        background: #1d4ed8;
      }
      .btn-secondary {
        background: white;
        color: #374151;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .edash-root.dark-mode .btn-secondary {
        background: #374151;
        color: #e0e0e0;
        border-color: #4b5563;
      }
      .btn-secondary:hover {
        background: #f9fafb;
        border-color: #9ca3af;
      }
      .edash-root.dark-mode .btn-secondary:hover {
        background: #4b5563;
        border-color: #6b7280;
      }

      .leads-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        gap: 1rem;
      }
      .search-filter-group {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex: 1;
      }
      .search-input {
        flex: 1;
        max-width: 400px;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 1rem;
        background: white;
        color: #374151;
      }
      .edash-root.dark-mode .search-input {
        background: #374151;
        color: #e0e0e0;
        border-color: #4b5563;
      }
      .search-input:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }
      .status-filter {
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 1rem;
        background: white;
        color: #374151;
        min-width: 150px;
      }
      .edash-root.dark-mode .status-filter {
        background: #374151;
        color: #e0e0e0;
        border-color: #4b5563;
      }
      .status-filter:focus {
        outline: none;
        border-color: #2563eb;
      }

      .leads-table {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border: 1px solid #e5e7eb;
      }
      .edash-root.dark-mode .leads-table {
        background: #23284a;
        border-color: #374151;
      }
      .table-header {
        background: #f9fafb;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e5e7eb;
      }
      .edash-root.dark-mode .table-header {
        background: #1a1a2e;
        border-bottom-color: #374151;
      }
      .table-header h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }
      .edash-root.dark-mode .table-header h2 {
        color: #e0e0e0;
      }
      .table-container {
        overflow-x: auto;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
      }
      .table th {
        background: #f9fafb;
        padding: 1rem 1.5rem;
        text-align: left;
        font-weight: 600;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .edash-root.dark-mode .table th {
        background: #1a1a2e;
        color: #e0e0e0;
        border-bottom-color: #374151;
      }
      .table td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #f3f4f6;
        color: #374151;
      }
      .edash-root.dark-mode .table td {
        color: #e0e0e0;
        border-bottom-color: #374151;
      }
      .table tr:hover {
        background: #f9fafb;
      }
      .edash-root.dark-mode .table tr:hover {
        background: #1a1a2e;
      }

      .lead-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1rem;
      }
      .lead-details {
        display: flex;
        flex-direction: column;
      }
      .lead-name {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }
      .edash-root.dark-mode .lead-name {
        color: #e0e0e0;
      }
      .lead-email {
        font-size: 0.875rem;
        color: #6b7280;
      }
      .edash-root.dark-mode .lead-email {
        color: #9ca3af;
      }

      .status-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
      }
      .status-new {
        background: #dbeafe;
        color: #1e40af;
      }
      .status-opportunities {
        background: #fef3c7;
        color: #92400e;
      }
      .status-interview-schedule {
        background: #e9d5ff;
        color: #7c3aed;
      }
      .status-approved {
        background: #dcfce7;
        color: #166534;
      }
      .edash-root.dark-mode .status-new {
        background: #1e40af;
        color: #dbeafe;
      }
      .edash-root.dark-mode .status-opportunities {
        background: #92400e;
        color: #fef3c7;
      }
      .edash-root.dark-mode .status-interview-schedule {
        background: #7c3aed;
        color: #e9d5ff;
      }
      .edash-root.dark-mode .status-approved {
        background: #166534;
        color: #dcfce7;
      }

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }
      .action-btn {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        border: none;
        background: #f3f4f6;
        color: #6b7280;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        font-size: 0.875rem;
      }
      .edash-root.dark-mode .action-btn {
        background: #374151;
        color: #9ca3af;
      }
      .action-btn:hover {
        background: #e5e7eb;
        color: #374151;
      }
      .edash-root.dark-mode .action-btn:hover {
        background: #4b5563;
        color: #e0e0e0;
      }

      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
      }
      .edash-root.dark-mode .pagination {
        background: #1a1a2e;
        border-top-color: #374151;
      }
      .pagination-info {
        color: #6b7280;
        font-size: 0.875rem;
      }
      .edash-root.dark-mode .pagination-info {
        color: #9ca3af;
      }
      .pagination-controls {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .pagination-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        background: white;
        color: #374151;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;
      }
      .edash-root.dark-mode .pagination-btn {
        background: #374151;
        color: #e0e0e0;
        border-color: #4b5563;
      }
      .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .pagination-btn:hover:not(:disabled) {
        background: #f9fafb;
        border-color: #9ca3af;
      }
      .edash-root.dark-mode .pagination-btn:hover:not(:disabled) {
        background: #4b5563;
        border-color: #6b7280;
      }

      @media (max-width: 768px) {
        .leads-controls {
          flex-direction: column;
          align-items: stretch;
        }
        .search-filter-group {
          flex-direction: column;
        }
        .header-actions {
          flex-direction: column;
          gap: 0.5rem;
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
          <a routerLink="/marketing-team" class="edash-nav-link" data-title="Team Management">
            <span class="edash-nav-icon">👥</span>
            <span *ngIf="!sidebarCollapsed">Team Management</span>
          </a>
          <a routerLink="/leads" class="edash-nav-link active" data-title="Leads">
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
            <h1>Leads</h1>
            <p>Manage the entire lead lifecycle with AI-powered insights.</p>
          </div>
          <div class="header-actions">
            <button class="btn-primary" (click)="importLeads()">
              <span>📤</span>
              Import Leads
            </button>
            <button class="btn-secondary" (click)="exportLeads()">
              <span>📥</span>
              Export Leads
            </button>
          </div>
        </div>

        <!-- Leads Controls -->
        <div class="leads-controls">
          <div class="search-filter-group">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search leads..." 
              [(ngModel)]="searchTerm"
              (input)="filterLeads()"
            >
            <select class="status-filter" [(ngModel)]="selectedStatus" (change)="filterLeads()">
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Opportunities">Opportunities</option>
              <option value="Interview Schedule">Interview Schedule</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <div class="header-actions">
            <button class="btn-primary" (click)="addLead()">
              <span>➕</span>
              + Add Lead
            </button>
            <button class="btn-secondary" (click)="exportLeads()">
              <span>📥</span>
              Export
            </button>
          </div>
        </div>

        <!-- Leads Table -->
        <div class="leads-table">
          <div class="table-header">
            <h2>Lead Management</h2>
          </div>
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" (change)="selectAll($event)">
                  </th>
                  <th>LEAD ↑</th>
                  <th>SOURCE</th>
                  <th>STATUS</th>
                  <th>ASSIGNED TO</th>
                  <th>LAST CONTACT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let lead of filteredLeads">
                  <td>
                    <input type="checkbox" [checked]="selectedLeads.includes(lead.id)" (change)="toggleLeadSelection(lead.id)">
                  </td>
                  <td>
                    <div class="lead-info">
                      <div class="avatar">{{ lead.avatar }}</div>
                      <div class="lead-details">
                        <div class="lead-name">{{ lead.name }}</div>
                        <div class="lead-email">{{ lead.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ lead.source }}</td>
                  <td>
                    <span class="status-badge" [class]="'status-' + lead.status.toLowerCase().replace(' ', '-')">
                      {{ lead.status }}
                    </span>
                  </td>
                  <td>
                    <div class="lead-info">
                      <div class="avatar">{{ getInitials(lead.assignedTo) }}</div>
                      <div class="lead-name">{{ lead.assignedTo }}</div>
                    </div>
                  </td>
                  <td>{{ lead.lastContact }}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="action-btn" (click)="emailLead(lead)" title="Email">✉️</button>
                      <button class="action-btn" (click)="messageLead(lead)" title="Message">💬</button>
                      <button class="action-btn" (click)="viewLead(lead)" title="View">👤</button>
                      <button class="action-btn" (click)="editLead(lead)" title="Edit">✏️</button>
                      <button class="action-btn" (click)="deleteLead(lead)" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination">
            <div class="pagination-info">
              Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, filteredLeads.length) }} of {{ filteredLeads.length }} leads
            </div>
            <div class="pagination-controls">
              <button class="pagination-btn" [disabled]="currentPage === 1" (click)="previousPage()">
                Previous
              </button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button class="pagination-btn" [disabled]="currentPage === totalPages" (click)="nextPage()">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class LeadsComponent implements OnInit, OnDestroy {
  sidebarCollapsed = false;
  darkMode = false;
  private themeSubscription!: Subscription;
  searchTerm = '';
  selectedStatus = '';
  selectedLeads: number[] = [];
  currentPage = 1;
  pageSize = 8;

  leads: Lead[] = [
    {
      id: 1,
      name: 'Noura Al-Zahra',
      email: 'noura.zahra@example.com',
      source: 'Website',
      status: 'New',
      assignedTo: 'Abdullah Al-Rashid',
      lastContact: '2024-04-10',
      avatar: 'N'
    },
    {
      id: 2,
      name: 'Khalid Al-Sayed',
      email: 'khalid.sayed@example.com',
      source: 'Social Media',
      status: 'Opportunities',
      assignedTo: 'Aisha Al-Hassan',
      lastContact: '2024-04-09',
      avatar: 'K'
    },
    {
      id: 3,
      name: 'Layla Al-Mansour',
      email: 'layla.mansour@example.com',
      source: 'Referral',
      status: 'Interview Schedule',
      assignedTo: 'Omar Al-Mutairi',
      lastContact: '2024-04-08',
      avatar: 'L'
    },
    {
      id: 4,
      name: 'Abdullah Al-Rashid',
      email: 'abdullah.rashid@example.com',
      source: 'Events',
      status: 'Approved',
      assignedTo: 'Fatima Al-Rashid',
      lastContact: '2024-04-07',
      avatar: 'A'
    },
    {
      id: 5,
      name: 'Aisha Al-Hassan',
      email: 'aisha.hassan@example.com',
      source: 'Website',
      status: 'New',
      assignedTo: 'Abdullah Al-Rashid',
      lastContact: '2024-04-06',
      avatar: 'A'
    },
    {
      id: 6,
      name: 'Omar Al-Mutairi',
      email: 'omar.mutairi@example.com',
      source: 'Social Media',
      status: 'Opportunities',
      assignedTo: 'Aisha Al-Hassan',
      lastContact: '2024-04-05',
      avatar: 'O'
    },
    {
      id: 7,
      name: 'Fatima Al-Rashid',
      email: 'fatima.rashid@example.com',
      source: 'Referral',
      status: 'Interview Schedule',
      assignedTo: 'Omar Al-Mutairi',
      lastContact: '2024-04-04',
      avatar: 'F'
    },
    {
      id: 8,
      name: 'Hassan Al-Otaibi',
      email: 'hassan.otaibi@example.com',
      source: 'Events',
      status: 'Approved',
      assignedTo: 'Fatima Al-Rashid',
      lastContact: '2024-04-03',
      avatar: 'H'
    }
  ];

  filteredLeads: Lead[] = [...this.leads];

  get totalPages(): number {
    return Math.ceil(this.filteredLeads.length / this.pageSize);
  }

  get Math() {
    return Math;
  }

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

  filterLeads() {
    this.filteredLeads = this.leads.filter(lead => {
      const matchesSearch = !this.searchTerm || 
        lead.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.selectedStatus || lead.status === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
    this.currentPage = 1;
  }

  selectAll(event: any) {
    if (event.target.checked) {
      this.selectedLeads = this.filteredLeads.map(lead => lead.id);
    } else {
      this.selectedLeads = [];
    }
  }

  toggleLeadSelection(leadId: number) {
    const index = this.selectedLeads.indexOf(leadId);
    if (index > -1) {
      this.selectedLeads.splice(index, 1);
    } else {
      this.selectedLeads.push(leadId);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  addLead() {
    alert('Add Lead functionality will be implemented here!');
  }

  importLeads() {
    alert('Import Leads functionality will be implemented here!');
  }

  exportLeads() {
    alert('Export Leads functionality will be implemented here!');
  }

  emailLead(lead: Lead) {
    alert(`Email ${lead.name} functionality will be implemented here!`);
  }

  messageLead(lead: Lead) {
    alert(`Message ${lead.name} functionality will be implemented here!`);
  }

  viewLead(lead: Lead) {
    alert(`View ${lead.name} details functionality will be implemented here!`);
  }

  editLead(lead: Lead) {
    alert(`Edit ${lead.name} functionality will be implemented here!`);
  }

  deleteLead(lead: Lead) {
    alert(`Delete ${lead.name} functionality will be implemented here!`);
  }
} 