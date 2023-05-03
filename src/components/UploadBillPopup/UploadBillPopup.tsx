import './UploadBillPopup.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  closeUploadBillPopup, setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue,
} from '../../store/appSlice';
import { mergeBill } from '../../store/shoppingSlice';
import { IFullShoppingItem } from '../../types';

function UploadBillPopup() {
  const uploadedItems = useAppSelector((state) => state.shopping.uploadedItems);
  const itemsFromSL = useAppSelector((state) => state.shopping.items);
  const itemsFromItems = useAppSelector((state) => state.items.items);
  const categories = useAppSelector((state) => state.categories.categories);
  const [itemsFromSLWithNames, setItemsFromSLWithNames] = useState<IFullShoppingItem[]>([]);
  const showUploadBillPopup = useAppSelector((state) => state.app.showUploadBillPopup);
  // const showUploadBillPopup = true;
  const [totalSum, setTotalSum] = useState(0);
  const dispatch = useAppDispatch();

  const handleUploadBillPopupCloseBtnClick = () => {
    dispatch(closeUploadBillPopup());
  };

  const handleUploadBillPopupMergeBtnClick = () => {
    // @ts-ignore
    const items = itemsFromSLWithNames?.map((item) => {
      // @ts-ignore
      const itemInUploadedItems = uploadedItems?.find((i) => {
        const itemLength = item?.itemName?.length || 0;
        const trimmedItemName = item?.itemName?.toLowerCase()?.trim() || '********';
        return i?.itemName?.toLowerCase()?.includes(trimmedItemName);
      });
      return {
        itemId: item?.itemId || '',
        categoryId: item?.categoryId || '',
        quantity: itemInUploadedItems?.itemQuantity || 0,
        status: 'completed',
        pricePerUnit: itemInUploadedItems?.itemPricePerUnit || 0,
        price: itemInUploadedItems?.itemPrice || 0,
      };
    });
    console.log(items);
  };

  useEffect(() => {
    setTotalSum(() => uploadedItems?.reduce((acc, item) => acc + (Number(item?.itemPrice) || Number(item?.salesTax)), 0) || 0);
  }, [uploadedItems]);

  useEffect(() => {
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
  }, [itemsFromSL, itemsFromItems, categories]);

  return (
    <div className={`upload-bill-popup ${!showUploadBillPopup && 'upload-bill-popup_inactive'}`}>
      <div className="upload-bill-popup__inner-container">
        <button type="button" onClick={handleUploadBillPopupCloseBtnClick} className="upload-bill-popup__close-btn">{}</button>
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
            <li key={index} className="upload-bill-popup__list-item">
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
          <button className="upload-bill-popup__action-btn upload-bill-popup__action-btn_change" type="button">Change List</button>
          <button type="button" onClick={handleUploadBillPopupMergeBtnClick} className="upload-bill-popup__action-btn upload-bill-popup__action-btn_merge">Merge List</button>
          <button type="button" onClick={handleUploadBillPopupCloseBtnClick} className="upload-bill-popup__action-btn upload-bill-popup__action-btn_cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UploadBillPopup;
