import {
  ChangeEventHandler,
  CSSProperties,
  FormEventHandler,
  MouseEventHandler,
} from 'react';

// Shopping List

export interface IShoppingItem {
  categoryId: string;
  itemId: string;
  itemName?: string;
  quantity: number;
  status: 'completed' | 'pending' | string;
  units?: string;
  pricePerUnit?: number;
  price?: number;
  _id: string;
}

export interface IUploadedShoppingItem {
  itemName: string;
  itemQuantity: string;
  itemUnits: string;
  itemPricePerUnit: string;
  itemPrice: string;
  databaseItemName: string;
}

export interface IUploadedBill{
  salesTax: number;
  dateOfPurchase: string;
  items: [IUploadedShoppingItem?]
}

export interface IUploadedShoppingItemInitialState {
  itemName: {
    value: string;
    required: boolean;
  };
  itemQuantity: {
    value: number;
    required: boolean;
  };
  itemUnits: {
    value: string;
    required: boolean;
  };
  itemPricePerUnit: {
    value: number;
    required: boolean;
  };
  itemPrice: {
    value: number;
    required: boolean;
  };
  databaseItemName: {
    value: string;
    required: boolean;
  }
}

export interface IUploadedShoppingItemErrors {
  itemName: {
    error: string;
  };
  itemQuantity: {
    error: string;
  };
  itemUnits: {
    error: string;
  };
  itemPricePerUnit: {
    error: string;
  };
  itemPrice: {
    error: string;
  };
  databaseItemName: {
    error: string;
  }
}
export interface IFullShoppingItem extends IShoppingItem {
  itemName?: string;
  itemCategoryName?: string;
}

export interface IMergeListPayload {
  items: IFullShoppingItem[];
  salesTax: number;
  date: string;
  _id?: string;
}

export interface IUploadListItemPayload {
  categoryId: string;
  itemId: string;
  itemName?: string;
  quantity: number;
  status: 'completed' | 'pending' | string;
  units: string;
  pricePerUnit?: number;
  price?: number;
}

export interface IUploadListPayload {
  items: IUploadListItemPayload[];
  salesTax: number;
  date: string;
}

export interface IShoppingCategory {
  [key: string]: [IShoppingItem?];
}

export interface IShoppingList {
  heading: string;
  date: string;
  owner: string;
  items?: [IShoppingItem?];
  status: 'completed' | 'cancelled' | 'active' | 'idle';
  _id?: string;
  salesTax?: number;
}

export interface IShoppingListInitialState extends IShoppingList {
  isAddItemFormOpened: boolean;
  isEditShoppingList: boolean;
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  isUploadBillFormOpened?: boolean;
  error: string | unknown | null;
  uploadedBill: IUploadedBill;
}

export interface IShoppingListsInitialState {
  shoppingLists: IShoppingList[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | unknown | null;
}

export interface IShoppingListByDate {
  [key: string]: IShoppingList[];
}

export interface ICreateShoppingListPayload {
  categoryId: string;
  itemId: string;
}

export interface IAddItemToShoppingListPayload {
  categoryId: string;
  itemId: string;
  quantity?: string;
  status?: 'completed' | 'pending';
  shoppingListId: string;
}

export interface IDeleteItemFromShoppingListPayload {
  shoppingListItemId: string;
  shoppingListId: string;
}

export interface IUpdateItemQtyInShoppingList
  extends IDeleteItemFromShoppingListPayload {
  quantity: number;
}

export interface IUpdateItemStatusInShoppingList
  extends IDeleteItemFromShoppingListPayload {
  status: 'pending' | 'completed';
}

export interface IUpdateItemUnitsInShoppingList
  extends IDeleteItemFromShoppingListPayload {
  units: string;
}

export interface IUpdateItemPricePerUnitInShoppingList
  extends IDeleteItemFromShoppingListPayload {
  pricePerUnit: number;
}

export interface IUpdateItemPriceInShoppingList extends  IDeleteItemFromShoppingListPayload {
  price: number
}

export interface IUpdateSLHeadingPayload {
  shoppingListId: string;
  heading: string;
}

export interface IUpdateSLStatusPayload {
  shoppingListId: string | undefined;
  status: 'completed' | 'cancelled';
}

export interface IUpdateSalesTaxPayload {
  shoppingListId: string | undefined;
  salesTax: number;
}

export interface IItem {
  _id: string;
  name: string;
  note: string;
  image: string;
  categoryId: string;
  isDeleted: boolean;
}

export interface IItemInitialState {
  items: IItem[];
  isEditItem: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined | unknown;
}

export interface IAddItemPayload {
  name: string;
  note?: string;
  image?: string;
  categoryId: string;
}

export interface IUpdateItemPayload extends IAddItemPayload {
  id: string;
}

export interface ICategory {
  category: string;
  _id: string;
  items: string[];
}

export interface ICategoryInitialState {
  categories: ICategory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined | unknown;
}

export interface AuthFormProps {
  children?: JSX.Element | JSX.Element[];
  name: string;
  heading: string;
  submitButtonName: string;
  linkToPagePhrase: string;
  linkToPageButton: string;
  linkToPage: string;
  initialValues?: {
    name?: {
      value: string;
      required: boolean;
    };
    email?: {
      value: string;
      required: boolean;
    };
    password?: {
      value: string;
      required: boolean;
    };
  };
  onSubmit?: FormEventHandler;
  isValid?: boolean;
}

export interface AuthInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  error?: string;
  value: string;
  disabled?: boolean;
  onChange: ChangeEventHandler;
}

export interface IUpdateUserProfileProps {
  isFormValid: boolean;
  onSaveClick: MouseEventHandler;
}

// User
export interface IUser {
  name: string;
  email: string;
}
export interface ICreateUserPayload extends IUser {
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUpdateUserPayload extends IUser {}

export interface IUserInitialState {
  user: IUser;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined | unknown;
  isEditProfile: boolean;
  isLoggedIn: boolean;
}

export interface IAppSliceInitialState {
  isLoading: boolean;
  showError: boolean;
  showCancelSL: boolean;
  isUserChecked: boolean;
  showMobileSL: boolean;
  error: string | null;
  appStatus: 'idle' | 'notIdle';
  scroll: number;
  logoHeight: number;
  innerHeight: string | number;
  showUploadBillPopup: boolean;
  infoMessage?: boolean;
  isToDeleteSL?: boolean;
}

// Statistics

export interface ISortedItems {
  [key: string]: {
    name: string;
    price: number;
    share: number;
  };
}

export interface IExpensesByMonth {
  [key: string]: {
    date: string;
    categories: IExpensesByCategory;
    salesTax: number;
    total: number;
  };
}

export interface IExpensesByYear extends IExpensesByMonth {}

export interface IExpensesByCategory {
  [key: string]: {
    categoryName: string;
    total: number;
    items?: IExpensesByItem;
  };
}

export interface IExpensesBySingleCategory {
  categoryName: string;
  total: number;
  items?: IExpensesByItem;
}

export interface IExpensesByItem {
  [key: string]: {
    itemName: string;
    total: number;
  };
}

export interface MyCustomCSS extends CSSProperties {
  height: number | string;
}
