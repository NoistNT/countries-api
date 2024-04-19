import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsObject, IsString, IsUrl } from 'class-validator';

@Schema()
export class CountrySimple {
  @Prop()
  @IsString()
  _id!: string;

  @Prop({ type: Object })
  @IsObject()
  name!: { common: string; official: string };

  @Prop()
  @IsUrl()
  @IsString()
  flags!: string;

  @Prop({ type: Object })
  @IsObject()
  languages!: { [languageCode: string]: string };

  @Prop()
  @IsString()
  region!: string;

  @Prop()
  @IsNumber()
  population!: number;

  @Prop()
  @IsString()
  capital!: string;
}

export const CountrySimpleSchema = SchemaFactory.createForClass(CountrySimple);
