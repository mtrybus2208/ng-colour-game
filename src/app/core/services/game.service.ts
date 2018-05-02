import { catchError, filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ColourItem } from './../store/reducers/game.reducer';

@Injectable()
export class GameService {

  constructor( ) {}

  shuffleColours(base: ColourItem[]): any {
    const names = base.map(item => ({name: item.name}))
    .sort(() => (.5 - Math.random()));

    const colors = base.map((item, index) => ({colour: item.colour}))
    .sort(() => (.5 - Math.random()));

    const question =  {
      ...names[Math.floor(Math.random() * base.length)],
      ...colors[Math.floor(Math.random() * base.length)],
    };
    const shuffled = colors.map((colour, index) => {
      return {
        ...colour,
        name: names[index].name
      };
    });
    const result = {
      question,
      shuffled
    };
    return result;
  }
}
