import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap, map, exhaustMap, catchError, flatMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-best-results',
  templateUrl: './best-results.component.html',
  styleUrls: ['./best-results.component.scss']
})
export class BestResultsComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: any;

  constructor(private afs: AngularFirestore) {
    const firestore = afs.firestore.settings({timestampsInSnapshots: true});
  }

  ngOnInit() {
    this.itemsCollection = this.afs.collection<any>('best-results');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      tap(x => console.log('asd'))
    ).subscribe(
      (x) => {
        console.log(x)
      }
    )
  }
  onGetBestResults(level: string) {
    console.log('KLYK');
  }

}
