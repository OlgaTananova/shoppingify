import './ShoppingItem.css';
import {
  FormEventHandler,
  MouseEventHandler, useEffect, useMemo, useState,
} from 'react';
import { IShoppingItem } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue } from '../../store/appSlice';
import {
  deleteExistingItemFromSL,
  updateItemQtyInExistingSL,
  updateItemStatusExistingSL, updateUnitsOfItemInSL,
} from '../../store/shoppingSlice';
import useForm from '../../utils/useForm';
import { updateItemUnitsInShoppingList } from '../../utils/apiShoppingLists';

function ShoppingItem({ item }: { item: IShoppingItem }) {
  const [isEditQtyMenuOpen, setIsEditQtyMenuOpen] = useState<boolean>(false);
  const [isEditUnitsMenuOpen, setIsEditUnitsMenuOpen] = useState<boolean>(false);
  const [isEditPriceMenuOpen, setIsEditPriceMenuOpen] = useState<boolean>(false);
  const items = useAppSelector((state) => state.items.items);
  const activeShoppingList = useAppSelector((state) => state.shopping._id);
  const dispatch = useAppDispatch();
  const initialValuesForUnits = useMemo(() => ({
    'item-units': {
      value: '',
      required: true,
    },
  }), []);
  const initialValuesForPricePerUnit = useMemo(() => ({
    'price-per-unit': {
      value: 0,
      required: true,
    },
  }), []);
  const editItemUnitsForm = useForm(initialValuesForUnits);
  const editItemPricePerUnitForm = useForm(initialValuesForPricePerUnit);
  const itemInItems = () => items.find((i) => i._id === item.itemId);

  useEffect(() => {
    editItemUnitsForm.setValues({ 'item-units': { value: item?.units || '', required: true } });
  }, [item.units]);

  useEffect(() => {
    // @ts-ignore
    editItemPricePerUnitForm.setValues({ 'price-per-unit': { value: item?.pricePerUnit, required: true } });
  }, [item.pricePerUnit]);

  const openEditQtyBarHandleClick: MouseEventHandler = () => {
    setIsEditQtyMenuOpen(!isEditQtyMenuOpen);
  };

  const openEditUnitsBarHandleClick: MouseEventHandler = (event) => {
    setIsEditUnitsMenuOpen(!isEditUnitsMenuOpen);
  };

  const openEditPriceBarHandleClick: MouseEventHandler = () => {
    setIsEditPriceMenuOpen(!isEditPriceMenuOpen);
  };
  const deleteItemHandleClick: MouseEventHandler = () => {
    dispatch(setIsLoadingTrue());
    dispatch(deleteExistingItemFromSL({ shoppingListId: activeShoppingList, itemId: item.itemId })).unwrap()
      .catch((err) => {
        setShowErrorTrue(err.message);
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  const incrementItemQtyHandleClick: MouseEventHandler = () => {
    dispatch(setIsLoadingTrue());
    dispatch(updateItemQtyInExistingSL({
      shoppingListId: activeShoppingList,
      itemId: item.itemId,
      quantity: item.quantity + 1,
    })).unwrap()
      .catch((err) => {
        setShowErrorTrue(err.message);
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  const decrementItemQtyHandleClick: MouseEventHandler = () => {
    if (item.quantity === 1) {
      dispatch(setShowErrorTrue('Item quantity cannot be 0. If you want to delete this item, please, click "delete" button.'));
      return;
    }
    dispatch(setIsLoadingTrue());
    dispatch(updateItemQtyInExistingSL({
      shoppingListId: activeShoppingList,
      itemId: item.itemId,
      quantity: item.quantity - 1,
    })).unwrap()
      .catch((err) => {
        setShowErrorTrue(err.message);
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  const updateItemStateHandleClick: MouseEventHandler = () => {
    const status = item.status === 'pending' ? 'completed' : 'pending';
    dispatch(setIsLoadingTrue());
    dispatch(updateItemStatusExistingSL({ shoppingListId: activeShoppingList, itemId: item.itemId, status })).unwrap()
      .catch((err) => {
        setShowErrorTrue(err.message);
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  const handleEditItemUnitsClick: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(updateUnitsOfItemInSL({ shoppingListId: activeShoppingList, itemId: item.itemId, units: editItemUnitsForm.values['item-units'].value })).unwrap()
      .catch((err) => {
        setShowErrorTrue(err.message);
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
        setIsEditUnitsMenuOpen(false);
      });
  };

  return (
    <div className="shopping-list__item">
      <button type="button" aria-label="Item check-box" onClick={updateItemStateHandleClick} className={`shopping-list__item-checkbox ${item.status === 'completed' && 'shopping-list__item-checkbox_checked'}`} />
      <p className={`shopping-list__item-name ${item.status === 'completed' && 'shopping-list__item-name_completed'}`}>{itemInItems() ? itemInItems()!.name : 'Unknown Item'}</p>
      <div className="shopping-list__item-action-buttons">
        <button type="button" onClick={openEditQtyBarHandleClick} className="shopping-list__item-action-button">{`${item.quantity}`}</button>
        <button type="button" onClick={openEditUnitsBarHandleClick} className="shopping-list__item-action-button">{`${item.units}`}</button>
        <button type="button" onClick={openEditPriceBarHandleClick} className="shopping-list__item-action-button">{`$${item.pricePerUnit?.toFixed(2)}`}</button>
        <span className="shopping-list__item-action-button shopping-list__item-action-button_total">{`$${item.price?.toFixed(2)}`}</span>
      </div>
      {isEditQtyMenuOpen
        ? (
          <div className="shopping-list__edit-item">
            <button type="button" onClick={deleteItemHandleClick} className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_delete">{}</button>
            <button type="button" onClick={decrementItemQtyHandleClick} className="shopping-list__change-qty shopping-list__change-qty_decrease">{}</button>
            <button type="button" onClick={openEditQtyBarHandleClick} className="shopping-list__item-action-button shopping-list__item-quantity_edit">{`${item.quantity}`}</button>
            <button onClick={incrementItemQtyHandleClick} type="button" className="shopping-list__change-qty shopping-list__change-qty_increase">{}</button>
            <button onClick={openEditQtyBarHandleClick} className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel" type="button">{}</button>
          </div>
        )
        : null}
      {isEditUnitsMenuOpen ? (
        <form onSubmit={handleEditItemUnitsClick} className="shopping-list__edit-item" noValidate name="shopping-list__edit-item-editUnitsForm">
          <input name="item-units" value={editItemUnitsForm.values['item-units'].value} onChange={editItemUnitsForm.handleChange} className="shopping-list__edit-item-editUnitsForm-input" type="text" />
          <button className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_submit" type="submit">{}</button>
          <button onClick={openEditUnitsBarHandleClick} className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel" type="button">{}</button>
        </form>
      ) : null}
      {isEditPriceMenuOpen ? (
        <form className="shopping-list__edit-item" noValidate name="shopping-list__edit-item-ediPricePerUnitForm">
          <input required name="price-per-unit" value={editItemPricePerUnitForm.values['price-per-unit'].value} onChange={editItemPricePerUnitForm.handleChange} className="shopping-list__edit-item-editUnitsForm-input" type="number" />
          <button className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_submit" type="submit">{}</button>
          <button onClick={openEditPriceBarHandleClick} className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel" type="button">{}</button>
        </form>
      )
        : null}

    </div>
  );
}

export default ShoppingItem;
