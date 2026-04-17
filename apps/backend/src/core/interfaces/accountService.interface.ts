import { IAccount } from '../types/account.type';
import { CreateAccountDto } from 'src/presentation/modules/identity/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/presentation/modules/identity/account/dto/update-account.dto';
import { PaginationDto } from 'src/core/pagination/pagination.dto';

export interface IAccountService {
  // Queries
  findAll(paginationDto: PaginationDto): Promise<{
    data: IAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findOne(id: string): Promise<IAccount>;
  findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findMe(userId: string): Promise<IAccount>;

  // Commands
  create(
    createAccountDto: CreateAccountDto,
    createdById: string,
  ): Promise<IAccount>;
  update(
    id: string,
    updateAccountDto: UpdateAccountDto,
    updatedById: string,
  ): Promise<IAccount>;
  remove(
    id: string,
    updatedById: string,
  ): Promise<{ message: string; account: IAccount }>;
  restore(
    id: string,
    updatedById: string,
  ): Promise<{ message: string; account: IAccount }>;
}
