import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  OnDestroy
} from '@angular/core';

import { AlertComponent } from './../../components/alert/alert.component';

@Component({
  selector: 'app-new-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit, OnDestroy {

  @ViewChild('alertContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log('NewGameComponent');
  }

  createComponent(type) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(AlertComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.type = type;
  }
  ngOnDestroy() {
    this.componentRef.destroy();
   }
}
