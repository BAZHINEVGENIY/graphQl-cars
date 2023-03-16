import { RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { ApiService } from './core/services/api.service';
import { GraphQlService } from './core/services/graph-ql.service';
import { StorageService } from './core/services/storage.service';

@Component({
  standalone: true,
  imports: [RouterModule, ApolloModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService, GraphQlService],
})
export class AppComponent implements OnInit {
  title = 'embedika';
  private readonly storage = inject(StorageService);

  ngOnInit() {
    this.storage.initializeStorage(
      'searchCarByManufacturer',
      'searchSelectCharge',
      'numPage'
    );
  }
}
