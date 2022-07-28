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
    date: string,
    owner: string,
    categories: IShoppingCategory[],
    status: string
}

export interface IShoppingListByDate {
    [key: string]: IShoppingList[]
}

export interface IItem {
    _id: string,
   name: string,
   note: string,
   image: string,
    categoryId: string
}

export interface IItemInitialState {
    items: IItem[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined | unknown
}

export interface IAddItemPayload {
    name: string,
    note?: string,
    image?: string,
    categoryId: string
}


export interface ICategory {
    category: string,
    _id: string,
    items: string[]
}

export interface ICategoryInitialState {
    categories: ICategory[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined | unknown
}

export interface IAddItemToCategoryPayload {
    _id: string,
    categoryId: string
}

export interface IDeleteItemFromCategoryPayload extends IAddItemToCategoryPayload {

}

export interface AuthFormProps {
    children?: JSX.Element | JSX.Element[],
    name: string,
    heading: string,
    submitButtonName: string,
    linkToPagePhrase: string,
    linkToPageButton: string,
    linkToPage: string,

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
