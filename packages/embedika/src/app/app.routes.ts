import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/cars/cars.component').then((cars) => cars.CarsComponent),
  },
  {
    path: 'list/:id',
    loadComponent: () =>
      import('./pages/car/car.component').then((car) => car.CarComponent),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
