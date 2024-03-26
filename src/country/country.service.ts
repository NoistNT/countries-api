import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { CountrySimple } from '@/schemas/country-simple.schema';
import { Query } from '@/types';
import { CountryFilterDto } from './dto/country-filter.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async findAll(filter?: CountryFilterDto): Promise<CountrySimple[]> {
    const query: Query = {};

    if (filter) {
      if (filter.region) {
        query.region = { $regex: filter.region, $options: 'i' };
      }

      if (filter.subregion) {
        query.subregion = { $regex: filter.subregion, $options: 'i' };
      }

      if (filter.capital) {
        query.capital = { $regex: filter.capital, $options: 'i' };
      }

      try {
        const countries = await this.countryModel
          .find(query)
          .select('-__v')
          .limit(9);

        const simpleCountries: CountrySimple[] = countries.map((country) => {
          return {
            _id: country._id.toString(),
            name: {
              common: country.name.common,
              official: country.name.official,
            },
            flags: country.flags[0],
            languages: country.languages,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital[0],
          };
        });

        return simpleCountries;
      } catch (error) {
        const typedError = error as Error;
        throw new Error(`Countries not found: ${typedError.message}`);
      }
    }

    return [];
  }

  async findById(id: string): Promise<Country> {
    try {
      const country = await this.countryModel.findById(id).select('-__v');

      if (!country) {
        throw new Error(`Country not found: ${id}`);
      }

      return country;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(typedError.message);
    }
  }
}
