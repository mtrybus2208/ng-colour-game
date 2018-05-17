import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap, switchMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { User, Times, BestResults, UserResults } from './../models/results.model';
import { MapGameTimeToSecPipe } from './../../../shared/pipes/mapGameTimeToSec.pipe';

@Injectable()
  export class ResultsService {

  private bestResultsCollection: AngularFirestoreCollection<BestResults>;
  private bestResults: Observable<BestResults>;

  constructor(
    private timePipe: MapGameTimeToSecPipe,
    private http: HttpClient,
    private afs: AngularFirestore) {
    const firestore = afs.firestore.settings({timestampsInSnapshots: true});
  }

  getCurrentLevel(ref: AngularFirestoreDocument<BestResults>, gameLevel: string): Observable<any> {
    const times = ['short', 'medium', 'long'];
    return combineLatest(
      times.map(
        item => {
          return ref.collection<User>(`${item}`).doc('users').collection('users', userRef => {
            return userRef.orderBy('score', 'desc').limit(5);
          }).snapshotChanges().pipe(
            map(actions => actions.map((a): User =>  {
              const data = a.payload.doc.data();

              const id = a.payload.doc.id;
              return { id, name: data.name, score: data.score };
            }))
          );
        }
      ), (short, medium, long) => {
        return {
          gameLevel,
          data: {short, medium, long}
        };
      }
    );
  }

  getAllResults(): Observable<BestResults> {
    this.bestResultsCollection = this.afs.collection<BestResults>('results', ref => ref.orderBy('id'));

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

  compareResults(result: {payload: BestResults, userScore: UserResults}): Observable<boolean> {
    const time = this.timePipe.transform(result.userScore.time, true);
    const level = result.userScore.level;
    const score = result.userScore.score;

    return result.payload[level][time].filter(res => res.score < score).length !== 0
      ? of(true)
      : of(false);
  }

  sendResults(user: User) {
    const difficulty = 'easy';
    const time = 'medium';
    const resultCollection1 = this.afs.collection(`results`).doc('easy').collection('short').doc('users').collection('users');
     // resultCollection1.add({ name: `u${i++}ser${i}`, score: i + 1 });


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

