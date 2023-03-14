import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CarInterface } from '../../../types/cars.interface';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fruits-card',
  standalone: true,
  imports: [NgIf, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarCardComponent {
  private readonly router = inject(Router);
  @Input() car?: CarInterface;

  goToCar() {
    this.router.navigate(['/list', this.car?.id]);
  }
}
