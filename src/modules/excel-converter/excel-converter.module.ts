import { Module } from '@nestjs/common';
import { ExcelConverterController } from './controllers/excel-converter/excel-converter.controller';
import { ExcelConverterService } from './services/excel-converter/excel-converter.service';

@Module({
  controllers: [ExcelConverterController],
  providers: [ExcelConverterService],
})
export class ExcelConverterModule {}
