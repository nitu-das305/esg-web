import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-integrations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="module-main">
      <h2>Integrations & Data Sources Module</h2>
      <p>Connect to external data sources.</p>
      <div class="module-graph">
        <svg width="200" height="60"><polyline points="0,20 40,30 80,50 120,40 160,10 200,30" style="fill:none;stroke:#4bc0c0;stroke-width:3" /></svg>
      </div>
      <div class="module-data">APIs: 6, Sources: 10</div>
    </main>
  `,
  styles: [`
    .module-main { padding: 2rem; }
    .module-graph { margin: 1rem 0; }
    .module-data { color: #4bc0c0; font-weight: 500; }
  `]
})
export class IntegrationsComponent {} 