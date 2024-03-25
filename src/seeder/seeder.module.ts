import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederSchema } from '@/schemas/seeder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seeder', schema: SeederSchema }]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
