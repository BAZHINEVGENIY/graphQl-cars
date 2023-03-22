import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noData', standalone: true })
export class NoDataPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value : 'No data';
  }
}
