import { Component, Input, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Pour *ngIf, *ngFor et les pipes
  ]
})
export class CountryDetailComponent implements AfterViewInit {
  @Input() country: any;
  private map: any;

  // ✅ Ajouter les propriétés manquantes
  timezones: string[] = [];
  currencyKeys: string[] = [];
  languageKeys: string[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (this.country) {
      // Initialiser les tableaux si les données sont présentes
      this.timezones = this.country?.timezones || [];
      this.currencyKeys = this.country?.currencies ? Object.keys(this.country.currencies) : [];
      this.languageKeys = this.country?.languages ? Object.keys(this.country.languages) : [];
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet();
    }
  }

  private async loadLeaflet() {
    const L = await import('leaflet');

    if (this.country?.latlng?.length === 2) {
      this.map = L.map('map').setView(
        [this.country.latlng[0], this.country.latlng[1]],
        6
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      L.marker([this.country.latlng[0], this.country.latlng[1]])
        .addTo(this.map)
        .bindPopup(`<b>${this.country.name.common}</b>`)
        .openPopup();
    }
  }

  // ✅ Méthode trackByValue pour optimiser *ngFor
  trackByValue(index: number, item: any): any {
    return item;
  }
}
