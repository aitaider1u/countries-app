import { Component, WritableSignal, signal, inject, OnInit, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionListComponent } from '../../widget/region-list/region-list.component';
import { CountryService } from '../../service/country.service';
import { CountryData } from '../../model/country-model';
import { HttpClientModule } from '@angular/common/http';
import { CountryDetailComponent } from "../../widget/country-detail/country-detail.component";

@Component({
  selector: 'app-region-page',
  standalone: true,
  imports: [RegionListComponent, HttpClientModule, CountryDetailComponent],
  templateUrl: './region-page.component.html',
  styleUrls: ['./region-page.component.css']
})
export class RegionPageComponent implements OnInit {
  selectedCountry: any =  null;

  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  // Signal pour le nom de la région
  name: WritableSignal<string> = signal<string>("");

  // Signal pour stocker la liste des pays
  countries: WritableSignal<CountryData[]> = signal<CountryData[]>([]);

  constructor() {
    // Effet pour détecter les changements dans le signal 'name' et charger les données
    effect(() => {
      const regionName = this.name();
      console.log('Effect déclenché avec name:', regionName);

      if (regionName) {
        this.countryService.getCountries(regionName).subscribe({
          next: (data) => {
            this.countries.set(data);
            console.log('Pays chargés avec succès:', data);
          },
          error: (error) => {
            console.error('Erreur lors du chargement des pays :', error);
          }
        });
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramName = params.get('name') || "";
      this.name.set(paramName);
      console.log('Paramètre name reçu:', this.name());
    });
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

}
