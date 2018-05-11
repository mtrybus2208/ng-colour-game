import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-best-results',
  templateUrl: './best-results.component.html',
  styleUrls: ['./best-results.component.scss']
})
export class BestResultsComponent implements OnInit {

  private itemsCollection: any;
  items: any;
  result: any;

  constructor(private afs: AngularFirestore) {
    const firestore = afs.firestore.settings({timestampsInSnapshots: true});

    this.itemsCollection = this.afs.collection<any>('best-results');
    this.items = this.itemsCollection.snapshotChanges();
    this.items
    .pipe(
      // to ma isc do selectora
      map((actions: Array<any>) => actions.map(a => {
        const data = a.payload.doc.data();
        const dataArr = Object.keys(data)
          .map(name => ({
            name,
            score: data[name]
          }));
        const id = a.payload.doc.id;
        return { id, data: dataArr };
      })),
    )
    .subscribe(
      items => this.result = [...items]
    );
  }

  ngOnInit() {
  }
  onGetBestResults(level: string) {
    console.log('KLYK');
  }

}
