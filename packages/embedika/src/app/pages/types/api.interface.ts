import { TypedDocumentNode } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client';
import { CarListInterface, CarsListInterface } from './cars.interface';

import { QueryRef } from 'apollo-angular';

export type gqlType = CarsListInterface | CarListInterface;

export type gqlRequest = TypedDocumentNode<gqlType, MyVariables>;

export type MyRequest = QueryRef<gqlType, MyVariables>;

/*todo
    т.к. я не могу правильно применить дженерики для MyAnswer
    приходится в зависимости от запроса делать "as MyCarsAnswer" or "as MyCarAnswer"
    буду признателен, если реализуешь дженерики
*/
export type MyAnswer = ApolloQueryResult<gqlType>;

export type MyCarsAnswer = ApolloQueryResult<CarsListInterface>;
export type MyCarAnswer = ApolloQueryResult<CarListInterface>;

export type MyVariables = {
  id: string;
  query: object;
  size: number;
  page: number;
  search: string;
};
