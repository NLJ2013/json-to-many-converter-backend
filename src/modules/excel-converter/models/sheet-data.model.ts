import { ApiProperty } from "@nestjs/swagger";

export class SheetData {
  @ApiProperty()
  sheetName: string;
  @ApiProperty()
  headers: string[];
  @ApiProperty()
  pageName: string;
  @ApiProperty()
  data: any;
}
