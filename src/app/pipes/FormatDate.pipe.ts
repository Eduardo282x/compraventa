import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string | Date | number | any, ...args: unknown[]): string {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}
