import { Module } from '@nestjs/common';
import { ExcelConverterModule } from './modules/excel-converter/excel-converter.module';

@Module({
  imports: [ExcelConverterModule],
})
export class AppModule {}
