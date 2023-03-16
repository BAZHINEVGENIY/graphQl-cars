import { Injectable } from '@angular/core';
import {
  CarInterface,
  CarsListInterface,
} from '../../pages/types/cars.interface';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { MyAnswer } from '../../pages/types/api.interface';

@Injectable({ providedIn: 'root' })
export class UniqValueService {
  private modelSet = new Set('');
  private chargeSet = new Set('');

  uniqValue(data: Observable<MyAnswer<CarsListInterface>>) {
    return data.pipe(
      map((cars) => cars.data?.carList),
      filter((value) => !!value),
      tap((carList) => this.setValuesSets(carList)),
      switchMap(() => of([this.modelSet, this.chargeSet]))
    );
  }

  private setValuesSets(carList: CarInterface[]) {
    this.modelSet = new Set();
    this.chargeSet = new Set();

    carList?.forEach((car) => {
      if (car.naming.model) this.modelSet.add(car.naming.model);
      if (car.naming.version) this.chargeSet.add(car.naming.version);
    });
  }
}
