import { Component, inject, input, output } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notification-modal',
  imports: [ButtonModule, RadioButtonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './notification-modal.html',
  styleUrl: './notification-modal.scss',
})
export class NotificationModal {
  private fb = inject(FormBuilder);

  visible = input.required<boolean>();
  notificationValue = output<'EMAIL' | 'SMS'>();

  form = this.fb.group({
    notificationType: ['EMAIL' as 'EMAIL' | 'SMS', Validators.required]
  });

  onConfirm() {
    this.notificationValue.emit(this.form.value.notificationType!);
    this.form.reset({
      notificationType: 'EMAIL',
    });
  }
}
