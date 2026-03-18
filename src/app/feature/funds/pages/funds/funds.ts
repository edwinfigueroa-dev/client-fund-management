import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FundService } from '@app/feature/funds/data-access/fund.service';
import { Fund } from '@app/feature/funds/models/fund.model';
import { FundCard } from '@app/feature/funds/ui/fund-card/fund-card';
import { MessageService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-fund',
  imports: [CommonModule, FundCard, TabsModule, ToastModule],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
  encapsulation: ViewEncapsulation.None
})
export class Funds {
  private fundService = inject(FundService);
  private messageService = inject(MessageService);

  availableFunds = this.fundService.availableFunds;
  subscribedFunds = this.fundService.subscribedFunds;

  activeTab = signal<'available' | 'subscribed'>('available');

  onSubscribe(fund: Fund) {
    try {
      this.fundService.subscribe(fund, 'EMAIL');
      this.messageService.add({
        severity: 'success',
        summary: 'Suscripción exitosa',
        detail: `Te suscribiste a ${fund.name}`
      });

    } catch (e: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: e.message
      });
    }
  }

  onUnsubscribe(fund: Fund) {
    try {
      this.fundService.unsubscribe(fund, 'EMAIL');
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelado',
        detail: `Cancelaste ${fund.name}`
      });

    } catch (e: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: e.message
      });
    }
  }
}
