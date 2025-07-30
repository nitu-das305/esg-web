import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-energy-consumption-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ec-card">
      <div class="ec-title">Energy Consumption Analytics <span class="iot-badge">IoT</span></div>
      
      <!-- Summary Statistics Row -->
      <div class="ec-stats-row">
        <div class="ec-stat-card total">
          <div class="ec-stat-icon">⚡</div>
          <div class="ec-stat-value">{{totalEnergy}} MWh</div>
          <div class="ec-stat-label">Total Energy</div>
          <div class="ec-stat-desc">This month's consumption</div>
        </div>
        <div class="ec-stat-card renewable">
          <div class="ec-stat-icon">🌱</div>
          <div class="ec-stat-value">{{renewablePercent}}%</div>
          <div class="ec-stat-label">Renewable</div>
          <div class="ec-stat-desc">Clean energy usage</div>
        </div>
        <div class="ec-stat-card efficiency">
          <div class="ec-stat-icon">📊</div>
          <div class="ec-stat-value">{{efficiencyScore}}%</div>
          <div class="ec-stat-label">Efficiency</div>
          <div class="ec-stat-desc">Energy optimization</div>
        </div>
      </div>

      <!-- Interactive Bar Chart -->
      <div class="ec-chart-wrap">
        <svg width="100%" height="180" viewBox="0 0 400 180" (mousemove)="onMouseMove($event)" (mouseleave)="hoverIndex=null">
          <!-- Grid lines -->
          <line x1="40" y1="30" x2="360" y2="30" stroke="#e0e7ff" stroke-width="1" />
          <line x1="40" y1="80" x2="360" y2="80" stroke="#e0e7ff" stroke-width="1" />
          <line x1="40" y1="130" x2="360" y2="130" stroke="#e0e7ff" stroke-width="1" />
          
          <!-- Bars -->
          <g *ngFor="let m of months; let i = index">
            <!-- Renewable bars -->
            <rect [attr.x]="40+i*40" [attr.y]="170-renewable[i]" width="16" [attr.height]="renewable[i]" 
                  fill="#2ecc71" rx="3" opacity="0.8" />
            <!-- Non-renewable bars -->
            <rect [attr.x]="58+i*40" [attr.y]="170-nonRenewable[i]" width="16" [attr.height]="nonRenewable[i]" 
                  fill="#4a6cff" rx="3" opacity="0.8" />
          </g>
          
          <!-- Tooltip -->
          <g *ngIf="hoverIndex !== null">
            <rect [attr.x]="40+hoverIndex*40-25" [attr.y]="getTooltipY()-50" width="110" height="60" rx="8" 
                  fill="#fff" stroke="#e0e7ff" stroke-width="2" />
            <text [attr.x]="40+hoverIndex*40-20" [attr.y]="getTooltipY()-30" font-size="13" fill="#23284a">{{months[hoverIndex]}}</text>
            <text [attr.x]="40+hoverIndex*40-20" [attr.y]="getTooltipY()-15" font-size="13" fill="#2ecc71">Renewable: {{renewable[hoverIndex]}} MWh</text>
            <text [attr.x]="40+hoverIndex*40-20" [attr.y]="getTooltipY()" font-size="13" fill="#4a6cff">Non-Renewable: {{nonRenewable[hoverIndex]}} MWh</text>
            <text [attr.x]="40+hoverIndex*40-20" [attr.y]="getTooltipY()+15" font-size="13" fill="#23284a">Total: {{renewable[hoverIndex] + nonRenewable[hoverIndex]}} MWh</text>
          </g>
          
          <!-- X axis labels -->
          <g>
            <text *ngFor="let m of months; let i = index" [attr.x]="44+i*40" y="175" font-size="12" fill="#23284a">{{m}}</text>
          </g>
          
          <!-- Y axis labels -->
          <g>
            <text x="5" y="30" font-size="12" fill="#23284a">MWh</text>
            <text x="5" y="60" font-size="12" fill="#23284a">120</text>
            <text x="5" y="110" font-size="12" fill="#23284a">60</text>
            <text x="5" y="160" font-size="12" fill="#23284a">0</text>
          </g>
        </svg>
        
        <!-- Chart Legend -->
        <div class="ec-legend-row">
          <span class="ec-legend" style="color:#2ecc71">■ Renewable</span>
          <span class="ec-legend" style="color:#4a6cff">■ Non-Renewable</span>
        </div>
      </div>

      <!-- Progress Indicators -->
      <div class="ec-progress-row">
        <div class="ec-progress-item">
          <div class="ec-progress-label">Energy Efficiency</div>
          <div class="ec-progress-bar-bg">
            <div class="ec-progress-bar efficiency" [style.width.%]="efficiencyScore"></div>
          </div>
          <span class="ec-progress-value">{{efficiencyScore}}%</span>
        </div>
        <div class="ec-progress-item">
          <div class="ec-progress-label">Renewable Mix</div>
          <div class="ec-progress-bar-bg">
            <div class="ec-progress-bar renewable" [style.width.%]="renewablePercent"></div>
          </div>
          <span class="ec-progress-value">{{renewablePercent}}%</span>
        </div>
      </div>

      <!-- AI/ML Insights -->
      <div class="ec-ai-insight">
        <i>🤖 AI: {{aiInsight}}</i>
      </div>
    </div>
  `,
  styles: [`
    .ec-card {
      background: #f8fafb;
      border-radius: 18px;
      box-shadow: 0 2px 16px #e0e7ff55;
      padding: 2rem 2rem 1.5rem 2rem;
      min-width: 0;
      min-height: 180px;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      margin: 0 auto;
      max-width: 900px;
    }
    .ec-title {
      font-size: 1.25em;
      font-weight: 600;
      margin-bottom: 1.1em;
    }
    .iot-badge {
      background: linear-gradient(90deg,#43d67c,#7b61ff);
      color: #fff;
      font-weight: 600;
      border-radius: 6px;
      padding: 0.1em 0.7em;
      margin-left: 0.4em;
      letter-spacing: 0.5px;
      vertical-align: middle;
      font-size: 12px;
    }
    .ec-stats-row {
      display: flex;
      gap: 1.5em;
      margin-bottom: 1.5em;
      flex-wrap: wrap;
    }
    .ec-stat-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 12px #e0e7ff44;
      padding: 1.1em 1.3em 1em 1.3em;
      min-width: 140px;
      flex: 1 1 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .ec-stat-card:hover {
      box-shadow: 0 6px 24px #4a6cff33;
      transform: translateY(-3px) scale(1.03);
    }
    .ec-stat-card.total { border-top: 4px solid #4a6cff; }
    .ec-stat-card.renewable { border-top: 4px solid #2ecc71; }
    .ec-stat-card.efficiency { border-top: 4px solid #fdba74; }
    .ec-stat-icon {
      font-size: 2.2em;
      margin-bottom: 0.3em;
      margin-top: 0.1em;
    }
    .ec-stat-value {
      font-size: 1.35em;
      font-weight: 700;
      margin-bottom: 0.2em;
      color: #23284a;
    }
    .ec-stat-label {
      font-size: 1.08em;
      font-weight: 600;
      margin-bottom: 0.2em;
      letter-spacing: 0.2px;
    }
    .ec-stat-desc {
      font-size: 0.98em;
      color: #7a8a99;
      margin-bottom: 0.1em;
    }
    .ec-chart-wrap {
      width: 100%;
      margin-bottom: 1.5em;
    }
    .ec-legend-row {
      display: flex;
      gap: 1em;
      margin-top: 0.5em;
      font-size: 14px;
    }
    .ec-legend {
      font-weight: 600;
    }
    .ec-progress-row {
      display: flex;
      gap: 2em;
      margin-bottom: 1.1em;
      flex-wrap: wrap;
    }
    .ec-progress-item {
      flex: 1;
      min-width: 200px;
    }
    .ec-progress-label {
      font-size: 0.95em;
      font-weight: 600;
      margin-bottom: 0.5em;
      color: #23284a;
    }
    .ec-progress-bar-bg {
      background: #e6f7fa;
      border-radius: 8px;
      height: 22px;
      overflow: hidden;
      margin-bottom: 0.5em;
    }
    .ec-progress-bar {
      height: 100%;
      border-radius: 8px;
      transition: width 0.7s cubic-bezier(.4,1.4,.6,1);
    }
    .ec-progress-bar.efficiency {
      background: linear-gradient(90deg, #fdba74, #f59e0b);
    }
    .ec-progress-bar.renewable {
      background: linear-gradient(90deg, #2ecc71, #27ae60);
    }
    .ec-progress-value {
      font-size: 1em;
      font-weight: 600;
      color: #23284a;
    }
    .ec-ai-insight {
      margin-top: 0.7em;
      font-size: 1em;
      color: #7a8a99;
    }
    @media (max-width: 900px) {
      .ec-stats-row { gap: 0.7em; }
      .ec-stat-card { min-width: 120px; padding: 0.7em 0.5em 0.7em 0.5em; }
      .ec-progress-row { gap: 1em; }
    }
    @media (max-width: 600px) {
      .ec-card { padding: 1.1rem 0.5rem 1rem 0.5rem; }
      .ec-stats-row { flex-direction: column; gap: 1em; }
      .ec-stat-card { min-width: 0; }
      .ec-title { font-size: 1.08em; }
    }
  `]
})
export class EnergyConsumptionBarChartComponent implements OnInit {
  @Input() darkMode = false;
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
  renewable = [60, 70, 65, 80, 75, 85, 90, 88];
  nonRenewable = [40, 50, 45, 55, 60, 58, 65, 62];
  hoverIndex: number|null = null;

  get totalEnergy(): number {
    const latestRenewable = this.renewable[this.renewable.length - 1];
    const latestNonRenewable = this.nonRenewable[this.nonRenewable.length - 1];
    return latestRenewable + latestNonRenewable;
  }

  get renewablePercent(): number {
    const latestRenewable = this.renewable[this.renewable.length - 1];
    const latestNonRenewable = this.nonRenewable[this.nonRenewable.length - 1];
    return Math.round((latestRenewable / (latestRenewable + latestNonRenewable)) * 100);
  }

  get efficiencyScore(): number {
    // Calculate efficiency based on renewable percentage and trend
    const baseEfficiency = this.renewablePercent;
    const trendBonus = this.renewable[this.renewable.length - 1] > this.renewable[0] ? 10 : 0;
    return Math.min(95, baseEfficiency + trendBonus);
  }

  get aiInsight(): string {
    const latestRenewable = this.renewable[this.renewable.length - 1];
    const latestNonRenewable = this.nonRenewable[this.nonRenewable.length - 1];
    const total = latestRenewable + latestNonRenewable;
    
    if (this.renewablePercent > 70) {
      return `Excellent renewable energy mix at ${this.renewablePercent}%. Consider expanding solar capacity.`;
    } else if (this.renewablePercent > 50) {
      return `Good progress on renewable energy. Focus on reducing peak demand periods.`;
    } else {
      return `Renewable energy at ${this.renewablePercent}%. Prioritize clean energy investments.`;
    }
  }

  getTooltipY(): number {
    if (this.hoverIndex === null) return 0;
    const total = this.renewable[this.hoverIndex] + this.nonRenewable[this.hoverIndex];
    return 170 - total - 60;
  }

  onMouseMove(event: MouseEvent) {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const idx = Math.round((x-40)/40);
    if (idx >= 0 && idx < this.months.length) {
      this.hoverIndex = idx;
    } else {
      this.hoverIndex = null;
    }
  }

  ngOnInit() {}
} 