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
import { UniqValueService } from '../../core/services/uniq-value.service';
import { ApiService } from '../../core/services/api.service';
import { DestroyService } from '../../core/services/destroy.service';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  takeUntil,
  tap,
} from 'rxjs';
import { MyAnswer } from '../../pages/types/api.interface';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StorageService } from '../../core/services/storage.service';
import { CarsListInterface } from '../../pages/types/cars.interface';

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
})
export class FilterComponent implements OnInit {
  private readonly changeRef = inject(ChangeDetectorRef);
  private readonly destroy$ = inject(DestroyService);
  private readonly api = inject(ApiService);
  private readonly storage = inject(StorageService);
  private readonly uniqValueService = inject(UniqValueService);

  public uniqCharge?: Set<string>;
  public uniqModel?: Set<string>;
  public isUniqCharge = true;
  public isUniqModel = true;

  public searchCarByManufacturer = '';
  public searchSelectCharge = [''];
  public searchRadioValue = '';

  // @ViewChildren('input, select')
  // elements!: QueryList<ElementRef<HTMLInputElement | MatSelect>>;
  // this.elements.get(0)?.nativeElement as HTMLInputElement
  @Input() data$!: Observable<MyAnswer<CarsListInterface>>;
  @Input() numPage!: number;
  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.initializeUniqValue();
    this.initializeFilter();
    this.searchCarByManufacturer = this.storage.get('searchCarByManufacturer');
    this.searchSelectCharge = this.storage.get('searchSelectCharge');
    this.filtering();
  }

  filtering() {
    this.storage.set('searchSelectCharge', this.searchSelectCharge);

    const isSearch =
      !this.searchSelectCharge.length &&
      !this.searchRadioValue &&
      !this.searchCarByManufacturer;
    if (isSearch) return this.api.changeVariables({ page: this.numPage });

    const model = this.searchRadioValue;
    const make = this.searchCarByManufacturer;
    const charge = Array.isArray(this.searchSelectCharge)
      ? this.searchSelectCharge.join(' ')
      : '';

    this.api.changeVariables({
      query: { model, make },
      search: charge,
      size: 100,
    });
  }

  isUniqValue() {
    this.isUniqModel = !this.searchRadioValue;
    this.isUniqCharge = !this.searchSelectCharge.length;
  }

  private initializeUniqValue() {
    this.uniqValueService
      .uniqValue(this.data$)
      .pipe(
        tap(([model, charge]) => {
          if (this.isUniqModel) this.uniqModel = model;
          if (this.isUniqCharge) this.uniqCharge = charge;

          if (this.isUniqCharge || this.isUniqModel)
            this.changeRef.detectChanges();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private initializeFilter() {
    fromEvent(this.input.nativeElement, 'input')
      .pipe(
        map(() => this.searchCarByManufacturer),
        debounceTime(200),
        distinctUntilChanged(),
        tap((make) => {
          this.storage.set('searchCarByManufacturer', make);
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
