import { Routes } from '@angular/router';

export const routes: Routes = [
  {
        path: '',
        loadComponent: () => import("./pages/funds/funds").then(c => c.Funds),
    },
    {
        path: '**',
        redirectTo: '',
    },
];