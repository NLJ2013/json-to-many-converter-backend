import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { utils, write, writeFile } from 'xlsx-js-style';
import { SheetData } from '../../models/sheet-data.model';
import { DEFAULT_SHEET_NAME } from 'src/constants/constant';
import { Response } from 'express';

@Injectable()
export class ExcelConverterService {

  private logger: Logger = new Logger(ExcelConverterService.name);

  async convertToExcel(
    jsonData: SheetData,
    res: Response,
  ): Promise<StreamableFile> {
    try {
      if (!jsonData?.headers || !jsonData?.headers.length) {
        throw new HttpException('Headers are required', HttpStatus.BAD_REQUEST);
      }

      if (!jsonData?.data || !jsonData?.data.length) {
        throw new HttpException(
          'Cell Data is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const headers = this.addStylesToHeaders(jsonData.headers);

      const workSheet = utils.json_to_sheet(jsonData.data);
      utils.sheet_add_aoa(workSheet, [headers], { origin: 'A1' });
      const workbook = utils.book_new();
      utils.book_append_sheet(
        workbook,
        workSheet,
        jsonData?.pageName || DEFAULT_SHEET_NAME,
      );
      writeFile(workbook, `jsonData?.sheetName ?? DEFAULT_SHEET_NAME`, {
        compression: true,
      });
      const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${jsonData?.sheetName ?? DEFAULT_SHEET_NAME}.xlsx`,
      });
      return new StreamableFile(buffer);
    } catch (e) {
      this.logger.log(e);
      throw new HttpException(
        e.message,
        e?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Adds styles to the headers of the Excel sheet.
   * @param headers - The array of header strings.
   * @returns An array of objects representing the styled headers.
   */
  private addStylesToHeaders(headers: string[]) {
    return headers.map((header) => ({
      v: header,
      t: 's',
      s: {
        font: { bold: true, sz: 14, color: { rgb: 'FF0000' } },
        fill: { fgColor: { rgb: 'E9E9E9' } },
      },
    }));
  }
}
