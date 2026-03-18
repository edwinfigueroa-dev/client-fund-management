import { inject, Injectable, signal } from '@angular/core';
import { Fund } from '@app/feature/funds/models/fund.model';
import { TransactionService } from '@app/feature/transactions/data-access/transaction.service';
import { WalletService } from '@app/core/services/wallet.service';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private transactionService = inject(TransactionService);
  private walletService = inject(WalletService);

  private _funds = signal<Fund[]>([
    { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75000, category: 'FPV' },
    { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minAmount: 125000, category: 'FPV' },
    { id: 3, name: 'DEUDAPRIVADA', minAmount: 50000, category: 'FIC' },
    { id: 4, name: 'FDO-ACCIONES', minAmount: 250000, category: 'FIC' },
    { id: 5, name: 'FPV_BTG_PACTUAL_DINAMICA', minAmount: 100000, category: 'FPV' }
  ]);
  funds = this._funds.asReadonly();

  getFunds(): Fund[] {
    return this._funds();
  }

  subscribe(fund: Fund, notification: 'EMAIL' | 'SMS') {
    if (!this.walletService.hasEnough(fund.minAmount)) {
      throw new Error('Saldo insuficiente');
    }

    this.walletService.subtract(fund.minAmount);

    this.transactionService.addTransaction({
      id: Date.now(),
      fundId: fund.id,
      fundName: fund.name,
      type: 'SUBSCRIBE',
      amount: fund.minAmount,
      date: new Date(),
      notification
    });
  }

  cancel(fund: Fund, notification: 'EMAIL' | 'SMS') {
    this.walletService.add(fund.minAmount);

    this.transactionService.addTransaction({
      id: Date.now(),
      fundId: fund.id,
      fundName: fund.name,
      type: 'CANCEL',
      amount: fund.minAmount,
      date: new Date(),
      notification
    });
  }
}