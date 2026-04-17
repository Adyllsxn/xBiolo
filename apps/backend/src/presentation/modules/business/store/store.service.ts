import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IStoreService } from 'src/core/interfaces/storeService.interface';
import { IStore } from 'src/core/types/store.type';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService implements IStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(): Promise<IStore> {
    const store = await this.prismaService.store.findFirst();

    if (!store) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    return store;
  }

  async update(data: UpdateStoreDto, userId: string): Promise<IStore> {
    const store = await this.prismaService.store.findFirst();

    if (!store) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    return await this.prismaService.store.update({
      where: { id: store.id },
      data: {
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email,
        address: data.address,
        primaryColor: data.primaryColor,
        updatedById: userId,
      },
    });
  }
}