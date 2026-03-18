import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FundService } from '@app/feature/funds/data-access/fund.service';
import { Fund } from '@app/feature/funds/models/fund.model';
import { FundCard } from '@app/feature/funds/ui/fund-card/fund-card';


@Component({
  selector: 'app-fund',
  imports: [CommonModule, FundCard],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
})
export class Funds {
  private fundService = inject(FundService);

  // 🔥 Signals desde el servicio
  availableFunds = this.fundService.availableFunds;
  subscribedFunds = this.fundService.subscribedFunds;

  // 🧠 UI State
  activeTab = signal<'available' | 'subscribed'>('available');

  // ⚙️ Acciones
  onSubscribe(fund: Fund) {
    this.fundService.subscribe(fund, 'EMAIL');
  }

  onUnsubscribe(fund: Fund) {
    this.fundService.unsubscribe(fund, 'EMAIL');
  }
}
