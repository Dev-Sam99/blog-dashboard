import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCapital'
})
export class FirstLetterCapitalPipe implements PipeTransform {

  transform(word) {
    if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
