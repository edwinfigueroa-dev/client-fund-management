import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '@app/core/services/wallet.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private walletService = inject(WalletService)

  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();
  balance = this.walletService.balance;

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }
}
