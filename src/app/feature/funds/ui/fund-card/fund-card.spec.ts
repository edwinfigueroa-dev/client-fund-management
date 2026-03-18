import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundCard } from './fund-card';
import { Fund } from '@app/feature/funds/models/fund.model';
import { vi, describe, it, expect } from 'vitest';

describe('FundCard', () => {
  let component: FundCard;
  let fixture: ComponentFixture<FundCard>;

  const mockFund: Fund = {
    id: 1,
    name: 'Tech Fund',
    minAmount: 1000,
    category: 'FPV',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCard],
    }).compileComponents();

    // Creamos el componente sin pasar inputs (no existe esa opción)
    fixture = TestBed.createComponent(FundCard);
    component = fixture.componentInstance;

    // 👉 Establecemos los inputs mediante la API del fixture
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('mode', 'available');

    // Aplicamos los cambios y esperamos que Angular procese los inputs
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit subscribe event onSubscribe', () => {
    const spy = vi.spyOn(component.subscribeEvent, 'emit');
    component.onSubscribe();
    expect(spy).toHaveBeenCalledOnce();
  });

  it('should emit unsubscribe event onUnsubscribe', () => {
    const spy = vi.spyOn(component.unsubscribeEvent, 'emit');
    component.onUnsubscribe();
    expect(spy).toHaveBeenCalledOnce();
  });
});