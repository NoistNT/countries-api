import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from '@/schemas/country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
