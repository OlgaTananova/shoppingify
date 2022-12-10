import './AddItemToSLForm.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setIsLoadingFalse, setIsLoadingTrue, setShowCancelSLTrue, setShowErrorTrue,
} from '../../store/appSlice';
import {
  clearShoppingList,
  getActiveShoppingList,
  updateSLStatus,
} from '../../store/shoppingSlice';
import CreateShoppingListForm from '../CreateShoppingListForm/CreateShoppingListForm';
import AddItemToActiveShoppingListForm from '../AddItemToActiveShoppingListForm/AddItemToActiveShoppingListForm';
import { getAllShoppingLists } from '../../store/shoppingHistorySlice';
import { IShoppingList } from '../../types';

function AddItemToSLForm() {
  const isEditShoppingList = useAppSelector((state) => state.shopping.isEditShoppingList);
  const itemsInShoppingList = useAppSelector((state) => state.shopping.items);
  const activeShoppingList = useAppSelector((state) => state.shopping);
  const shoppingListStatus = useAppSelector((state) => state.shopping.status);
  const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(itemsInShoppingList!.length === 0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemsInShoppingList!.length === 0 && shoppingListStatus === 'idle') {
      setIsShoppingListEmpty(true);
    } else {
      setIsShoppingListEmpty(false);
    }
  }, [itemsInShoppingList]);

  const getShoppingLists = () => {
    dispatch(getAllShoppingLists()).unwrap()
      .then((data) => {
        dispatch(clearShoppingList());
        const activeSL = data.find((list: IShoppingList) => list.status === 'active');
        if (activeSL) {
          dispatch(getActiveShoppingList(activeSL));
        }
      });
  };

  const handleCompleteSLClick: MouseEventHandler = () => {
    dispatch(setIsLoadingTrue());
    dispatch(updateSLStatus({ shoppingListId: activeShoppingList._id, status: 'completed' })).unwrap()
      .then(() => {
        getShoppingLists();
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  const handleCancelSLClick: MouseEventHandler = () => {
    dispatch(setShowCancelSLTrue());
  };

  if (isShoppingListEmpty && !isEditShoppingList) {
    return <CreateShoppingListForm />;
  } if (!isEditShoppingList && !isShoppingListEmpty) {
    return <AddItemToActiveShoppingListForm />;
  }
  return (
    <div className="shopping-list__add-item-form-container shopping-list__add-item-form-container_editSL">
      <h3 className="shopping-list__complete-heading">Do you want to complete or cancel the shopping list?</h3>
      <div className="shopping-list__complete-buttons">
        <button
          className="shopping-list__complete-btn shopping-list__complete-btn_cancel"
          type="button"
          onClick={handleCancelSLClick}
        >
          cancel
        </button>
        <button
          className="shopping-list__complete-btn shopping-list__complete-btn_complete"
          onClick={handleCompleteSLClick}
          type="button"
        >
          complete
        </button>
      </div>
    </div>
  );
}

export default AddItemToSLForm;
