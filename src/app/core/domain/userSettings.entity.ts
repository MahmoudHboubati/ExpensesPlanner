import {IGenericEntity, GenericEntity} from './generic.entity';

export interface IUserSettings extends IGenericEntity {
  createdAt: Date;
  expenses: number;
  income: number;
}

export class UserSettings implements IUserSettings {
  id: string;
  createdAt: Date;
  expenses: number;
  income: number;
  createdBy: string;
  isActive: boolean;
}
