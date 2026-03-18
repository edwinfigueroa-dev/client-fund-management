import { TestBed } from '@angular/core/testing';
import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial balance', () => {
    expect(service.getBalance()).toBe(500_000);
    expect(service.balance()).toBe(500_000);
  });

  it('should correctly report hasEnough()', () => {
    expect(service.hasEnough(100_000)).toBeTruthy();
    expect(service.hasEnough(600_000)).toBeFalsy();
  });

  it('should increase the balance', () => {
    service.increase(50_000);
    expect(service.getBalance()).toBe(550_000);
  });

  it('should decrease the balance', () => {
    service.decrease(200_000);
    expect(service.getBalance()).toBe(300_000);
  });

});
