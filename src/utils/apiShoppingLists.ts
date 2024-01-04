import { checkResponse } from './utils';
import { baseUrl } from '../constants';
import {
  IAddItemToShoppingListPayload,
  ICreateShoppingListPayload,
  IDeleteItemFromShoppingListPayload,
  IFullShoppingItem,
  IMergeBillPayload,
  IMergeListPayload,
  IShoppingItem,
  IUpdateItemPricePerUnitInShoppingList,
  IUpdateItemQtyInShoppingList,
  IUpdateItemStatusInShoppingList,
  IUpdateItemUnitsInShoppingList,
  IUpdateSalesTaxPayload,
  IUpdateSLHeadingPayload,
  IUpdateSLStatusPayload,
  IUploadedShoppingItem,
} from '../types';

export const getShoppingLists = async () => {
  const shoppingLists = await fetch(`${baseUrl}/ShoppingLists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(shoppingLists);
};

export const createShoppingList = async (
  values: ICreateShoppingListPayload,
) => {
  const newShoppingList = await fetch(`${baseUrl}/ShoppingLists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(newShoppingList);
};

export const addItemToShoppingList = async (
  values: IAddItemToShoppingListPayload,
) => {
  const updatedShoppingList = await fetch(`${baseUrl}/ShoppingLists`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(updatedShoppingList);
};

export const deleteItemFromShoppingList = async (
  values: IDeleteItemFromShoppingListPayload,
) => {
  const updatedShoppingList = await fetch(`${baseUrl}/ShoppingLists`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(updatedShoppingList);
};

export const updateItemQtyInShoppingList = async (
  values: IUpdateItemQtyInShoppingList,
) => {
  const updatedShoppingList = await fetch(`${baseUrl}/ShoppingLists/updqty`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(updatedShoppingList);
};

export const updateItemStatusInShoppingList = async (
  values: IUpdateItemStatusInShoppingList,
) => {
  const updatedShoppingList = await fetch(
    `${baseUrl}/ShoppingLists/updstatus`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    },
  );
  return checkResponse(updatedShoppingList);
};

export const updateShoppingListHeading = async (
  values: IUpdateSLHeadingPayload,
) => {
  const updatedShoppingList = await fetch(
    `${baseUrl}/ShoppingLists/updheading`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    },
  );
  return checkResponse(updatedShoppingList);
};

export const updateShoppingListStatus = async (
  values: IUpdateSLStatusPayload,
) => {
  const updatedShoppingList = await fetch(
    `${baseUrl}/ShoppingLists/updslstatus`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    },
  );
  return checkResponse(updatedShoppingList);
};

export const uploadBillAndGetShoppingList = async (values: FormData) => {
  const shoppingList = await fetch(`${baseUrl}/upload-bill`, {
    method: 'POST',
    credentials: 'include',
    body: values,
  });
  return checkResponse(shoppingList);
};

export const mergeShoppingLists = async (values: IMergeBillPayload) => {
  const mergedShoppingList = await fetch(`${baseUrl}/merge-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(values),
  });
  return checkResponse(mergedShoppingList);
};

export const uploadShoppingList = async (values: IMergeListPayload) => {
  const shoppingList = await fetch(`${baseUrl}/upload-list`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  return checkResponse(shoppingList);
};

export const deleteShoppingList = async (values: { id: string }) => {
  const shoppingList = await fetch(`${baseUrl}/ShoppingLists/${values.id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
  return checkResponse(shoppingList);
};

export const updateItemUnitsInShoppingList = async (
  values: IUpdateItemUnitsInShoppingList,
) => {
  const updatedShoppingList = await fetch(
    `${baseUrl}/ShoppingLists/updItemUnits`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    },
  );
  return checkResponse(updatedShoppingList);
};

export const updateItemPricePerUnitInShoppingList = async (
  values: IUpdateItemPricePerUnitInShoppingList,
) => {
  const updatedShoppingList = await fetch(
    `${baseUrl}/ShoppingLists/updItemPrice`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    },
  );
  return checkResponse(updatedShoppingList);
};

export const updateSalesTaxInShoppingList = async (
  values: IUpdateSalesTaxPayload,
) => {
  const updatedShoppingList = await fetch(
    `${baseUrl}/ShoppingLists/updSalesTax`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    },
  );

  return checkResponse(updatedShoppingList);
};
