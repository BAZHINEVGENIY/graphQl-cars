import { inject, Injectable } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  gqlRequest,
  MyAnswer,
  MyRequest,
  MyVariables,
} from '../../pages/types/api.interface';
import { Observable } from 'rxjs';

export function createApollo(httpLink: HttpLink) {
  const uri = 'https://api.chargetrip.io/graphql'; // желательно в environments

  const cache = new InMemoryCache({
    addTypename: false,
  });

  const http = httpLink.create({ uri });
  const headersMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'x-client-id': '5ed1175bad06853b3aa1e492',
        'x-app-id': '623996f3c35130073829b252',
      },
    });
    return forward(operation);
  });

  const link = ApolloLink.from([headersMiddleware, http]);

  return {
    link,
    cache,
  };
}

@Injectable()
export class GraphQlService<T> {
  private readonly apollo = inject(Apollo);
  private readonly httpLink = inject(HttpLink);
  private _request?: MyRequest<T>;

  request<T>(req: gqlRequest<T>, args: MyVariables): Observable<MyAnswer<T>> {
    // @ts-ignore // todo
    this._request = this.getGraphQlQuery<T>(req, args);
    // @ts-ignore //
    return this._request.valueChanges;
  }

  //меняем Variables откуда угодно и получаем другие данные из ТЕКУЩЕГО запроса^
  //поэтому решил использовать шарить запрос на всё приложение
  changeVariables(args: MyVariables) {
    this._request?.setVariables(args);
  }

  private getGraphQlQuery<T>(
    req: gqlRequest<T>,
    args: MyVariables
  ): MyRequest<T> {
    return this.apollo.watchQuery({
      query: req,
      variables: args,
      useInitialLoading: true,
      notifyOnNetworkStatusChange: true,
    });
  }

  constructor() {
    this.apollo.create(createApollo(this.httpLink));
  }
}
