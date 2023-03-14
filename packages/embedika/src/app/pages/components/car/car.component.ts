import { ChangeDetectionStrategy, Component, inject, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { gqlRequest, MyCarAnswer } from '../../types/api.interface';
import { gql } from 'apollo-angular';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

//запрос на получение автомобиля:
const car: gqlRequest = gql`
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
  imports: [CommonModule],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarComponent implements OnInit {
  private readonly activatedRouter = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  data?: Observable<MyCarAnswer>;

  ngOnInit() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    /*todo дженерики.........*/
    if (id)
      this.data = this.api.request(car, { id }) as Observable<MyCarAnswer>;
  }
}
