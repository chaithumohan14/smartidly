import { SetMetadata } from '@nestjs/common';

export const IS_SESSION_USER_KEY = 'isSessionUser';
export const SessionUser = () => SetMetadata(IS_SESSION_USER_KEY, true);
