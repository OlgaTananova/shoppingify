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

export interface AuthFormProps {
    children?: JSX.Element | JSX.Element[],
    name: string,
    heading: string,
    submitButtonName: string,
    linkToPagePhrase: string,
    linkToPage: string
}

export interface AuthInputProps {
    name: string,
    type: string,
    placeholder: string,
    required: boolean,
    minLength?: number,
    maxLength?: number,
    pattern?: string
    error?: string
}
