import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsObject, IsString, IsUrl } from 'class-validator';
import mongoose from 'mongoose';

@Schema()
export class CountrySimple {
  @Prop()
  @IsObject()
  _id!: mongoose.Types.ObjectId;

  @Prop()
  @IsString()
  name!: string;

  @Prop()
  @IsString()
  officialName!: string;

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
  @IsString()
  subregion!: string;

  @Prop()
  @IsString()
  capital!: string;
}

export const CountrySimpleSchema = SchemaFactory.createForClass(CountrySimple);
