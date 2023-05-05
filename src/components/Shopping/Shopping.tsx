/*
* This component is responsible for rendering the shopping list, bill loader, and the add item form.
* */
import './Shopping.css';
import AddItemForm from '../AddItemForm/AddItemForm';
import ShoppingList from '../ShoppingList/ShoppingList';
import AddItemToSLForm from '../AddItemToSLForm/AddItemToSLForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openAddItemForm } from '../../store/shoppingSlice';
import { setShowMobileSLTrue } from '../../store/appSlice';
import { MyCustomCSS } from '../../types';
import BillLoader from '../BillLoader/BillLoader';

function Shopping() {
  const dispatch = useAppDispatch();
  const showAddItemForm = useAppSelector((state) => state.shopping.isAddItemFormOpened);
  const showMobileSL = useAppSelector((state) => state.app.showMobileSL);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const handleAddItemFormClick = () => {
    dispatch(openAddItemForm());
    dispatch(setShowMobileSLTrue());
  };

  return (
    <div
      className={`shopping ${showMobileSL && 'shopping_showMobileSL'}`}
      style={{
        minHeight: `${innerHeight}px`,
      } as MyCustomCSS}
    >
      {showAddItemForm && <AddItemForm />}
      {(!showAddItemForm) && (
      <>
        <div className="add-item-section">
          <h3 className="add-item-section__heading">{'Didn\'t find what you need?'}</h3>
          <button
            className="add-item-section__btn"
            type="button"
            onClick={handleAddItemFormClick}
          >
            Add item
          </button>
        </div>
        <AddItemToSLForm />
        <BillLoader />
        <ShoppingList />
      </>
      )}
    </div>
  );
}

export default Shopping;
