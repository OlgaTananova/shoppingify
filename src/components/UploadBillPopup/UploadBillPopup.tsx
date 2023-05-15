/*
 This component is responsible for merging the bill with the existing
 shopping list.
*/

import './UploadBillPopup.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  closeUploadBillPopup, setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue,
} from '../../store/appSlice';
import { clearUploadedItems, mergeBill, mergeList } from '../../store/shoppingSlice';
import { IFullShoppingItem, IShoppingItem } from '../../types';

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
  const [salesTax, setSalesTax] = useState(0);
  const [dateOfBill, setDateOfBill] = useState('');
  const [totalSum, setTotalSum] = useState(0);
  const dispatch = useAppDispatch();

  // handler to close the popup
  const handleUploadBillPopupCloseBtnClick = () => {
    dispatch(closeUploadBillPopup());
    dispatch(clearUploadedItems());
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
    } else {
      dispatch(setIsLoadingTrue());
      dispatch(mergeBill({
        items: mergedSL, salesTax, date: dateOfBill, _id: activeShoppingList || '',
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
          setSalesTax(0);
          setDateOfBill('');
          setTotalSum(0);
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
      dispatch(mergeList({ items: mergedBill, salesTax, date: dateOfBill })).unwrap()
        .then((data) => {
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
          dispatch(closeUploadBillPopup());
          setMergedBill([]);
          setSalesTax(0);
          setDateOfBill('');
          setTotalSum(0);
          dispatch(clearUploadedItems());
        });
    }
  };

  // function to determine the total sum of the bill, sales tax and date of the bill
  // it triggers every time the uploadedItems array changes
  useEffect(() => {
    const taxAndDateObject = uploadedItems?.find((item) => item && Object.keys(item).includes('salesTax'));
    setSalesTax(() => Number(taxAndDateObject?.salesTax) || 0);
    setDateOfBill(() => taxAndDateObject?.dateOfPurchase || new Date().toISOString());
    setTotalSum(() => uploadedItems?.reduce((acc, item) => acc + (Number(item?.itemPrice) || Number(item?.salesTax)), 0) || 0);
  }, [uploadedItems]);

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

  // function to merge the active shopping list with the uploaded bill
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
        <ul className="upload-bill-popup__list">
          <ul className="upload-bill-popup__list-header">
            <li className="upload-bill-popup__item-name">Item Name</li>
            <li className="upload-bill-popup__item-small-cell">Units</li>
            <li className="upload-bill-popup__item-small-cell">Qty</li>
            <li className="upload-bill-popup__item-small-cell">Price per unit</li>
            <li className="upload-bill-popup__item-small-cell">Total</li>
          </ul>
          {uploadedItems?.map((item, index) => (
            <li
              key={index}
              className="upload-bill-popup__list-item"
            >
              <div className="upload-bill-popup__item-name">{item?.itemName || ''}</div>
              <div className="upload-bill-popup__item-small-cell upload-bill-popup__item-small-cell_units">{item?.itemUnits || ''}</div>
              <div className="upload-bill-popup__item-small-cell upload-bill-popup__item-small-cell_quantity">{item?.itemQuantity || ''}</div>
              <div className="upload-bill-popup__item-small-cell upload-bill-popup__item-small-cell_pricePerUnit">{item?.itemPricePerUnit || ''}</div>
              <div className="upload-bill-popup__item-small-cell upload-bill-popup__item-small-cell_price">{item?.itemPrice || ''}</div>
            </li>
          ))}
          <li className="upload-bill-popup__list-footer">
            <div className="upload-bill-popup__item-name">Total</div>
            <div className="upload-bill-popup__item-small-cell">{totalSum?.toFixed(2)}</div>
          </li>
        </ul>

        <div className="upload-bill-popup__actions-section">
          {/* TODO: add change list button functionality */}
          {/* <button */}
          {/*  className="upload-bill-popup__action-btn upload-bill-popup__action-btn_change" */}
          {/*  type="button" */}
          {/* > */}
          {/*  Change List */}
          {/* </button> */}
          <button
            disabled={uploadedItems?.length === 0}
            type="button"
            onClick={handleUploadBillPopupMergeBtnClick}
            className="upload-bill-popup__action-btn upload-bill-popup__action-btn_merge"
          >
            Merge
            List
          </button>
          <button
            type="button"
            onClick={handleUploadBillPopupCloseBtnClick}
            className="upload-bill-popup__action-btn upload-bill-popup__action-btn_cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUploadListClickButton}
            className="upload-bill-popup__action-btn upload-bill-popup__action-btn_upload-list"
          >
            Upload
            list
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBillPopup;
