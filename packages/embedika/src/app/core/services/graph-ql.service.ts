import { inject, Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  gqlRequest,
  MyAnswer,
  MyVariables,
} from '../../pages/types/api.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

export const createApollo = () => {
  const uri = environment.apiUrl;
  const httpLink = inject(HttpLink);
  const link = httpLink.create({ uri });

  const cache = new InMemoryCache({
    addTypename: false,
  });

  const defaultOptions = {
    watchQuery: {
      useInitialLoading: true,
      notifyOnNetworkStatusChange: true,
      returnPartialData: true,
    },
  };

  return {
    link,
    cache,
    defaultOptions,
  };
};

@Injectable()
export class GraphQlService<T> {
  private readonly apollo = inject(Apollo);
  private _request?: QueryRef<T, MyVariables>;

  request<T>(
    query: gqlRequest<T>,
    variables: MyVariables
  ): Observable<MyAnswer<T>> {
    // @ts-ignore //
    this._request = this.apollo.watchQuery<T, MyVariables>({
      query,
      variables,
    });
    // @ts-ignore //
    return this._request.valueChanges;
  }

  changeVariables(args: MyVariables) {
    this._request?.setVariables(args).then();
  }

  get currentRequest$(): Observable<MyAnswer<T>> {
    // @ts-ignore // todo fix after
    return this._request?.valueChanges;
  }

  constructor() {
    this.apollo.create(createApollo());
  }
}
