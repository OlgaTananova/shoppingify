import {IAddItemToCategoryPayload, IAddItemPayload, IDeleteItemFromCategoryPayload} from '../types';

const baseUrl: string = 'http://localhost:3000';


const checkResponse = ((response:any) => {
    if (response.ok) {
        return response.json();
    }
    return response.text().then((text:any) => {
        const error = JSON.parse(text)
        throw new Error(error.message)
    })
})

export const getCategories = async () => {
    let categories;
    try {
        categories = await fetch(`${baseUrl}/categories`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        return checkResponse(categories);
    } catch (err) {
        console.log(err);
    }
}

export const getItems = async () => {
    let categories;
    try {
        categories = await fetch(`${baseUrl}/items`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        return checkResponse(categories);
    } catch (err) {
        console.log(err);
    }
}

export const createCategory = async (category:string) => {
    let newCategory;
    try {
        newCategory = await fetch(`${baseUrl}/categories`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: category
            }),
            credentials: 'include'
        });
       return checkResponse(newCategory);
    } catch (err) {
        console.log(err);
    }
}

export const addItemToCategory = async (initialValue: IAddItemToCategoryPayload) => {
    let addedItem;
    try {
        addedItem = await fetch(`${baseUrl}/categories/items`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(initialValue),
            credentials: 'include'
        });
        return checkResponse(addedItem);
    } catch(err) {
        console.log(err);
    }
}

export const addItem = async (values: IAddItemPayload) => {
    let addedItem;
    try {
        addedItem = await fetch(`${baseUrl}/items`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
            credentials: 'include'
        });
        return checkResponse(addedItem)
    } catch(err) {
        console.log(err);
    }
}

export const deleteItem = async (id: string) => {
    let deletedItem;
    try {
        deletedItem = await fetch(`${baseUrl}/items/${id}`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'include'
        });
        return checkResponse(deletedItem);
    } catch (err) {
        console.log(err);
    }
}

export const deleteItemFromCategory = async (values: IDeleteItemFromCategoryPayload) => {
    let updatedCategory;
    try {
        updatedCategory = await fetch(`${baseUrl}/categories/items`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })
        return checkResponse(updatedCategory);
    } catch (err) {
        console.log(err);
    }
}
