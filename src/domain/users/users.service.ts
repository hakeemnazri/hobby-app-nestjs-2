import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'common/utils/common.constants';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.prisma.user.findMany({
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE.USERS,
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
