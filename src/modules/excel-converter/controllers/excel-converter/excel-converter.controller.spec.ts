import { Test, TestingModule } from '@nestjs/testing';
import { ExcelConverterController } from './excel-converter.controller';

describe('ExcelConverterController', () => {
  let controller: ExcelConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcelConverterController],
    }).compile();

    controller = module.get<ExcelConverterController>(ExcelConverterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
