import {checkResponse} from "./utils";
import {baseUrl} from "../constants";
import {ICreateShoppingListPayload} from "../types";

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
