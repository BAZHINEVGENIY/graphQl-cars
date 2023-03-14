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
      import('./pages/components/cars/cars.component').then(
        (cars) => cars.CarsComponent
      ),
  },
  {
    path: 'list/:id',
    loadComponent: () =>
      import('./pages/components/car/car.component').then(
        (car) => car.CarComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
