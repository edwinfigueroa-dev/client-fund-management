import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }
}
