import { Injectable, signal } from '@angular/core';
import { Transaction } from '@app/feature/transactions/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _transactions = signal<Transaction[]>([]);
  transactions = this._transactions.asReadonly();

  addTransaction(transaction: Transaction) {
    this._transactions.update(v => [...v, transaction]);
  }

  getTransactions(): Transaction[] {
    return this._transactions();
  }
}