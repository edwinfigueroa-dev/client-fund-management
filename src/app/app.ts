import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@app/shared/ui/header/header';
import { Sidebar } from '@app/shared/ui/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isCollapsedSignal = signal<boolean>(false);
  isHoveredSignal = signal<boolean>(false);
}
