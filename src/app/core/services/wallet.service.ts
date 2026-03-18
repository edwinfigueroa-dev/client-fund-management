import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private _balance = signal<number>(500000);
  balance = this._balance.asReadonly();

  getBalance(): number {
    return this._balance();
  }

  hasEnough(amount: number): boolean {
    return this._balance() >= amount;
  }

  add(amount: number): void {
    this._balance.update(balance => balance + amount);
  }

  subtract(amount: number): void {
    this._balance.update(balance => balance - amount);
  }

}