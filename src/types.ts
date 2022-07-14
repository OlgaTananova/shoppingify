export interface IEditProfile {
    isEditProfile: boolean
}

export interface IItemInfo {
    isItemInfoOpen: boolean
}

export interface IShopping {
    isAddItemFormOpened: boolean,
    isEditShoppingList: boolean,
    isShoppingListEmpty: boolean,
}
export interface IShoppingCategory {
    name: string,
    items: [string, number][]
}
export interface IShoppingList {
    id: string,
    heading: string,
    date: Date,
    owner: string,
    categories: IShoppingCategory[],
    status: string
}

export interface IShoppingListByDate {
    [key: string]: IShoppingList[]
}

export interface IItem {
    itemId: string,
   name: string,
   note: string,
   image: string,
    categoryId: string
}

export interface ICategory {
    category: string,
    categoryId: string,
    items: IItem[]
}


