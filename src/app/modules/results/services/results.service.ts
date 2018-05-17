import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap,switchMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { User, Times, BestResults} from './../model/results.model';

@Injectable()
  export class ResultsService {

  private bestResultsCollection: AngularFirestoreCollection<BestResults>;
  private bestResults: Observable<BestResults>;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
    const firestore = afs.firestore.settings({timestampsInSnapshots: true});
  }

  getCurrentLevel(ref: AngularFirestoreDocument<BestResults>, gameLevel: string): Observable<any> {
    const times = ['long', 'short', 'medium'];
    return combineLatest(
      times.map(
        item => {
          return ref.collection<Times>(item, refs => {
            //return refs.where('score', '==', 1);
            return refs.orderBy('score').limit(5);
          }).snapshotChanges().pipe(
            map(actions => actions.map((a): User =>  {
              const data = a.payload.doc.data();
              console.log(a.payload.doc.data())
              const id = a.payload.doc.id;
              return { id, name: data.name, score: data.score };
            }))
          );
        }
      ), (long, short, medium) => {
        return {
          gameLevel,
          data: {long, short, medium}
        };
      }
    );
  }

  getAllResults(): Observable<BestResults> {
    this.bestResultsCollection = this.afs.collection<BestResults>('results');

    this.bestResults = this.bestResultsCollection.snapshotChanges().pipe(

      map((actions: any) => actions.map(a => a.payload.doc.id)),

      mergeMap((act) => {
        return  of({
          name: act,
          data: act.map(level => this.afs.doc<BestResults>(`results/${level}`))
        });
      }),

      switchMap((resultsDoc) => {
        return combineLatest(
          resultsDoc.data.map((level, index) => {
            return this.getCurrentLevel(level, resultsDoc.name[index]);
          })
        );
      }),

      map((resultArr: Array<any>) => {
        return resultArr.reduce((obj, item) => {
          obj[item.gameLevel] = item.data;
          return obj;
        }, {});
      })
    );
    return this.bestResults;
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

