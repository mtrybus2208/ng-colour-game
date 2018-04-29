import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-header-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
    console.log('nav wita');
  }

}