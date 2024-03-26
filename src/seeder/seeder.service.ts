import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../schemas/country.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async seed(): Promise<{
    status: number;
    message: string;
    data: Country[] | null;
  }> {
    const { SEED_URL } = process.env;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const countries: Country[] = require(SEED_URL as string);

    try {
      await this.countryModel.deleteMany({});
      await this.countryModel.insertMany(countries);
      return {
        status: 201,
        message: 'Countries seeded successfully.',
        data: countries,
      };
    } catch (error) {
      const typedError = error as Error;
      console.error(typedError.message);
      return {
        status: 500,
        message: 'Error seeding countries.',
        data: null,
      };
    }
  }
}
