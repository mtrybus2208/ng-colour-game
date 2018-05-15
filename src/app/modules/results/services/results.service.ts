import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, flatMap, zip,combineLatest, switchMap, merge,exhaustMap,tap, map, catchError } from 'rxjs/operators';
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
    // const easyResults = this.afs.collection<any>('best-results/easy/time/long/users');
    // const irems = easyResults.snapshotChanges().pipe(map(x => x.map(a => a.payload.doc.data())))
    // irems.subscribe(x => console.log(x));

    // const lol: any = ['easy', 'medium', 'hard'].map(level => {
    //   this.afs.collection<any>(`best-results/${level}/time/long/users`)
    //   .snapshotChanges().pipe(map(x => x.map(a => a.payload.doc.data())));
    // });
    // lol.subscribe(
    //   x => console.log(x);
    // );

    const itemsCollection = this.afs.collection<any>('best-results');
    const items = itemsCollection
    .snapshotChanges()
    .pipe(
      map(res => res.map(x => x.payload.doc.id)),
      flatMap(arr => {
        return arr.map(level => 
          this.afs.collection<any>(`best-results/${level}/time/long/users`)
            .snapshotChanges()
            .pipe(
              map(x => x.map(a => a.payload.doc.data()))
            )
            .subscribe(x => console.log(x));
      }),
 

      // zip(arr => {
      //   return  [
      //     this.afs.collection<any>(`best-results/${arr[0]}/time/long/users`)
      //     .snapshotChanges()
      //     .pipe(
      //       map(x => x.map(a => a.payload.doc.data()))
      //     )
      //   ];
      // })

    )
    .subscribe(x => console.log(x));
    // const itemsCollection = this.afs.collection<any>('best-results');
    // console.log('asd')
    // const items = itemsCollection
    // .snapshotChanges()
    // .pipe(
    //   map()
    // );
    // .pipe(
   
    //   merge( [
    //     this.afs.collection('best-results/easy/time').snapshotChanges().pipe(map(actions => actions.map(a => a.payload.doc.data()))),
        // this.afs.collection('best-results/medium/time').snapshotChanges().pipe(map(actions => actions.map(a => a.payload.doc.data()))),
        // this.afs.collection('best-results/hard/time').snapshotChanges().pipe(map(actions => actions.map(a => a.payload.doc.data()))),
      // ]),
      // map((actions: Array<any>) =>  actions.map(a => a.payload.doc.data() )),
     
      // );
    // this.itemsCollection = this.afs.collection<any>('best-results').pipe();
    // return this.itemsCollection.snapshotChanges()
    //   .pipe(
    //     // map((actions: Array<any>) => this.convertResults(actions)), 
    //     // map((actions: Array<any>) => actions.map(x => {
    //     //   x.payload.doc.id
    //     // })),
    //     // exhaustMap((titles: any) => {
    //     //   return titles.map(
    //     //     x => this.afs.collection<any>('time').snapshotChanges().pipe(
    //     //       map((x: any) => x.payload.doc.data())
    //     //     )
    //     //   );
    //     // }),
    //     tap(x => console.log(x))
    //   );
    // items.subscribe(
    //   x => {
    //     console.log('sendResults');
    //     console.log(x);
    //   }
    // );
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

