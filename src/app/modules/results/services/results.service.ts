import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


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
    this.itemsCollection = this.afs.collection<any>('best-results');
    return this.itemsCollection.snapshotChanges()
      .pipe(
        map((actions: Array<any>) => this.convertResults(actions)),
      );
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

