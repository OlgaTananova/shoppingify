import {checkResponse} from "./utils";
import {baseUrl} from "../constants";
import {IAddItemToShoppingListPayload, ICreateShoppingListPayload, IDeleteItemFromShoppingListPayload} from "../types";

export const getShoppingLists = async () => {
   const shoppingLists = await fetch(`${baseUrl}/shoppinglists`, {
        method: 'GET',
       headers: {
           "Content-Type": "application/json"
       },
       credentials: 'include',
   });
    return checkResponse(shoppingLists);
}

export const createShoppingList = async (values: ICreateShoppingListPayload)=> {
    const newShoppingList = await fetch(`${baseUrl}/shoppinglists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(values),
    })
    return checkResponse(newShoppingList);
}

export const addItemToShoppingList = async (values: IAddItemToShoppingListPayload) => {
    const updatedShoppingList = await fetch(`${baseUrl}/shoppinglists`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(values),
    });
    return checkResponse(updatedShoppingList)
}

export const deleteItemFromShoppingList = async (values: IDeleteItemFromShoppingListPayload) => {
    const updatedShoppingList = await fetch(`${baseUrl}/shoppinglists`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(values),
    });
    return checkResponse(updatedShoppingList);
}


