import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../../core/services/api.service';
import { gql } from 'apollo-angular';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { gqlRequest, MyCarsAnswer } from '../../types/api.interface';
import { Observable } from 'rxjs';
import { CarCardComponent } from './cars-card/car-card.component';
import { FilterComponent } from '../filter/filter.component';

//запрос на получение списка автомобилей:
/*todo
   пусть здесь полежит? вроде удобно :)
*/
const cars: gqlRequest = gql`
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
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CarCardComponent,
    MatButtonModule,
    FilterComponent,
  ],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsComponent implements OnInit {
  private readonly api = inject(ApiService);

  @ViewChild(FilterComponent, { static: true })
  filterComponent!: FilterComponent;

  data$!: Observable<MyCarsAnswer>;
  searchCarFromName?: string;
  numPage = 0;

  ngOnInit() {
    /*todo
           уточню, что я записываю data$ лишь один раз + только 1 async подписка в текущем шаблоне
           далее шарю data$ между компонентами и сервисами
           так вроде более круто, чем реализовать API через сабжекты :)
           хотя, конечно, использую share()...
        */
    /*todo дженерики.........*/
    this.data$ = this.api.request(cars) as Observable<MyCarsAnswer>;
  }

  /*todo
       возможно можно как то проще записать increment/decrement Fn's?
    */
  incrementPage() {
    this.api.changeVariables({ page: ++this.numPage });
    this.updateUniqValue();
  }

  decrementPage() {
    this.api.changeVariables({ page: --this.numPage });
    this.updateUniqValue();
  }

  /*todo
       когда меняем страницу вновь запускаем получение уникальных значений для фильтров
    */
  private updateUniqValue() {
    this.filterComponent.stopUniqValue$.next('');
    this.filterComponent.startUniqValue();
  }
}
