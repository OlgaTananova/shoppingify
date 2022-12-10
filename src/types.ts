import {
  ChangeEventHandler, CSSProperties, FormEventHandler, MouseEventHandler,
} from 'react';

// Shopping List

export interface IShoppingItem {
  categoryId: string,
  itemId: string,
  quantity: number,
  status: 'completed' | 'pending',
}

export interface IShoppingCategory {
  [key: string]: [IShoppingItem?],
}

export interface IShoppingList {
  heading: string,
  date: string,
  owner: string,
  items?: [IShoppingItem?],
  status: 'completed' | 'cancelled' | 'active' | 'idle',
  _id?: string,
}

export interface IShoppingListInitialState extends IShoppingList {
  isAddItemFormOpened: boolean,
  isEditShoppingList: boolean,
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | unknown | null
}

export interface IShoppingListsInitialState {
  shoppingLists: IShoppingList[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | unknown | null
}

export interface IShoppingListByDate {
  [key: string]: IShoppingList[]
}

export interface ICreateShoppingListPayload {
  categoryId: string,
  itemId: string,
}

export interface IAddItemToShoppingListPayload {
  categoryId: string | undefined
  itemId: string | undefined
  quantity?: string,
  status?: 'completed' | 'pending',
  shoppingListId: string | undefined
}

export interface IDeleteItemFromShoppingListPayload {
  itemId: string | undefined
  shoppingListId: string | undefined
}

export interface IUpdateItemQtyInShoppingList extends IDeleteItemFromShoppingListPayload {
  quantity: number,
}

export interface IUpdateItemStatusInShoppingList extends IDeleteItemFromShoppingListPayload {
  status: 'pending' | 'completed'
}

export interface IUpdateSLHeadingPayload {
  shoppingListId: string | undefined
  heading: string,
}

export interface IUpdateSLStatusPayload {
  shoppingListId: string | undefined,
  status: 'completed' | 'cancelled'
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

// User
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

export interface IAppSliceInitialState {
  isLoading: boolean,
  showError: boolean,
  showCancelSL: boolean,
  isUserChecked: boolean,
  showMobileSL: boolean,
  error: string | null,
  appStatus: 'idle' | 'notIdle',
  scroll: number,
  logoHeight: number,
  innerHeight: string | number
}

// Statistics

export interface ISortedItems {
  [key: string]: {
    name: string,
    quantity: number,
    share: number,
  }
}

export interface ISorderItemsByDate {
  [key: string]: {
    date: string,
    quantity: number
  }
}

export interface MyCustomCSS extends CSSProperties {
  'height': number | string
}
