import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor( private CountriesService: CountriesService ){}

  searchByCapital( term: string ):void {
   this.CountriesService.searchCapital( term )
   .subscribe( countries => {
      this.countries = countries;
   })

  }

}
