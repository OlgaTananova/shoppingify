/*
 This component is responsible for merging the bill with the existing
 shopping list.
*/

import './UploadBillPopup.css';
import {
  ChangeEventHandler, MouseEventHandler, useEffect, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  closeUploadBillPopup, setInfoMessage, setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue,
} from '../../store/appSlice';
import {
  clearUploadedItems, mergeBill, mergeList, updateUploadedItems,
} from '../../store/shoppingSlice';
import {
  IFullShoppingItem,
  IShoppingItem,
  IUploadedShoppingItem,
  IUploadedShoppingItemErrors,
  IUploadedShoppingItemInitialState,
} from '../../types';
import useForm from '../../utils/useForm';

function UploadBillPopup() {
  const uploadedItems = useAppSelector((state) => state.shopping.uploadedItems);
  const itemsFromSL = useAppSelector((state) => state.shopping.items);
  const itemsFromItems = useAppSelector((state) => state.items.items);
  const categories = useAppSelector((state) => state.categories.categories);
  const activeShoppingList = useAppSelector((state) => state.shopping._id);
  const showUploadBillPopup = useAppSelector((state) => state.app.showUploadBillPopup);
  const [itemsFromSLWithNames, setItemsFromSLWithNames] = useState<IFullShoppingItem[]>([]);
  const [mergedSL, setMergedSL] = useState<IFullShoppingItem[]>([]);
  const [mergedBill, setMergedBill] = useState<IShoppingItem[]>([]);
  const [dateOfBill, setDateOfBill] = useState('');
  const [totalSum, setTotalSum] = useState(0);
  const dispatch = useAppDispatch();
  const editUploadedItemsForm = useForm<IUploadedShoppingItemInitialState[]>([]);
  const editSalesTaxForm = useForm({ 'sales-tax': { value: 0, required: true } });
  const [errorsForUploadedItems, setErrorsForUploadedItems] = useState<IUploadedShoppingItemErrors[]>([]);
  const [isUploadedItemsValid, setIsUploadedItemsValid] = useState(false);
  // handler to close the popup
  const handleUploadBillPopupCloseBtnClick = () => {
    dispatch(closeUploadBillPopup());
    dispatch(clearUploadedItems());
    editUploadedItemsForm.resetForm();
    editSalesTaxForm.resetForm();
    setErrorsForUploadedItems([]);
    setIsUploadedItemsValid(false);
  };

  // handler to merge the bill with the active shopping list:
  // 1. it checks if the length of the items from the shopping list is equal to the length of the items from the uploaded bill
  // 2. it checks if the items from the shopping list and the items from the uploaded bill have the same names
  // 3. it merges the items from the shopping list with the items from the uploaded bill
  // 4. it merges the shopping list with the uploaded bill
  const handleUploadBillPopupMergeBtnClick = () => {
    if (itemsFromSL && itemsFromSL.length === 0) {
      dispatch(setShowErrorTrue('Please add items to the shopping list before merging'));
    } else if (mergedSL.length === 0 || mergedSL.some((item) => item.itemId === '')) {
      dispatch(setShowErrorTrue('Please add all the items to the shopping list before merging the bill'));
    } else if (mergedSL.length !== activeShoppingList?.length) {
      dispatch(setShowErrorTrue('Please add all the items to the shopping list before merging the bill'));
    } else {
      dispatch(setIsLoadingTrue());
      dispatch(mergeBill({
        items: mergedSL, salesTax: editSalesTaxForm.values['sales-tax'].value, date: dateOfBill, _id: activeShoppingList || '',
      })).unwrap()
        .then(() => {
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
          dispatch(closeUploadBillPopup());
          setMergedSL([]);
          setDateOfBill('');
          setTotalSum(0);
          editUploadedItemsForm.resetForm();
          editSalesTaxForm.resetForm();
          setErrorsForUploadedItems([]);
          setIsUploadedItemsValid(false);
          dispatch(clearUploadedItems());
        });
    }
  };

  // function to upload the bill:
  // 1. it checks if there is no active shopping list
  // 2. it iterates over the list of uploaded items and finds the corresponding item in the store
  // 3. it creates a new array of items with the fields from the uploaded items
  // 4. it sets the merged bill to the state
  // 5. it checks if all the items have been found in the store
  // 6. it dispatches the mergeList thunk
  const handleUploadListClickButton = () => {
    if (activeShoppingList) {
      dispatch(setShowErrorTrue('You already have an active shopping list. Please use "Merge" button to merge the bill with the active shopping list'));
    } else if (mergedBill.some((item) => item.itemId === '')) {
      dispatch(setShowErrorTrue('Please add all the items to the store before merging the bill'));
    } else {
      dispatch(setIsLoadingTrue());
      dispatch(mergeList({ items: mergedBill, salesTax: editSalesTaxForm.values['sales-tax'].value, date: dateOfBill })).unwrap()
        .then((data) => {
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
          dispatch(closeUploadBillPopup());
          setMergedBill([]);
          setDateOfBill('');
          editUploadedItemsForm.resetForm();
          editSalesTaxForm.resetForm();
          setErrorsForUploadedItems([]);
          setIsUploadedItemsValid(false);
          setTotalSum(0);
          dispatch(clearUploadedItems());
        });
    }
  };

  // function to determine the total sum of the bill, sales tax and date of the bill
  // it triggers every time the uploadedItems, editUploadedItemsForm.values and editSalesTaxForm.values change
  useEffect(() => {
    const calculatedTotalSum = editUploadedItemsForm.values?.reduce((acc, item) => acc + Number(item?.itemPrice.value), 0);
    const calculatedSalesTax = Number(editSalesTaxForm.values['sales-tax'].value) || 0;
    setTotalSum(calculatedTotalSum + calculatedSalesTax);
  }, [editUploadedItemsForm.values, editSalesTaxForm.values]);

  // function to add the names of the items and categories to the current shopping list if the shopping list is not empty
  useEffect(() => {
    if (itemsFromSL && itemsFromSL?.length > 0) {
      const list = itemsFromSL?.map((item) => {
        const itemName = itemsFromItems.find((i) => i._id === item?.itemId)?.name || '';
        const itemCategoryName = categories.find((c) => c._id === item?.categoryId)?.category || '';
        return {
          ...item,
          itemName,
          itemCategoryName,
        };
      });
      // @ts-ignore
      setItemsFromSLWithNames(list);
    }
  }, [itemsFromSL, itemsFromItems, categories]);

  // function to set values to the forms
  useEffect(() => {
    uploadedItems?.forEach((item) => {
      if (item && Object.keys(item).includes('salesTax')) {
        editSalesTaxForm.setValues({ 'sales-tax': { value: Number(item.salesTax) || 0, required: true } });
        return;
      }
      if (editUploadedItemsForm.values.find((i) => i.itemName.value === item?.itemName)) return;
      editUploadedItemsForm.setValues((prev) => [...prev, {
        itemName: {
          value: item?.itemName || '',
          required: true,
        },
        itemUnits: {
          value: item?.itemUnits || '',
          required: true,
        },
        itemQuantity: {
          value: Number(item?.itemQuantity) || 0,
          required: true,
        },
        itemPrice: {
          value: Number(item?.itemPrice) || 0,
          required: true,
        },
        itemPricePerUnit: {
          value: Number(item?.itemPricePerUnit) || 0,
          required: true,
        },
      }]);
      setErrorsForUploadedItems((prev) => [...prev, {
        itemName: {
          error: '',
        },
        itemUnits: {
          error: '',
        },
        itemQuantity: {
          error: '',
        },
        itemPrice: {
          error: '',
        },
        itemPricePerUnit: {
          error: '',
        },
      }]);
    });
    const taxAndDateObject = uploadedItems?.find((item) => item && Object.keys(item).includes('dateOfPurchase'));
    setDateOfBill(() => taxAndDateObject?.dateOfPurchase || new Date().toISOString());
  }, [uploadedItems]);

  // Function to set values of the list of items to upload it to the server (without active shopping list)
  useEffect(() => {
    const items = uploadedItems?.reduce((acc: IShoppingItem[], item) => {
      if (typeof item?.salesTax === 'number') return acc;
      const itemInStore = itemsFromItems?.find((i) => {
        const whereToSearch = item?.itemName?.toLowerCase() || '';
        const wordToSearch = i?.name?.toLowerCase().trim() || '';
        const regexToSearchPluralFormWord = new RegExp(`\\b${wordToSearch}s?\\b`, 'gi');
        const regexToSearchSingularFormWord = new RegExp(`\\b${wordToSearch.slice(0, -1)}s?\\b`, 'gi');
        const match = regexToSearchPluralFormWord.test(whereToSearch) || regexToSearchSingularFormWord.test(whereToSearch);
        return match;
      });
      return [
        ...acc,
        {
          itemId: itemInStore?._id || '',
          itemName: item?.itemName || '',
          categoryId: itemInStore?.categoryId || '',
          quantity: Number(item?.itemQuantity) || 0,
          status: 'completed',
          units: item?.itemUnits || '',
          pricePerUnit: Number(item?.itemPricePerUnit) || 0,
          price: Number(item?.itemPrice) || 0,
        }];
    }, []) || [];
    setMergedBill(items);
  }, [uploadedItems, itemsFromItems]);

  // function to set the list of items to be merged with the current shopping list
  useEffect(() => {
    const items = itemsFromSLWithNames?.map((item) => {
      // @ts-ignore
      const itemInUploadedItems = uploadedItems?.find((i) => {
        const whereToSearch = i?.itemName?.toLowerCase() || '';
        const wordToSearch = item?.itemName?.toLowerCase()?.trim() || '';
        const regexToSearchPluralFormWord = new RegExp(`\\b${wordToSearch}s?\\b`, 'gi');
        const regexToSearchSingularFormWord = new RegExp(`\\b${wordToSearch.slice(0, -1)}s?\\b`, 'gi');
        const match = regexToSearchPluralFormWord.test(whereToSearch) || regexToSearchSingularFormWord.test(whereToSearch);
        return match;
      });
      return {
        itemId: item?.itemId || '',
        itemName: item?.itemName || '',
        itemCategoryName: item?.itemCategoryName || '',
        categoryId: item?.categoryId || '',
        quantity: Number(itemInUploadedItems?.itemQuantity) || 0,
        units: item?.units || '',
        status: 'completed',
        pricePerUnit: Number(itemInUploadedItems?.itemPricePerUnit) || 0,
        price: Number(itemInUploadedItems?.itemPrice) || 0,
      };
    });
    setMergedSL(items);
  }, [itemsFromSLWithNames, uploadedItems]);

  // function to identify if the form is valid or not
  useEffect(() => {
    const isValid = errorsForUploadedItems.some((item) => Object.values(item).some((value) => value.error !== ''));
    setIsUploadedItemsValid(!isValid);
  }, [errorsForUploadedItems, editUploadedItemsForm.values]);
  // function to handle the change of the input fields in the edit form
  const handleEditFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let index: string | number | null | undefined = e?.target?.parentElement?.getAttribute('data-index');
    index = index ? Number(index) : null;
    if (index !== undefined && index !== null) {
      editUploadedItemsForm.setValues((prev) => {
        const prevValues = [...prev];
        if (e.target.name === 'itemQuantity') {
          // @ts-ignore
          prevValues[index][e.target.name].value = e.target.value;
          // @ts-ignore
          prevValues[index].itemPrice.value = Number(e.target.value) * Number(prevValues[index].itemPricePerUnit.value);
          return prevValues;
        }
        if (e.target.name === 'itemPricePerUnit') {
          // @ts-ignore
          prevValues[index][e.target.name].value = e.target.value;
          // @ts-ignore
          prevValues[index].itemPrice.value = Number(e.target.value) * Number(prevValues[index].itemQuantity.value);
          return prevValues;
        }
        // @ts-ignore
        prevValues[index][e.target.name].value = e.target.value;
        return prevValues;
      });
      setErrorsForUploadedItems((prev) => {
        const prevErrors = [...prev];
        // @ts-ignore
        prevErrors[index][e.target.name].error = e.target.validationMessage;
        return prevErrors;
      });
    }
  };

  // function to handle the change of the input fields in the edit form
  const handleEditUploadedItemsClick: MouseEventHandler = (e) => {
    const updatedItems: IUploadedShoppingItem[] = editUploadedItemsForm.values.map((item) => ({
      itemName: item.itemName.value,
      itemUnits: item.itemUnits.value,
      itemQuantity: String(item.itemQuantity.value),
      itemPrice: String(item.itemPrice.value),
      itemPricePerUnit: String(item.itemPricePerUnit.value),
    }));
    updatedItems.push({
      itemName: '',
      itemUnits: '',
      itemQuantity: '',
      itemPricePerUnit: '',
      itemPrice: '',
      salesTax: String(editSalesTaxForm.values['sales-tax'].value),
      dateOfPurchase: dateOfBill,
    });
    dispatch(updateUploadedItems(updatedItems));
    dispatch(setInfoMessage(true));
    dispatch(setShowErrorTrue('Bill updated successfully!'));
  };

  return (
    <div className={`upload-bill-popup ${!showUploadBillPopup && 'upload-bill-popup_inactive'}`}>
      <div className="upload-bill-popup__inner-container">
        <button
          type="button"
          onClick={handleUploadBillPopupCloseBtnClick}
          className="upload-bill-popup__close-btn"
        >
          {}
        </button>
        <h2 className="upload-bill-popup__heading">Uploaded Items</h2>
        <form className="upload-bill-popup__list" noValidate name="upload-bill-popup-form">
          <ul className="upload-bill-popup__list-header">
            <li className="upload-bill-popup__item-name">Item Name</li>
            <li className="upload-bill-popup__item-small-cell">Units</li>
            <li className="upload-bill-popup__item-small-cell">Qty</li>
            <li className="upload-bill-popup__item-small-cell">Price per unit</li>
            <li className="upload-bill-popup__item-small-cell">Total</li>
          </ul>
          {editUploadedItemsForm.values.map((item, index) => (
            <li
              key={index}
              data-index={index}
              className={`${mergedBill.find((i) => i?.itemName === item?.itemName.value)?.itemId ? '' : 'upload-bill-popup__list-item_notfound'} upload-bill-popup__list-item`}
            >
              <input required minLength={2} name="itemName" value={item.itemName.value} onChange={handleEditFormChange} className="upload-bill-popup__item-name upload-bill-popup__item-input" />
              {errorsForUploadedItems[index].itemName.error && <span className="upload-bill-popup__item-error">{errorsForUploadedItems[index].itemName.error}</span>}
              <input minLength={1} required name="itemUnits" value={item.itemUnits.value} onChange={handleEditFormChange} className="upload-bill-popup__item-small-cell upload-bill-popup__item-input upload-bill-popup__item-small-cell_units" />
              {errorsForUploadedItems[index].itemUnits.error && <span className="upload-bill-popup__item-error">{errorsForUploadedItems[index].itemUnits.error}</span>}
              <input required type="number" name="itemQuantity" value={item.itemQuantity.value} onChange={handleEditFormChange} className="upload-bill-popup__item-small-cell upload-bill-popup__item-input upload-bill-popup__item-small-cell_quantity" />
              {errorsForUploadedItems[index].itemQuantity.error && <span className="upload-bill-popup__item-error">{errorsForUploadedItems[index].itemQuantity.error}</span>}
              <input required type="number" name="itemPricePerUnit" value={item.itemPricePerUnit.value} onChange={handleEditFormChange} className="upload-bill-popup__item-small-cell upload-bill-popup__item-input upload-bill-popup__item-small-cell_pricePerUnit" />
              {errorsForUploadedItems[index].itemPricePerUnit.error && <span className="upload-bill-popup__item-error">{errorsForUploadedItems[index].itemPricePerUnit.error}</span>}
              <input required type="number" name="itemPrice" value={item.itemPrice.value} onChange={handleEditFormChange} className="upload-bill-popup__item-small-cell  upload-bill-popup__item-input upload-bill-popup__item-small-cell_price" />
              {errorsForUploadedItems[index].itemPrice.error && <span className="upload-bill-popup__item-error">{errorsForUploadedItems[index].itemPrice.error}</span>}
            </li>
          ))}
          <li className="upload-bill-popup__list-footer">
            <div className="upload-bill-popup__list-footer-section">
              <div className="upload-bill-popup__item-name">Sales Tax</div>
              <input type="number" name="sales-tax" value={editSalesTaxForm.values['sales-tax'].value} onChange={editSalesTaxForm.handleChange} className="upload-bill-popup__item-small-cell upload-bill-popup__item-input" />
            </div>
            <div className="upload-bill-popup__list-footer-section">
              <div className="upload-bill-popup__item-name">Total</div>
              <div className="upload-bill-popup__item-small-cell">{totalSum?.toFixed(2)}</div>
            </div>
          </li>
        </form>

        <div className="upload-bill-popup__actions-section">
          <button
            className={`${!isUploadedItemsValid && 'upload-bill-popup__action-btn_disabled'} upload-bill-popup__action-btn upload-bill-popup__action-btn_change`}
            type="button"
            disabled={!isUploadedItemsValid}
            onClick={handleEditUploadedItemsClick}
          >
            Change List
          </button>
          <button
            disabled={uploadedItems?.length === 0 || !isUploadedItemsValid}
            type="button"
            onClick={handleUploadBillPopupMergeBtnClick}
            className={`${(!isUploadedItemsValid || uploadedItems?.length === 0) && 'upload-bill-popup__action-btn_disabled'} upload-bill-popup__action-btn upload-bill-popup__action-btn_merge`}
          >
            Merge
            List
          </button>

          <button
            type="button"
            disabled={uploadedItems?.length === 0 || !isUploadedItemsValid}
            onClick={handleUploadListClickButton}
            className={`${(!isUploadedItemsValid || uploadedItems?.length === 0) && 'upload-bill-popup__action-btn_disabled'} upload-bill-popup__action-btn upload-bill-popup__action-btn_upload-list`}
          >
            Upload
            list
          </button>
          <button
            type="button"
            onClick={handleUploadBillPopupCloseBtnClick}
            className="upload-bill-popup__action-btn upload-bill-popup__action-btn_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBillPopup;
