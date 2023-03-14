import { inject, Injectable } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { gqlRequest, MyAnswer, MyRequest, MyVariables, } from '../../pages/types/api.interface';
import { Observable } from 'rxjs';

/*todo
   создаю клиент аполло, думаю всё правильно
   к слову, из коробки кеширует запросы ^__^
*/
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

/*todo дженерики?*/
@Injectable()
export class GraphQlService {
  private readonly apollo = inject(Apollo);
  private readonly httpLink = inject(HttpLink);
  private _request?: MyRequest;

  request(req: gqlRequest, args: MyVariables): Observable<MyAnswer> {
    this._request = this.getGraphQlQuery(req, args);
    return this._request.valueChanges;
  }

  /*todo
         меняем Variables откуда угодно и получаем другие данные из ТЕКУЩЕГО запроса^
         как раз поэтому решил использовать один запрос на всё приложение
      */
  changeVariables(args: MyVariables) {
    this._request?.setVariables(args);
  }

  private getGraphQlQuery(req: gqlRequest, args: MyVariables): MyRequest {
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
