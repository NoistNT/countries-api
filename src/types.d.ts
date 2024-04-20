export interface Name {
  common: string;
  official: string;
  nativeName?: { [languageCode: string]: { official: string; common: string } };
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Translation {
  official: string;
  common: string;
}

export interface Demonyms {
  f: string;
  m: string;
}

export interface Car {
  signs: string[];
  side: 'left' | 'right';
}

export interface ICountry {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: { [currencyCode: string]: Currency };
  idd: { root: string; suffixes: string[] };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: { [languageCode: string]: string };
  translations: { [languageCode: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: { [demonymsCode: string]: Demonyms };
  flag: string;
  maps: { googleMaps: string; openStreetMaps: string };
  population: number;
  gini: { [year: string]: number };
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: string[];
}

export interface ICountrySimple {
  name: string;
  flags: string[];
  languages: { [languageCode: string]: string };
  region: string;
  subregion: string;
  capital: string[];
}

export interface Query {
  region?: { $regex: string; $options: 'i' };
  capital?: { $regex: string; $options: 'i' };
  population?: { $regex: number; $options: 'i' };
}
