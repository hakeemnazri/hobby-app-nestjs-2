import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IdDto } from 'common/dto/id.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.usersService.findOne(idDto.id);
  }

  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(idDto.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    return this.usersService.remove(idDto.id);
  }
}
