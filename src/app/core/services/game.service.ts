import { catchError, filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ColourItem } from './../store/reducers/game.reducer';

export interface GameParams {
  question: ColourItem;
  colourItems: ColourItem[];
}

export interface AnswerParam extends GameParams {
  answer: ColourItem;
}
@Injectable()
export class GameService {

  constructor( ) {}

  shuffleColours({diffSet, diff, base}): GameParams {
    const shuffledArr = this.shuffleArray<ColourItem[]>(base);
    const resultArray =  this.getResultColours(diffSet, diff, shuffledArr);
    return this.mixColours(resultArray);
  }

  compareColours(payload: AnswerParam): boolean {
    const result = payload.colourItems.find((element) => {
      return element.colour === payload.question.colour;
    });
    return (result.name === payload.answer.name) ? true : false;
  }

  mixColours(resultArray: ColourItem[]): GameParams  {
    const names = resultArray.map(item => ({name: item.name}))
    .sort(() => (.5 - Math.random()));

    const colors = resultArray.map((item, index) => ({colour: item.colour}))
    .sort(() => (.5 - Math.random()));

    const question =  {
      ...names[Math.floor(Math.random() * resultArray.length)],
      ...colors[Math.floor(Math.random() * resultArray.length)],
    };

    const shuffled = colors.map((colour, index) => {
      return {
        ...colour,
        name: names[index].name
      };
    });

    return {
      question,
      colourItems: shuffled,
    };
  }

  getResultColours(diffSet, diff, shuffledArr): ColourItem[] {
    const diffIndex =  diffSet.findIndex((el) => el === diff) + 1;
    return shuffledArr.slice(0, diffIndex * 2);
  }

  shuffleArray<T>(arr): T {
    return arr
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }
}
