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
export interface ICategory {
    name: string,
    items: [string, number][]
}
export interface IShoppingList {
    id: string | number,
    heading: string,
    date: Date,
    owner: string,
    categories: ICategory[],
    status: string
}
