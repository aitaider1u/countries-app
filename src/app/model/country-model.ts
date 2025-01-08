interface Currency {
  name: string;
  symbol: string;
}

interface Idd {
  root: string;
  suffixes: string[];
}

interface Translation {
  official: string;
  common: string;
}

interface Demonym {
  f: string;
  m: string;
}

interface MapLinks {
  googleMaps: string;
  openStreetMaps: string;
}

interface FlagLinks {
  png: string;
  svg: string;
}

interface CoatOfArmsLinks {
  png: string;
  svg: string;
}

interface CapitalInfo {
  latlng: number[];
}

interface PostalCode {
  format: string;
  regex: string;
}

export interface CountryData {
  name: {
      common: string;
      official: string;
      nativeName: {
          [key: string]: {
              official: string;
              common: string;
          };
      };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
      [key: string]: Currency;
  };
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
      [key: string]: string;
  };
  translations: {
      [key: string]: Translation;
  };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: {
      eng: Demonym;
      fra: Demonym;
  };
  flag: string;
  maps: MapLinks;
  population: number;
  fifa: string;
  car: {
      signs: string[];
      side: string;
  };
  timezones: string[];
  continents: string[];
  flags: FlagLinks;
  coatOfArms: CoatOfArmsLinks;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}
