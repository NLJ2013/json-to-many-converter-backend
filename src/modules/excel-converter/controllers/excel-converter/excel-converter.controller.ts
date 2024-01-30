import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ExcelConverterService } from '../../services/excel-converter/excel-converter.service';
import { SheetData } from '../../models/sheet-data.model';
import { Response } from 'express';

@ApiTags('Excel Converter')
@Controller('/excel-converter/v1')
export class ExcelConverterController {
  constructor(private readonly excelConverterService: ExcelConverterService) {}

  @Get('/health')
  async healthCheck() {
    return 'OK';
  }

  @Post('/')
  @ApiBody({ type: SheetData, isArray: false })
  async test(
    @Body() data: SheetData,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.excelConverterService.convertToExcel(data, res);
  }
}
