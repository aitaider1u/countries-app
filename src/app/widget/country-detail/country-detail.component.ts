import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CountryDetailComponent implements OnInit {
  @Input() country: any;
  googleMapUrl: SafeResourceUrl | null = null;

  timezones: string[] = [];
  currencyKeys: string[] = [];
  languageKeys: string[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.country) {
      this.timezones = this.country?.timezones || [];
      this.currencyKeys = this.country?.currencies
        ? Object.keys(this.country.currencies)
        : [];
      this.languageKeys = this.country?.languages
        ? Object.keys(this.country.languages)
        : [];

      if (this.country?.latlng && this.country.latlng.length === 2) {
        const [lat, lng] = this.country.latlng;
        const url = `https://www.google.com/maps?q=${lat},${lng}&z=6&output=embed`;
        this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        console.error('Coordonnées invalides ou manquantes.');
      }
    }
  }

  /**
   * Optimisation *ngFor avec trackBy
   */
  trackByValue(index: number, item: any): any {
    return item;
  }
}
