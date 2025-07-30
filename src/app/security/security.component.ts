import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="module-main">
      <h2>Security & Data Governance Module</h2>
      <p>Data privacy, security controls.</p>
      <div class="module-graph">
        <svg width="200" height="60"><polyline points="0,50 40,30 80,40 120,20 160,10 200,30" style="fill:none;stroke:#2d2e83;stroke-width:3" /></svg>
      </div>
      <div class="module-data">Incidents: 0, Audits: 2</div>
    </main>
  `,
  styles: [`
    .module-main { padding: 2rem; }
    .module-graph { margin: 1rem 0; }
    .module-data { color: #2d2e83; font-weight: 500; }
  `]
})
export class SecurityComponent {} 