import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { UniqValueService } from '../../../core/services/uniq-value.service';
import { ApiService } from '../../../core/services/api.service';
import { FilterService } from '../../../core/services/filter.service';
import { DestroyService } from '../../../core/services/destroy.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MyCarsAnswer } from '../../types/api.interface';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
  private readonly changeRef = inject(ChangeDetectorRef);
  private readonly api = inject(ApiService);
  private readonly filterService = inject(FilterService);
  private readonly uniqValueService = inject(UniqValueService);

  private readonly destroy$ = inject(DestroyService);
  stopUniqValue$ = new Subject();

  uniqCharge?: Set<string>;
  uniqModel?: Set<string>;

  searchSelectValue = [];
  searchRadioValue = '';

  // @ViewChildren('input, select')
  // elements!: QueryList<ElementRef<HTMLInputElement | MatSelect>>;
  // this.elements.get(0)?.nativeElement as HTMLInputElement
  @Input() data$!: Observable<MyCarsAnswer>;
  @Input() numPage!: number;
  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.startUniqValue();
    this.initializeFilter();
  }

  /*todo
       если фильтры не заданы, то ищем полученную от родителя страницу (numPage)
       если фильтры есть, то останавливаем подбор уникальных значений и ищем
    */
  searchCharge() {
    if (!this.searchSelectValue?.length)
      return this.api.changeVariables({ page: this.numPage });

    this.stopUniqValue$.next('');
    const search = this.searchSelectValue?.join(' ');
    this.api.changeVariables({ search });
  }

  /*todo
       очень странная конструкция получилась...
       пытался через
         data$.pipe(
            switchMap( () => this.uniqValueService.initializeData(this.data$))
            tap( () => ....то что ниже)
          ).subscribe()
       но что то switchMap не захотел.. :C
      */
  startUniqValue() {
    this.uniqValueService
      .initializeData(this.data$)
      .pipe(
        tap(() => {
          this.uniqCharge = this.uniqValueService.uniqCharge;
          this.uniqModel = this.uniqValueService.uniqModel;
          this.changeRef.detectChanges();
        }),
        takeUntil(this.destroy$),
        takeUntil(this.stopUniqValue$)
      )
      .subscribe();
  }

  /*todo
       подписываюсь на изменение инпута и тригерю запрос на сервер
       вынес в сервис, чтобы не захламлять компонент логикой.
       как раз для этого спрашивал про takeUntil :)
    */
  private initializeFilter() {
    this.filterService
      .initializeInputFilter(this.input?.nativeElement)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.stopUniqValue$.complete();
  }
}
