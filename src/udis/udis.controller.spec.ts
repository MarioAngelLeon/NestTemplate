import { Test, TestingModule } from '@nestjs/testing';
import { UdisController } from './udis.controller';
import { UdisService } from './udis.service';

describe('UdisController', () => {
  let controller: UdisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UdisController],
      providers: [UdisService],
    }).compile();

    controller = module.get<UdisController>(UdisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
