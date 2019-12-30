import { Nullable } from '../../core';

export interface IUser {
  id: string;
  auth_provider: string;
  email: Nullable<string>;
  name: Nullable<string>;
  photo_url: Nullable<string>;
  program_id: Nullable<string>;
  specialization_id: Nullable<string>;
  last_signed_in: Nullable<number>;
}
