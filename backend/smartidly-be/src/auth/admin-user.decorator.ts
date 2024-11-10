import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_USER_KEY = 'isAdminUser';
export const AdminUser = () => SetMetadata(IS_ADMIN_USER_KEY, true);
