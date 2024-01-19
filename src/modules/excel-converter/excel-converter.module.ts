import { Module } from '@nestjs/common';
import { ExcelConverterController } from './controllers/excel-converter/excel-converter.controller';

@Module({
  controllers: [ExcelConverterController],
})
export class ExcelConverterModule {}
