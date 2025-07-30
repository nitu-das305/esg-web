import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-iot-sensor-gauge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="width:100%;height:180px;position:relative;">
      <svg [attr.width]="'100%'" height="180" viewBox="0 0 400 180" (mousemove)="onMouseMove($event)" (mouseleave)="hoverIndex=null">
        <g>
          <polyline [attr.points]="getLine(sensorValues)" fill="none" [attr.stroke]="darkMode ? '#7eaaff' : '#4a6cff'" stroke-width="2.5" />
          <g *ngIf="hoverIndex !== null">
            <circle [attr.cx]="40+hoverIndex!*50" [attr.cy]="170-(sensorValues[hoverIndex!]/100)*140" r="6" fill="#4a6cff" stroke="#fff" stroke-width="2" />
            <rect [attr.x]="40+hoverIndex!*50-40" [attr.y]="20" width="80" height="38" rx="8" fill="#fff" stroke="#e0e7ff" stroke-width="2" />
            <text [attr.x]="40+hoverIndex!*50-30" y="40" font-size="13" fill="#23284a">{{times[hoverIndex!]}}</text>
            <text [attr.x]="40+hoverIndex!*50-30" y="58" font-size="13" fill="#4a6cff">Value: {{sensorValues[hoverIndex!]}}</text>
          </g>
        </g>
        <g>
          <text *ngFor="let t of times; let i = index" [attr.x]="40+i*50" y="170" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">{{t}}</text>
        </g>
        <g>
          <text x="5" y="30" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">Value</text>
          <text x="5" y="60" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">100</text>
          <text x="5" y="110" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">50</text>
          <text x="5" y="160" font-size="12" [attr.fill]="darkMode ? '#bfc8e6' : '#23284a'">0</text>
        </g>
      </svg>
      <div style="position:absolute;top:8px;right:12px;font-size:12px;">
        <span class="iot-badge">IoT</span>
      </div>
      <div style="position:absolute;bottom:24px;right:12px;font-size:11px;color:#888;">Last updated: {{lastUpdated}}</div>
      <div style="position:absolute;bottom:4px;right:12px;font-size:11px;color:#888;">Data powered by IoT</div>
      <div style="display:flex;gap:1em;position:absolute;bottom:4px;left:12px;font-size:12px;">
        <span style="color:#4a6cff">● Sensor Value</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .iot-badge { background: linear-gradient(90deg,#43d67c,#7b61ff); color: #fff; font-weight: 600; border-radius: 6px; padding: 0.1em 0.7em; margin-left: 0.4em; letter-spacing: 0.5px; vertical-align: middle; font-size: 12px; }
  `]
})
export class IotSensorGaugeComponent implements OnInit, OnDestroy {
  @Input() darkMode = false;
  times = ['10:00','10:10','10:20','10:30','10:40','10:50','11:00','11:10'];
  sensorValues = [68, 70, 72, 75, 73, 74, 76, 78];
  hoverIndex: number|null = null;
  lastUpdated = new Date().toLocaleString();
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.lastUpdated = new Date().toLocaleString();
      // Simulate live data update
      this.sensorValues = this.sensorValues.map(v => v + (Math.random()-0.5)*2).map(v => Math.round(v));
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
    if (idx >= 0 && idx < this.times.length) this.hoverIndex = idx; else this.hoverIndex = null;
  }
} 