import { CountrySimple } from '@/schemas/country-simple.schema';
import { Query } from '@/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { CountryFilterDto } from './dto/country-filter.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  private async buildSimpleCountries(query: Query): Promise<CountrySimple[]> {
    const { COUNTRIES_LMT } = process.env;

    if (!COUNTRIES_LMT) throw new Error('COUNTRIES_LMT not set');

    const countries = await this.countryModel
      .find(query)
      .select('_id name flags languages region capital population')
      .limit(+COUNTRIES_LMT);

    return countries.map((country) => {
      return {
        _id: country._id.toString(),
        name: {
          common: country.name.common,
          official: country.name.official,
        },
        flags: country.flags[0],
        languages: country.languages,
        region: country.region,
        population: country.population,
        capital: country.capital[0],
      };
    });
  }

  async findAll(filter?: CountryFilterDto): Promise<CountrySimple[]> {
    const query: Query = {};

    if (filter) {
      if (filter.region) {
        query.region = { $regex: filter.region, $options: 'i' };
      }

      if (filter.capital) {
        query.capital = { $regex: filter.capital, $options: 'i' };
      }

      if (filter.population) {
        query.population = { $regex: filter.population, $options: 'i' };
      }

      try {
        return await this.buildSimpleCountries(query);
      } catch (error) {
        const typedError = error as Error;
        throw new Error(`Countries not found: ${typedError.message}`);
      }
    }

    return [];
  }

  async findById(id: string): Promise<Country> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid id: ${id}`);

    try {
      const country = await this.countryModel.findById(id).select('-__v');

      if (!country) throw new Error(`Country not found: ${id}`);

      return country;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(typedError.message);
    }
  }
}
