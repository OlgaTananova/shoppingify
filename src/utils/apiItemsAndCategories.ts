import { IAddItemPayload, IUpdateItemPayload } from '../types';
import { checkResponse } from './utils';
import { baseUrl } from '../constants';

export const getCategories = async () => {
  const categories = await fetch(`${baseUrl}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(categories);
};

export const getItems = async () => {
  const categories = await fetch(`${baseUrl}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(categories);
};

export const createCategory = async (category: string) => {
  const newCategory = await fetch(`${baseUrl}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category,
    }),
    credentials: 'include',
  });
  return checkResponse(newCategory);
};

export const addItem = async (values: IAddItemPayload) => {
  const addedItem = await fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
  return checkResponse(addedItem);
};

export const deleteItem = async (id: string) => {
  const deletedItem = await fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(deletedItem);
};

export const updateItem = async (values: IUpdateItemPayload) => {
  const updatedInfo = await fetch(`${baseUrl}/items/${values.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name: values.name,
      note: values.note,
      image: values.image,
      categoryId: values.categoryId,
    }),
  });
  return checkResponse(updatedInfo);
};
