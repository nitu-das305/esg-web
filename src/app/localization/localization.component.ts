import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-localization',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="module-main">
      <h2>Localization & Globalization Module</h2>
      <p>Multi-language, region support.</p>
      <div class="module-graph">
        <svg width="200" height="60"><polyline points="0,30 40,20 80,40 120,10 160,50 200,30" style="fill:none;stroke:#c9cbcf;stroke-width:3" /></svg>
      </div>
      <div class="module-data">Languages: 5, Regions: 4</div>
    </main>
  `,
  styles: [`
    .module-main { padding: 2rem; }
    .module-graph { margin: 1rem 0; }
    .module-data { color: #c9cbcf; font-weight: 500; }
  `]
})
export class LocalizationComponent {} 