import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from '@app/feature/transactions/models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;

  const dummyTx: Transaction = {
    id: 1,
    fundId: 99,
    fundName: 'MOCK_FUND',
    type: 'SUBSCRIBE',
    amount: 100_000,
    date: new Date('2024-01-01T00:00:00Z'),
    notification: 'EMAIL'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty list', () => {
    expect(service.transactions()).toEqual([]);
  });

  it('add() should prepend a transaction', () => {
    service.add(dummyTx);
    expect(service.transactions().length).toBe(1);
    expect(service.transactions()[0]).toEqual(dummyTx);
  });
});
