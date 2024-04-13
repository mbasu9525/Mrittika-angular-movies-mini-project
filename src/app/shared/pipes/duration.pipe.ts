import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    let time = +value;
    let hour = Math.floor(time / 60);
    let min = time % 60
    return `${hour}h ${min}min`;
  }

}
