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
        }));
      const id = a.payload.doc.id;
      return { id, data: dataArr };
    });
  }

  compareResults(result: any) {
    console.log(`[DEB]`);
    console.log(result);
    return 'sdffsd';
  }

}

