import { TypedDocumentNode } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client';

import { QueryRef } from 'apollo-angular';

export type gqlRequest<T> = TypedDocumentNode<T, MyVariables>;

export type MyRequest<T> = QueryRef<T, MyVariables>;

export type MyAnswer<T> = ApolloQueryResult<T>;

export type MyVariables = {
  id: string;
  query: object;
  size: number;
  page: number;
  search: string;
};
