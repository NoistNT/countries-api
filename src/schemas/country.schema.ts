import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Currency, Translation, Demonyms, Car } from '@/types';

@Schema()
export class Country {
  @Prop({ type: Object })
  name!: {
    common: string;
    official: string;
    nativeName?: {
      [languageCode: string]: { official: string; common: string };
    };
  };

  @Prop()
  @IsArray()
  tld!: string[];

  @Prop()
  @IsString()
  cca2!: string;

  @Prop()
  @IsString()
  ccn3!: string;

  @Prop()
  @IsString()
  cca3!: string;

  @Prop()
  @IsString()
  cioc!: string;

  @Prop()
  @IsBoolean()
  independent!: boolean;

  @Prop()
  @IsString()
  status!: string;

  @Prop()
  @IsBoolean()
  unMember!: boolean;

  @Prop({ type: Object })
  @ValidateNested()
  currencies!: { [currencyCode: string]: Currency };

  @Prop({ type: Object })
  @IsString()
  @ValidateNested()
  idd!: { root: string; suffixes: string[] };

  @Prop()
  @IsArray()
  capital!: string[];

  @Prop()
  @IsArray()
  altSpellings!: string[];

  @Prop()
  @IsString()
  region!: string;

  @Prop()
  @IsString()
  subregion!: string;

  @Prop({ type: Object })
  @ValidateNested()
  languages!: { [languageCode: string]: string };

  @Prop({ type: Object })
  @ValidateNested()
  translations!: { [languageCode: string]: Translation };

  @Prop()
  @IsArray()
  latlng!: number[];

  @Prop()
  @IsBoolean()
  landlocked!: boolean;

  @Prop()
  @IsArray()
  borders!: string[];

  @Prop()
  @IsNumber()
  area!: number;

  @Prop({ type: Object })
  @ValidateNested()
  demonyms!: Demonyms;

  @Prop()
  @IsArray()
  flags!: string[];

  @Prop({ type: Object })
  @ValidateNested()
  maps!: { googleMaps: string; openStreetMaps: string };

  @Prop()
  @IsNumber()
  population!: number;

  @Prop({ type: Object })
  @ValidateNested()
  gini!: { [key: string]: number };

  @Prop()
  @IsString()
  fifa!: string;

  @Prop({ type: Object })
  @ValidateNested()
  car!: Car;

  @Prop()
  @IsArray()
  timezones!: string[];

  @Prop()
  @IsArray()
  continents!: string[];
}

export const CountrySchema = SchemaFactory.createForClass(Country);
