import { inject, Injectable } from '@angular/core';
import { GraphQlService } from './graph-ql.service';
import { Observable, share } from 'rxjs';
import { gqlRequest, MyAnswer } from '../../pages/types/api.interface';

@Injectable()
export class ApiService<T> {
  private readonly currentApi = inject(GraphQlService);

  request<T>(
    req: gqlRequest<T>,
    { id = '', query = {}, page = 0, size = 5, search = '' } = {}
  ): Observable<MyAnswer<T>> {
    return this.currentApi
      .request<T>(req, { id, query, page, size, search })
      .pipe(share());
  }

  changeVariables({ id = '', query = {}, page = 0, size = 5, search = '' }) {
    this.currentApi.changeVariables({ id, query, page, size, search });
  }

  get currentRequest$(): Observable<MyAnswer<T>> {
    return this.currentApi.currentRequest$;
  }
}
