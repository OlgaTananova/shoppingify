import {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";

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
    initialValues?: {
        name?: {
            value: string,
            required: boolean
        },
        email?: {
            value: string,
            required: boolean
        },
        password?: {
            value: string,
            required: boolean
        }
    },
    onSubmit?: FormEventHandler,
    isValid?: boolean
}


export interface AuthInputProps {
    name: string,
    type: string,
    placeholder: string,
    required: boolean,
    minLength?: number,
    maxLength?: number,
    pattern?: string
    error?: string,
    value: string,
    disabled?:boolean,
    onChange: ChangeEventHandler
}

export interface IUpdateUserProfileProps {
    isFormValid: boolean,
    onSaveClick: MouseEventHandler,
}

//User
export interface IUser {
    name: string,
    email: string,
}
export interface ICreateUserPayload extends IUser {
    password: string
}

export interface ILoginPayload {
    email: string,
    password: string
}

export interface IUpdateUserPayload extends IUser {}

export interface IUserInitialState {
    user: IUser,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined | unknown,
    isEditProfile: boolean,
    isLoggedIn: boolean
}
