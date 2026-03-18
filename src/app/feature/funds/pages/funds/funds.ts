import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FundService } from '@app/feature/funds/data-access/fund.service';
import { Fund } from '@app/feature/funds/models/fund.model';
import { FundCard } from '@app/feature/funds/ui/fund-card/fund-card';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabsModule } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-fund',
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    FundCard,
    RadioButtonModule,
    ReactiveFormsModule,
    TabsModule,
    ToastModule,
  ],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
  encapsulation: ViewEncapsulation.None
})
export class Funds {
  private fb = inject(FormBuilder);
  private fundService = inject(FundService);
  private messageService = inject(MessageService);

  form = this.fb.group({
    notificationType: ['EMAIL' as 'EMAIL' | 'SMS', Validators.required]
  });

  availableFunds = this.fundService.availableFunds;
  subscribedFunds = this.fundService.subscribedFunds;

  activeTab = signal<'available' | 'subscribed'>('available');

  visible: boolean = false;
  currentFund = signal<Fund | null>(null);

  showDialog(fund: Fund) {
    this.visible = true;
    this.currentFund.set(fund);
  }

  clear() {
    this.form.reset({
      notificationType: 'EMAIL'
    });
    this.currentFund.set(null);
    this.visible = false;
  }

  onSubscribe() {
    try {
      this.fundService.subscribe(this.currentFund()!, this.form.value.notificationType!);
      this.messageService.add({
        severity: 'success',
        summary: 'Suscripción exitosa',
        detail: `Te suscribiste a ${this.currentFund()!.name}`
      });
      this.clear();

    } catch (e: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: e.message
      });
    }
  }

  onUnsubscribe(fund: Fund) {
    try {
      this.fundService.unsubscribe(fund);
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelado',
        detail: `Cancelaste ${fund.name}`
      });

    } catch (e: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: e.message
      });
    }
  }
}
