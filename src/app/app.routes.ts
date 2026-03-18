import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'funds',
    loadChildren: () => import('./feature/funds/funds.routes').then(m => m.routes)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./feature/transactions/transactions.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: 'funds',
  },
];