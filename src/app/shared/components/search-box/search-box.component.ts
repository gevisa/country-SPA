import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public  onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );

    })
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
/*   @ViewChild('txtInput')
   txtInput!: ElementRef<HTMLInputElement> */

  emitValue( value: string ):void {
   // const newItem = this.txtInput.nativeElement.value;
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
   this.debouncer.next( searchTerm );


  }

}
