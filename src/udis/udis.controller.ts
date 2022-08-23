import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { UdisService } from './udis.service';
import { CreateUdiDto } from './dto/request/create-udi.dto';
import { UpdateUdiDto } from './dto/request/update-udi.dto';
import {
  BadRequestCreateUdi,
  createOkResponse,
} from './dto/response/responses-udi';
import { GetByDateParams } from './dto/request/get-udi.dto';

@ApiTags('Udi')
@Controller('udis')
export class UdisController {
  constructor(private readonly udisService: UdisService) {}

  @ApiOperation({ summary: 'Method to create an Udi' })
  @ApiOkResponse({ type: createOkResponse })
  @ApiExtraModels(BadRequestCreateUdi)
  @ApiBadRequestResponse({
    schema: {
      oneOf: [{ $ref: getSchemaPath(BadRequestCreateUdi) }],
    },
  })
  @Post()
  create(@Body() createUdiDto: CreateUdiDto) {
    return this.udisService.create(createUdiDto);
  }

  @ApiOperation({ summary: 'Method to get all Udis' })
  @Get()
  findAll() {
    return this.udisService.findAll();
  }

  @ApiOperation({ summary: 'Method to get Udis from Banxico' })
  @Get('/banxico')
  async getUdisFromBanxico() {
    return await this.udisService.getFromBanxico();
  }

  @ApiOperation({ summary: 'Method to get Udis by date' })
  @Get('/banxico/:date')
  async getUdisByDate(@Param() params: GetByDateParams) {
    return await this.udisService.getUdisByDate(params);
  }

  @ApiOperation({ summary: 'Method to get an Udi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.udisService.findOne(+id);
  }

  @ApiOperation({ summary: 'Method to update an Udi' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUdiDto: UpdateUdiDto) {
    return this.udisService.update(+id, updateUdiDto);
  }

  @ApiOperation({ summary: 'Method to delete an Udi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.udisService.remove(+id);
  }
}
