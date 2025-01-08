import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CountryData } from '../model/country-model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1/region/';

  constructor(private http: HttpClient) { }

  getCountries(regionName: string): Observable<CountryData[]> {
    return this.http.get(this.apiUrl + regionName, { responseType: 'text' }).pipe(
      map((response: string) => {
        try {
          const data = JSON.parse(response);

          if (!Array.isArray(data)) {
            throw new Error('Les données retournées ne sont pas un tableau');
          }

          return data.map((country: any) => ({
            name: country.name || { common: '', official: '' },
            capital: country.capital || [],
            region: country.region || '',
            subregion: country.subregion || '',
            population: country.population || 0,
            area: country.area || 0,
            flags: country.flags || { png: '', svg: '' },
            currencies: country.currencies || {},
            languages: country.languages || {},
            timezones: country.timezones || [],
            latlng: country.latlng || [null, null], // Ajout des coordonnées ici
          })) as CountryData[];
        } catch (error) {
          console.error('Erreur lors de l\'analyse JSON :', error);
          throw new Error('Impossible d\'analyser les données de l\'API');
        }
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des pays :', error.message || error);
        return throwError(() => new Error('Impossible de charger les pays. Veuillez réessayer plus tard.'));
      })
    );
  }
}
