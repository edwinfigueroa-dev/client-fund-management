import { Injectable, signal, computed, inject } from '@angular/core';
import { Fund } from '@app/feature/funds/models/fund.model';
import { TransactionService } from '@app/feature/transactions/data-access/transaction.service';
import { WalletService } from '@app/core/services/wallet.service';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  private walletService = inject(WalletService);
  private transactionService = inject(TransactionService);

  private _funds = signal<Fund[]>([
    { id: 1,name: 'FPV_BTG_PACTUAL_RECAUDADORA',minAmount: 75000,category: 'FPV' },
    { id: 2,name: 'FPV_BTG_PACTUAL_ECOPETROL',minAmount: 125000,category: 'FPV' },
    { id: 3,name: 'DEUDAPRIVADA',minAmount: 50000,category: 'FIC' },
    { id: 4,name: 'FDO-ACCIONES',minAmount: 250000,category: 'FIC' },
    { id: 5,name: 'FPV_BTG_PACTUAL_DINAMICA',minAmount: 100000,category: 'FPV' },
  ]);
  private _subscribedFunds = signal<Fund[]>([]);

  funds = this._funds.asReadonly();
  subscribedFunds = this._subscribedFunds.asReadonly();

  availableFunds = computed(() => {
    const subscribedIds = this._subscribedFunds().map(f => f.id);
    return this._funds().filter(f => !subscribedIds.includes(f.id));
  });

  getSubscribedFunds(): Fund[] {
    return this._subscribedFunds();
  }

  subscribe(fund: Fund, notification: 'EMAIL' | 'SMS') {
    const balance = this.walletService.balance();
    if (balance < fund.minAmount) {
      throw new Error('No tiene saldo disponible para este fondo');
    }

    const alreadySubscribed = this._subscribedFunds().some(f => f.id === fund.id);
    if (alreadySubscribed) {
      throw new Error('Ya está suscrito a este fondo');
    }

    this.walletService.decrease(fund.minAmount);
    this._subscribedFunds.update(funds => [...funds, fund]);

    this.transactionService.add({
      id: Date.now(),
      fundId: fund.id,
      fundName: fund.name,
      type: 'SUBSCRIBE',
      amount: fund.minAmount,
      date: new Date(),
      notification,
    });
  }

  unsubscribe(fund: Fund, notification: 'EMAIL' | 'SMS') {
    const isSubscribed = this._subscribedFunds().some(f => f.id === fund.id);
    if (!isSubscribed) {
      throw new Error('No está suscrito a este fondo');
    }

    this.walletService.increase(fund.minAmount);
    this._subscribedFunds.update(funds => funds.filter(f => f.id !== fund.id));

    this.transactionService.add({
      id: Date.now(),
      fundId: fund.id,
      fundName: fund.name,
      type: 'CANCEL',
      amount: fund.minAmount,
      date: new Date(),
      notification,
    });
  }

}