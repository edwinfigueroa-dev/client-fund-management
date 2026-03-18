import { Routes } from '@angular/router';

export const routes: Routes = [
  {
        path: '',
        loadComponent: () => import("./pages/transactions/transactions").then(c => c.Transactions),
    },
    {
        path: '**',
        redirectTo: '',
    },
];