import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
    `img {
      width: 125px;
    }`
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
     private activatedRoute: ActivatedRoute,
     private countriesService: CountriesService,
     private router: Router,

     ) {}

  ngOnInit(): void {

   /*  this.activatedRoute.params
    .subscribe( ({ id }) => {
        this.countriesService.searchCountryAlphaCode( id )
         .subscribe( country => {
            console.log({ country });
         });
    }); */

      this.activatedRoute.params
       .pipe(
          switchMap( ({ id }) => this.countriesService.searchCountryAlphaCode( id )),
       )
       .subscribe( country => {
         if( !country ) return this.router.navigateByUrl('');
          return this.country = country;


       });
  }
  test(){
    console.log("hola");

  }
}