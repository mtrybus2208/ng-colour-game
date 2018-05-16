import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatAll, scan, concat, buffer, mergeAll, mergeMap, first, flatMap, zip,combineLatest,
  withLatestFrom, switchMap, merge,exhaustMap,tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { forkJoin } from 'rxjs/observable/forkJoin';


@Injectable()
  export class ResultsService {

  private itemsCollection: any = null;
  private items: any = null;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
    const firestore = afs.firestore.settings({timestampsInSnapshots: true});
  }

  getAllResults() {
    // const easyDoc = this.afs.collection<any>('hard').doc('short');
    // const tasks = easyDoc.collection<any>('users');
 
    // tasks.add({
    //   name: 'arek', score: 22
    // });

    const easyUsersColl = this.afs.collection<any>('easy');
    const easyUsers =  easyUsersColl.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        return { ...data };
      }))
    );

    easyUsers.subscribe(x => console.log(x))
 
    // function test(time): any {
    //   const easyCollection = this.afs.collection<any>(`best-results/easy/time/${time}/users`);
    //   const mediumCollection = this.afs.collection<any>('best-results/medium/time/long/users');
    //   const hardCollection = this.afs.collection<any>('best-results/hard/time/long/users');
    //   const res = [easyCollection, mediumCollection, hardCollection].map(x => x.snapshotChanges().pipe(
    //     map(easy => easy.map(a => a.payload.doc.data())),
    //   ));
    //   return res;
    //  }

    return of([]);
  }

  convertResults(actions: Array<any>) {
    return actions.map(a => {
      const data = a.payload.doc.data();
 
 
      const dataArr = Object.keys(data)
        .map(time => ({
          time,
          results: data[time]
            .sort((prev, next) => next.score - prev.score)
            .slice(0, 5)
        }));
      const id = a.payload.doc.id;
      return { id, data: dataArr };
    });
  }

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
    const difficulty = 'hard';
    const time = 'medium';
    const resultCollection = this.afs.collection(`best-results`).doc('medium').collection('time').doc('easy').collection('users');
    resultCollection.add({ name: `name`, score: 66 });

    const result = resultCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data())),
      )
      .subscribe(
        x => {
          console.log('sendResults');
          console.log(x);
        }
      );
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

