import { IStore } from '../types/store.type';
import { UpdateStoreDto } from 'src/presentation/modules/business/store/dto/update-store.dto';

export interface IStoreService {
  // Queries
  findOne(): Promise<IStore>;
  // Commands
  update(data: UpdateStoreDto): Promise<IStore>;
}
