export class CountryFilterDto {
  name?: {
    common: { $regex: string; $options: 'i' };
    official: { $regex: string; $options: 'i' };
  };
  region?: string;
  subregion?: string;
  capital?: string;
  population?: number;
}
