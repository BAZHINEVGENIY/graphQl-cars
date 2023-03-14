import { Injectable } from '@angular/core';
import { MyCarsAnswer } from '../../pages/types/api.interface';
import { CarInterface } from '../../pages/types/cars.interface';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable()
export class UniqValueService {
  private modelSet = new Set('');
  private chargeSet = new Set('');

  initializeData(data: Observable<MyCarsAnswer>) {
    return data.pipe(
      map((cars) => cars.data?.carList),
      filter((value) => !!value),
      tap((carList) => this.setASet(carList))
    );
  }

  private setASet(carList: CarInterface[]) {
    this.modelSet = new Set();
    this.chargeSet = new Set();

    carList?.forEach((car) => {
      this.modelSet.add(car.naming.model);
      // if (car.naming.version === 'no information') return;
      if (!car.naming.version) return;
      this.chargeSet.add(car.naming.version);
    });
  }

  get uniqModel() {
    return this.modelSet;
  }

  get uniqCharge() {
    return this.chargeSet;
  }
}
