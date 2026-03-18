import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Fund } from '@app/feature/funds/models/fund.model';

@Component({
  selector: 'app-fund-card',
  imports: [CommonModule],
  templateUrl: './fund-card.html',
  styleUrl: './fund-card.scss',
})
export class FundCard {
  fund = input.required<Fund>();
  mode = input<'available' | 'subscribed'>('available');

  subscribeEvent = output<Fund>();
  unsubscribeEvent = output<Fund>();

  onSubscribe() {
    this.subscribeEvent.emit(this.fund());
  }

  onUnsubscribe() {
    this.unsubscribeEvent.emit(this.fund());
  }
}
