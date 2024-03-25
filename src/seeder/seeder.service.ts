import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from '../schemas/seeder.schema';
import { Country } from 'types';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel('Seeder') private readonly seederModel: Model<Seeder>,
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
      await this.seederModel.deleteMany({});
      await this.seederModel.insertMany(countries);
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
