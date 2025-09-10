import { IUser } from '../utils/types';

export type AuthState = {
  user: IUser | null;
  loading: boolean;
};

export type AuthContextValue = {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
