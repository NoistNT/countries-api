import { Body, Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryFilterDto } from './dto/country-filter.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(@Body() filter?: CountryFilterDto) {
    return await this.countryService.findAll(filter);
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.countryService.findById(id);
  }
}
