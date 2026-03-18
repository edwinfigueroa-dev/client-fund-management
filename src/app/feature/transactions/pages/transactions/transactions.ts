import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TransactionService } from '@app/feature/transactions/data-access/transaction.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, TableModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions {
  private transactionService = inject(TransactionService);
  transactions = computed(() => [...this.transactionService.transactions()].reverse());
}
