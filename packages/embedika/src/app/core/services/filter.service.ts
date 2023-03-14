import { inject, Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class FilterService {
  private readonly api = inject(ApiService);

  initializeInputFilter(input: HTMLInputElement) {
    return fromEvent(input, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(200),
      distinctUntilChanged(),
      tap((make) => this.api.changeVariables({ query: { make } }))
    );
  }
}
