import axios, { endpoints } from 'src/utils/axios';

import { setUser, setSession, setRefreshToken } from './utils';

import type { IUser } from '../../../utils/types';

// ----------------------------------------------------------------------

export interface LoginResponse {
  auth: boolean;
  token: string | null;
  refreshtoken: string | null;
  user?: IUser;
  message?: string;
}

export type LoginParams = {
  username: string;
  password: string;
};

export type ImpersonateParams = {
  userid: number;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ username, password }: LoginParams): Promise<void> => {
  try {
    const params = { username, password };

    const res = await axios.post<LoginResponse>(endpoints.auth.login, params);

    const { token, user, refreshtoken, auth, message } = res.data;

    if (!auth) {
      throw new Error(message ?? 'Something went wrong during sign in');
    }

    if (!token) {
      throw new Error('Access token not found in response');
    }

    if (!user) {
      throw new Error('User not found in response');
    }

    if (!refreshtoken) {
      throw new Error('Refresh token not found in response');
    }

    await setSession(token);
    await setUser(user);
    await setRefreshToken(refreshtoken);
    

  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Impersonate
 *************************************** */
export const impersonate = async ({ userid }: ImpersonateParams): Promise<void> => {
  try {
    const params = { userid };

    const res = await axios.post<LoginResponse>(endpoints.auth.impersonate, params);

    const { token, user, refreshtoken, auth, message } = res.data;

    if (!auth) {
      throw new Error(message ?? 'Something went wrong during sign in');
    }

    if (!token) {
      throw new Error('Access token not found in response');
    }

    if (!user) {
      throw new Error('User not found in response');
    }

    if (!refreshtoken) {
      throw new Error('Refresh token not found in response');
    }

    await setSession(token);
    await setUser(user);
    await setRefreshToken(refreshtoken);

  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await axios.post(endpoints.auth.logout);
    await setSession(null);
    await setUser(null);
    await setRefreshToken(null);

  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
