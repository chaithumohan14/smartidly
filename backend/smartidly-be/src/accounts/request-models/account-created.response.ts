import { ApiKeyTable } from 'src/api-key/api-key.entity';
import { Account } from '../account.entity';
import { UsersTable } from 'src/users/users.entity';

export interface AccountCreatedResponse {
  account: Account;
  user: UsersTable;
  apiKey: ApiKeyTable;
}
