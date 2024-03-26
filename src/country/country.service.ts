import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { CountrySimple } from '@/schemas/country-simple.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async findAll(): Promise<CountrySimple[]> {
    const countries = await this.countryModel.find({}).select('-__v');

    if (!countries) {
      throw new Error('Countries not found');
    }

    const simpleCountries: CountrySimple[] = countries.map((country) => {
      return {
        _id: country._id,
        name: country.name.common,
        officialName: country.name.official,
        flags: country.flags[0],
        languages: country.languages,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital[0],
      };
    });

    return simpleCountries;
  }

  async findOne(countryName: string): Promise<Country> {
    const country = await this.countryModel
      .findOne({ name: { common: countryName } })
      .select('-__v');

    if (!country) {
      throw new Error('Country not found');
    }

    return country;
  }
}
