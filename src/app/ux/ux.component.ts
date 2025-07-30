import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ux',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="module-main">
      <h2>User Experience & Collaboration Module</h2>
      <p>Collaboration tools, UX.</p>
      <div class="module-graph">
        <svg width="200" height="60"><polyline points="0,20 40,40 80,30 120,50 160,30 200,10" style="fill:none;stroke:#e84393;stroke-width:3" /></svg>
      </div>
      <div class="module-data">Users: 120, Teams: 8</div>
    </main>
  `,
  styles: [`
    .module-main { padding: 2rem; }
    .module-graph { margin: 1rem 0; }
    .module-data { color: #e84393; font-weight: 500; }
  `]
})
export class UxComponent {} 