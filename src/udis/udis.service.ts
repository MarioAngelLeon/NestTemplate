import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { customAxios } from 'src/common/axios/axiosInterceptor';
import { CreateUdiDto } from './dto/request/create-udi.dto';
import { UpdateUdiDto } from './dto/request/update-udi.dto';
import { UdiEntity } from './entities/udi.entity';
import { GetByDateParams } from './dto/request/get-udi.dto';

@Injectable()
export class UdisService {
  constructor(
    @InjectRepository(UdiEntity)
    private readonly udiRepository: Repository<UdiEntity>,
  ) {}

  async create(createUdiDto: CreateUdiDto) {
    const dataUdi = {
      value: createUdiDto?.value,
      currentDate: new Date(createUdiDto?.currentDate),
    };

    const newUdi = this.udiRepository.create(dataUdi);
    return await this.udiRepository.save(newUdi);
  }

  async findAll() {
    const udis = await this.udiRepository
      .createQueryBuilder('udi')
      .where('udi.is_active = :active', { active: true })
      .getRawMany();

    return udis;
  }

  async findOne(id: number) {
    const udi = await this.udiRepository
      .createQueryBuilder('udi')
      .where('udi.id = :udiId', { udiId: id })
      .getOne();

    if (!udi) {
      throw new NotFoundException('Udi is not found');
    }

    return udi;
  }

  async update(id: number, updateUdiDto: UpdateUdiDto) {
    const udi = await this.udiRepository.findOne({ where: { id } });
    if (!udi) {
      throw new NotFoundException('Udi is not found');
    }

    let updatedUdi = Object.assign(udi, updateUdiDto);
    return await this.udiRepository.save(updatedUdi);
  }

  async remove(id: number) {
    const udi = await this.udiRepository.findOne({ where: { id } });
    if (!udi) {
      throw new NotFoundException('Udi is not found');
    }

    let deletedUdi = Object.assign(udi, { isActive: false });
    return await this.udiRepository.save(deletedUdi);
  }

  async getFromBanxico() {
    const resp = await customAxios.get(
      'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP68257/datos/2022-08-01/2022-08-30',
      {
        headers: {
          'Bmx-Token':
            'cdd45065175b050725f7bd8b0ee3744144741b851a25f335d4461e9da47c29f6',
        },
      },
    );

    return resp;
  }

  async getUdisByDate(params: GetByDateParams) {
    try {
      let resp = await this.udiRepository
        .createQueryBuilder('udi')
        .where('udi.is_active = :active', { active: true })
        .andWhere('udi.current_date = :date', { date: params?.date })
        .getOne();

      if (!resp) {
        resp = await this.udiRepository
          .createQueryBuilder('udi')
          .where('udi.is_active = :active', { active: true })
          .orderBy('udi.current_date', 'DESC')
          .getOne();
      }

      if (!resp) {
        throw new NotFoundException('Aun no hay información cargada');
      }

      return {
        id: resp?.id,
        value: resp?.value,
        date: resp?.currentDate,
      };
    } catch (error) {
      throw new InternalServerErrorException(error?.message || error);
    }
  }
}
