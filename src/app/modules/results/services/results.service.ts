import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { combineLatest } from 'rxjs/observable/combineLatest';

export interface User {
  name: string;
  score: number;
}

export interface GameTimes {
  long: Array<User>;
  short: Array<User>;
  medium: Array<User>;
}
export interface GameLevels {
  easy: number;
  medium: AngularFirestoreCollection<GameTimes>;
  hard: AngularFirestoreCollection<GameTimes>;
}

@Injectable()
  export class ResultsService {

    private easyDocRef: AngularFirestoreDocument<GameLevels>;
    private mediumDocRef: AngularFirestoreDocument<GameLevels>;
    private hardDocRef: AngularFirestoreDocument<GameLevels>;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
    const firestore = afs.firestore.settings({timestampsInSnapshots: true});
  }

  getCurrentLevel(ref: AngularFirestoreDocument<GameLevels>) {
    const times = ['long', 'short', 'medium'];
    return combineLatest(
      times.map(
        item => ref.collection<any>(item).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        )
      ), (long, short, medium) => {
        return {long, short, medium};
      }
    );
  }

  getAllResults() {
    this.easyDocRef = this.afs.doc<GameLevels>('results/easy');
    this.mediumDocRef = this.afs.doc<GameLevels>('results/medium');
    this.hardDocRef = this.afs.doc<GameLevels>('results/hard');

    const easy = this.getCurrentLevel(this.easyDocRef);
    const medium = this.getCurrentLevel(this.mediumDocRef);
    const hard = this.getCurrentLevel(this.hardDocRef);

    const result = combineLatest(easy, medium, hard, (easyLevel, mediumLevel, hardLevel) => {
      return {
        easy: easyLevel,
        medium: mediumLevel,
        hard: hardLevel,
      };
    });
    return result;
  }

  // convertResults(actions: Array<any>) {
  //   return actions.map(a => {
  //     const data = a.payload.doc.data();
 
 
  //     const dataArr = Object.keys(data)
  //       .map(time => ({
  //         time,
  //         results: data[time]
  //           .sort((prev, next) => next.score - prev.score)
  //           .slice(0, 5)
  //       }));
  //     const id = a.payload.doc.id;
  //     return { id, data: dataArr };
  //   });
  // }

  compareResults(result: {payload: any, userScore: any}) {

    const userTime = this.mapTimeToNames(result.userScore.time);
    const userLevel = result.payload
      .filter(item => item.id === result.userScore.diff)[0]['data']
      .filter(item => item.time === userTime)[0]['results']
      .filter(item => item.score > result.userScore.score);

    return userLevel.length <= result.payload.length
      ? of(true)
      : of(false);
      // After comparision, if result is true, just remove one item from current collection, and insert
      // new item, order is not important
  }

  sendResults(user: {name: string, score: number}) {
    // const difficulty = 'hard';
    // const time = 'medium';
    // const resultCollection = this.afs.collection(`best-results`).doc('medium').collection('time').doc('easy').collection('users');
    // resultCollection.add({ name: `name`, score: 66 });

    // const result = resultCollection.snapshotChanges()
    //   .pipe(
    //     map(actions => actions.map(a => a.payload.doc.data())),
    //   )
    //   .subscribe(
    //     x => {
    //       console.log('sendResults');
    //       console.log(x);
    //     }
    //   );
      return of(true);
  }

  mapTimeToNames(time: number) {
    switch (time) {
      case 10 : {
        return 'short';
      }
      case 60: {
        return 'medium';
      }
      case 90: {
        return 'long';
      }
      default:
        return 'long';
    }
  }

}

