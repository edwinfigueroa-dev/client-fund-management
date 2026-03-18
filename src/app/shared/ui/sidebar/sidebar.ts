import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '(document:resize)': 'ensureMobileCollapsed()'
  }
})
export class Sidebar {
  private _router = inject(Router);

  toggleStates: { [key: number]: boolean } = {};
  isCollapsed = input<boolean>(false);
  isHovered = input<boolean>(false);

  eventChangeStatusSidebar = output<boolean>();
  eventChangeStatusHoverSidebar = output<boolean>();

  menuItems: MenuItem[] = [
    {
      key: 'funds',
      label: 'Fondos',
      icon: 'icons/fund.svg',
      route: '/funds'
    },
    {
      key: 'transactions',
      label: 'Historial',
      icon: 'icons/transaction.svg',
      route: '/transactions'
    },
  ];

  ngOnInit() {
    this.showOptionCurrentMenu();
    this.ensureMobileCollapsed();
  }

  showOptionCurrentMenu() {
    this.menuItems.forEach((item, index) => {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          if (child.route === this._router.url) this.toggleStates[index] = true;
        });
      }

      if (item.route === this._router.url) this.toggleStates[index] = true;
    });
  }

  toggleSubmenu(index: number) {
    this.toggleStates[index] = !this.toggleStates[index];
  }

  toggleSidebar() {
    this.eventChangeStatusSidebar.emit(!this.isCollapsed());
  }

  onMouseEnter() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(true);
  }

  onMouseLeave() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(false);
  }

  onItemClicked() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) {
      this.eventChangeStatusSidebar.emit(true);
      this.eventChangeStatusHoverSidebar.emit(false);
    }
  }

  ensureMobileCollapsed() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile && !this.isCollapsed()) {
      this.eventChangeStatusSidebar.emit(true);
      this.eventChangeStatusHoverSidebar.emit(false);
    }
  }
}
