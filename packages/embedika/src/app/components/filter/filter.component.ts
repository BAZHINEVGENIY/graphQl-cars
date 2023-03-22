import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../core/services/api.service';
import { DestroyService } from '../../core/services/destroy.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StorageService } from '../../core/services/storage.service';
import { CarsListInterface } from '../../pages/types/cars.interface';
import { MyAnswer } from '../../pages/types/api.interface';
import { uniqValues } from '../../core/utils/uniq-values';
import { dataToString } from '../../core/utils/concat';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FilterComponent implements OnInit {
  private readonly changeRef = inject(ChangeDetectorRef);
  private readonly destroy$ = inject(DestroyService);
  private readonly storage = inject(StorageService);
  private readonly api = inject(ApiService<CarsListInterface>);

  public uniqCharge?: Set<string>;
  public uniqModel?: Set<string>;
  public isUniqCharge = true;
  public isUniqModel = true;

  public isSearch = false;
  public searchInputByManufacturer = '';
  public searchByCharge = [''];
  public searchByModel = '';

  @Input() numPage = 0;
  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.searchInputByManufacturer = this.storage.get('searchByManufacturer');
    this.searchByCharge = this.storage.get('searchByCharge');

    this.initializeUniqValue();
    this.initializeInputByManufacturer();
    this.filtering();
  }

  filtering() {
    // if (this.searchSelectCharge.length)
    this.storage.set('searchByCharge', this.searchByCharge);

    this.isSearch =
      !this.searchByCharge.length &&
      !this.searchByModel &&
      !this.searchInputByManufacturer;

    if (this.isSearch) return this.api.changeVariables({ page: this.numPage });

    this.api.changeVariables({
      query: {
        model: this.searchByModel,
        make: this.searchInputByManufacturer,
      },
      search: dataToString(this.searchByCharge),
      size: 100,
    });
    this.isUniqValue();
  }

  isUniqValue() {
    this.isUniqModel = !this.searchByModel;
    this.isUniqCharge = !this.searchByCharge.length;
  }

  private initializeUniqValue() {
    this.api.currentRequest$
      .pipe(
        map((cars: MyAnswer<CarsListInterface>) => cars.data?.carList),
        filter((value) => Boolean(value)),
        tap((carList) => {
          // if (!this.isUniqCharge && !this.isUniqModel) return;
          console.log(this.isUniqModel, this.isUniqCharge);
          //todo
          // избавиться от uniqValue (можно просто search...?)
          // if (this.isUniqCharge)
          this.uniqCharge = uniqValues<string>(
            carList.map((car) => car.naming?.version)
          );
          // if (this.isUniqModel)
          this.uniqModel = uniqValues<string>(
            carList.map((car) => car.naming?.model)
          );

          this.changeRef.detectChanges();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private initializeInputByManufacturer() {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        map(() => this.searchInputByManufacturer),
        debounceTime(200),
        distinctUntilChanged(),
        tap((make) => {
          this.storage.set('searchByManufacturer', make);
          const size = !make ? 5 : 100;
          this.api.changeVariables({
            query: { make },
            size,
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
