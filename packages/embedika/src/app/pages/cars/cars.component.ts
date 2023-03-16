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

  // не самая лучшая практика (шарить observ), в данном случае допустимо
  public data$!: Observable<MyAnswer<CarsListInterface>>;
  public numPage = 0;

  @ViewChild(FilterComponent, { static: true })
  filterComponent!: FilterComponent; // не самая лучшая практика, в данном случае упрощено

  ngOnInit() {
    this.data$ = this.api.request<CarsListInterface>(cars);
    this.numPage = +this.storage.get('numPage');
  }

  incrementPage() {
    this.api.changeVariables({ page: ++this.numPage });
    this.startChooseUniqValue();
  }

  decrementPage() {
    this.api.changeVariables({ page: --this.numPage });
    this.startChooseUniqValue();
  }

  private startChooseUniqValue() {
    this.storage.set('numPage', this.numPage);
    this.filterComponent.isUniqModel = true;
    this.filterComponent.isUniqCharge = true;
  }
}
