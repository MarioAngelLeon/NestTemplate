import { Test, TestingModule } from '@nestjs/testing';
import { UdisService } from './udis.service';

describe('UdisService', () => {
  let service: UdisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UdisService],
    }).compile();

    service = module.get<UdisService>(UdisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
