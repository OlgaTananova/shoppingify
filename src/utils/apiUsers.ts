import { baseUrl } from '../constants';
import { checkResponse } from './utils';
import {
  ICreateUserPayload,
  ILoginPayload,
  IUpdateUserPayload,
} from '../types';

export const createUser = async (values: ICreateUserPayload) => {
  const newUser = await fetch(`${baseUrl}/Auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(newUser);
};

export const login = async (values: ILoginPayload) => {
  const authorized = await fetch(`${baseUrl}/Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(authorized);
};

export const verifyUser = async () => {
  const user = await fetch(`${baseUrl}/Auth/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(user);
};

export const logout = async () => {
  const response = await fetch(`${baseUrl}/Auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(response);
};

export const updateUser = async (values: IUpdateUserPayload) => {
  const updatedUser = await fetch(`${baseUrl}/Auth/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(updatedUser);
};
