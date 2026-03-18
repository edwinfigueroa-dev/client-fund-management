import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WalletService } from '@app/core/services/wallet.service';
import { FundService } from '@app/feature/funds/data-access/fund.service';
import { Fund } from '@app/feature/funds/models/fund.model';


@Component({
  selector: 'app-fund',
  imports: [CommonModule],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
})
export class Funds {
  private fundService = inject(FundService);
  private walletService = inject(WalletService);

  funds = this.fundService.funds;
  balance = this.walletService.balance;

  onSubscribe(fund: Fund) {
    try {
      this.fundService.subscribe(fund, 'EMAIL');
      alert('Suscripción exitosa');
    } catch (error: any) {
      alert(error.message);
    }
  }
}
