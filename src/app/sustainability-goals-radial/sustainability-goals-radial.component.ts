import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sustainability-goals-radial',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:100%;height:180px;position:relative;">
      <svg [attr.width]="'100%'" height="180" viewBox="0 0 400 180" (mousemove)="onMouseMove($event)" (mouseleave)="hoverIndex=null">
        <g>
          <polyline [attr.points]="getLine(netZero)" fill="none" [attr.stroke]="darkMode ? '#43d67c' : '#2ecc71'" stroke-width="2.5" />
          <polyline [attr.points]="getLine(greenEnergy)" fill="none" [attr.stroke]="darkMode ? '#7eaaff' : '#4a6cff'" stroke-width="2.5" />
          <polyline [attr.points]="getLine(wasteReduction)" fill="none" [attr.stroke]="darkMode ? '#fdba74' : '#ffb347'" stroke-width="2.5" />
          <g *ngIf="hoverIndex !== null">
            <circle [attr.cx]="40+hoverIndex!*50" [attr.cy]="170-(netZero[hoverIndex!]/100)*140" r="6" fill="#2ecc71" stroke="#fff" stroke-width="2" />
            <circle [attr.cx]="40+hoverIndex!*50" [attr.cy]="170-(greenEnergy[hoverIndex!]/100)*140" r="6" fill="#4a6cff" stroke="#fff" stroke-width="2" />
            <circle [attr.cx]="40+hoverIndex!*50" [attr.cy]="170-(wasteReduction[hoverIndex!]/100)*140" r="6" fill="#ffb347" stroke="#fff" stroke-width="2" />
            <rect [attr.x]="40+hoverIndex!*50-40" [attr.y]="20" width="110" height="60" rx="8" fill="#fff" stroke="#e0e7ff" stroke-width="2" />
            <text [attr.x]="40+hoverIndex!*50-30" y="40" font-size="13" fill="#23284a">{{months[hoverIndex!]}}</text>
            <text [attr.x]="40+hoverIndex!*50-30" y="58" font-size="13" fill="#2ecc71">Net Zero: {{netZero[hoverIndex!]}}%</text>
            <text [attr.x]="40+hoverIndex!*50-30" y="74" font-size="13" fill="#4a6cff">Green Energy: {{greenEnergy[hoverIndex!]}}%</text>
            <text [attr.x]="40+hoverIndex!*50-30" y="90" font-size="13" fill="#ffb347">Waste Red.: {{wasteReduction[hoverIndex!]}}%</text>
          </g>
        </g>
        <g>
          <text *ngFor="let m of months; let i = index" [attr.x]="40+i*50" y="170" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">{{m}}</text>
        </g>
        <g>
          <text x="5" y="30" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">%</text>
          <text x="5" y="60" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">100</text>
          <text x="5" y="110" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">50</text>
          <text x="5" y="160" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">0</text>
        </g>
      </svg>
      <div style="position:absolute;top:8px;right:12px;font-size:12px;">
        <span class="ai-badge">AI/ML</span>
      </div>
      <div style="position:absolute;bottom:24px;right:12px;font-size:11px;color:#888;">Last updated: {{lastUpdated}}</div>
      <div style="position:absolute;bottom:4px;right:12px;font-size:11px;color:#888;">Data powered by AI/ML</div>
      <div style="display:flex;gap:1em;position:absolute;bottom:4px;left:12px;font-size:12px;">
        <span style="color:#2ecc71">● Net Zero</span>
        <span style="color:#4a6cff">● Green Energy</span>
        <span style="color:#ffb347">● Waste Reduction</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ai-badge { background: linear-gradient(90deg,#7b61ff,#43d67c); color: #fff; font-weight: 600; border-radius: 6px; padding: 0.1em 0.7em; margin-left: 0.4em; letter-spacing: 0.5px; vertical-align: middle; font-size: 12px; }
  `]
})
export class SustainabilityGoalsRadialComponent implements OnInit, OnDestroy {
  @Input() darkMode = false;
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
  netZero = [72, 74, 75, 76, 77, 78, 80, 82];
  greenEnergy = [55, 56, 57, 58, 59, 60, 62, 65];
  wasteReduction = [38, 39, 40, 41, 42, 43, 45, 47];
  hoverIndex: number|null = null;
  lastUpdated = new Date().toLocaleString();
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.lastUpdated = new Date().toLocaleString();
    }, 60000);
  }
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
  getLine(data: number[]): string {
    return data.map((v,i) => `${40+i*50},${170-(v/100)*140}`).join(' ');
  }
  onMouseMove(event: MouseEvent) {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const idx = Math.round((x-40)/50);
    if (idx >= 0 && idx < this.months.length) this.hoverIndex = idx; else this.hoverIndex = null;
  }
} 