import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Funds } from './funds';
import { FundService } from '@app/feature/funds/data-access/fund.service';
import { MessageService } from 'primeng/api';
import { Fund } from '@app/feature/funds/models/fund.model';
import { it, describe } from 'vitest';
import { expect } from 'vitest';

// ----- mocks ---------------------------------------------------------------
class MockFundService {
  availableFunds: Fund[] = [];
  subscribedFunds: Fund[] = [];

  subscribe = vi.fn();
  unsubscribe = vi.fn();
}

class MockMessageService {
  add = vi.fn();
}
// ---------------------------------------------------------------------------

describe('Funds', () => {
  let component: Funds;
  let fixture: ComponentFixture<Funds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Funds],
      providers: [
        { provide: FundService, useClass: MockFundService },
        { provide: MessageService, useClass: MockMessageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Funds);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});