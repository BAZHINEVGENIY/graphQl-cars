import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../core/services/api.service';
import { gql } from 'apollo-angular';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { gqlRequest, MyAnswer } from '../types/api.interface';
import { Observable } from 'rxjs';
import { CarCardComponent } from './cars-card/car-card.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { CarsListInterface } from '../types/cars.interface';
import { StorageService } from '../../core/services/storage.service';

//запрос на получение списка автомобилей:
const cars: gqlRequest<CarsListInterface> = gql`
  query GetCars($query: CarListQuery, $size: Int, $page: Int, $search: String) {
    carList(query: $query, size: $size, page: $page, search: $search) {
      id
      naming {
        make
        model
        version
      }
      media {
        image {
          thumbnail_url
        }
      }
    }
  }
`;

@Component({
  selector: 'app-fruits',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    CarCardComponent,
    FilterComponent,
  ],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly storage = inject(StorageService);

  public data$!: Observable<MyAnswer<CarsListInterface>>;
  public numPage = 0;

  @ViewChild(FilterComponent, { static: true })
  filterComponent!: FilterComponent;

  ngOnInit() {
    this.numPage = +this.storage.get('numPage');
    this.data$ = this.api.request<CarsListInterface>(cars);
  }

  changePage(page: number) {
    this.storage.set('numPage', (this.numPage = page));
    this.api.changeVariables({ page });

    this.filterComponent.isUniqValue();
  }

  // generate() {
  //   let str = 'query GetCars{';
  //   const arr = ['bmw', 'audi'];
  //   arr.forEach((item, i) => {
  //     str += `make${i}: carList(query: {make: "${item}"}) {
  //     id
  //     naming {
  //       make
  //       model
  //       version
  //     }
  //     media {
  //       image {
  //         thumbnail_url
  //       }
  //     }
  //   }`;
  //   });
  //   str += '}';
  //   return str;
  // }
}
