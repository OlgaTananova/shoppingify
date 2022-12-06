import './Shopping.css';
import AddItemForm from '../AddItemForm/AddItemForm';
import ShoppingList from '../ShoppingList/ShoppingList';
import AddItemToSLForm from '../AddItemToSLForm/AddItemToSLForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openAddItemForm } from '../../store/shoppingSlice';
import { setShowMobileSLTrue } from '../../store/appSlice';
import { MyCustomCSS } from '../../types';

function Shopping() {
  const scroll = useAppSelector((state) => state.app.scroll);
  const dispatch = useAppDispatch();
  const showAddItemForm = useAppSelector((state) => state.shopping.isAddItemFormOpened);
  const showMobileSL = useAppSelector((state) => state.app.showMobileSL);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const handleClick = () => {
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
            onClick={handleClick}
          >
            Add item
          </button>
        </div>
        <AddItemToSLForm />
        <ShoppingList />
      </>
      )}
    </div>
  );
}

export default Shopping;
