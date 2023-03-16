import { inject, Injectable } from '@angular/core';
import { GraphQlService } from './graph-ql.service';
import { Observable, share } from 'rxjs';
import { gqlRequest, MyAnswer } from '../../pages/types/api.interface';

//этот сервис как прослойка над реальной реализацией API,
//здесь можно поредачить данные и задать дефолтные значения
@Injectable()
export class ApiService {
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

  // private replaceNullChargeVersion(answer: MyAnswer) {
  //   const newAnswer = structuredClone(answer);
  //   // newAnswer.data?.carList?.map((car: CarInterface) => {
  //   //   if (!car.naming.version) return (car.naming.version = 'no information');
  //   //   return car;
  //   // });
  //   return newAnswer;
  // }
}
