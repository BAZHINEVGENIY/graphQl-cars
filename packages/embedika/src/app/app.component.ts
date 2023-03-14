import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { ApiService } from './core/services/api.service';
import { GraphQlService } from './core/services/graph-ql.service';
import { FilterService } from './core/services/filter.service';
import { UniqValueService } from './core/services/uniq-value.service';

@Component({
  standalone: true,
  imports: [RouterModule, ApolloModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /*todo
     {provideIn root} как то хреново работает для lazyLoad, поэтому провайдим сюда 1 раз (либо в другое место единожды)
     получаем синглтоны, верно? :)
  *  */
  providers: [ApiService, GraphQlService, FilterService, UniqValueService],
})
export class AppComponent {
  title = 'embedika';
}
