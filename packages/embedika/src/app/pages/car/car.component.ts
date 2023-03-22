import { ChangeDetectionStrategy, Component, inject, OnInit, } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { gqlRequest, MyAnswer } from '../types/api.interface';
import { gql } from 'apollo-angular';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { CarListInterface } from '../types/cars.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

//запрос на получение автомобиля:
const car: gqlRequest<CarListInterface> = gql`
  query GetCar($id: ID!) {
    car(id: $id) {
      id
      naming {
        make
        model
        chargetrip_version
      }
      acceleration
      range {
        best {
          highway
          city
          combined
        }
      }
      connectors {
        standard
        power
        time
        speed
        max_electric_power
      }
    }
  }
`;

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    RouterLink,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarComponent implements OnInit {
  private readonly activatedRouter = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  data$!: Observable<MyAnswer<CarListInterface>>;

  ngOnInit() {
    const id = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.data$ = this.api.request<CarListInterface>(car, { id });
  }

  public goBack() {
    history.back();
  }
}
