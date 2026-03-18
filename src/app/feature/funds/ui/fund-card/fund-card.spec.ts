import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundCard } from './fund-card';

describe('FundCard', () => {
  let component: FundCard;
  let fixture: ComponentFixture<FundCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
