import './CancelShoppingListPopup.css';
import { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setIsLoadingFalse, setIsLoadingTrue, setIsToDeleteSL, setShowCancelSLFalse, setShowErrorTrue,
} from '../../store/appSlice';
import {
  clearShoppingList, deleteSL,
  getActiveShoppingList,
  setIsEditShoppingListFalse,
  updateSLStatus,
} from '../../store/shoppingSlice';
import { getAllShoppingLists } from '../../store/shoppingHistorySlice';
import { IShoppingList } from '../../types';

function CancelShoppingListPopup() {
  const showCancelSLPopup = useAppSelector((state) => state.app.showCancelSL);
  const isToDeleteShoppingList = useAppSelector((state) => state.app.isToDeleteSL);
  const activeShoppingList = useAppSelector((state) => state.shopping);
  const dispatch = useAppDispatch();

  const handleCloseClick: MouseEventHandler = () => {
    dispatch(setIsToDeleteSL(false));
    dispatch(setShowCancelSLFalse());
    dispatch(setIsEditShoppingListFalse());
  };
  const handleCancelSLClick: MouseEventHandler = () => {
    dispatch(setIsLoadingTrue());
    dispatch(updateSLStatus({ shoppingListId: activeShoppingList._id, status: 'cancelled' })).unwrap()
      .then(() => {
        dispatch(getAllShoppingLists()).unwrap()
          .then((data) => {
            dispatch(clearShoppingList());
            const activeSL = data.find((list: IShoppingList) => list.status === 'active');
            if (activeSL) {
              dispatch(getActiveShoppingList(activeSL));
            }
          });
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
        dispatch(setShowCancelSLFalse());
      });
  };
  const handleDeleteSLClick: MouseEventHandler = () => {
    if (activeShoppingList.status !== 'active') {
      dispatch(setShowErrorTrue('You don\'t have an active shopping list to delete.'));
    } else {
      dispatch(setIsLoadingTrue());
      dispatch(deleteSL({ id: activeShoppingList?._id || '' })).unwrap()
        .then(() => {
          dispatch(getAllShoppingLists()).unwrap()
            .then((data) => {
              dispatch(clearShoppingList());
              const activeSL = data.find((list: IShoppingList) => list.status === 'active');
              if (activeSL) {
                dispatch(getActiveShoppingList(activeSL));
              }
            });
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
          dispatch(setShowCancelSLFalse());
        });
    }
  };
  return (
    <div className={`cancel-shopping-list-popup ${!showCancelSLPopup && 'cancel-shopping-list-popup_inactive'}`}>
      {isToDeleteShoppingList ? (
        <div className="cancel-shopping-list-popup__container">
          <button type="button" onClick={handleCloseClick} className="cancel-shopping-list-popup__close-btn">{}</button>
          <h2 className="cancel-shopping-list-popup__heading">Are you sure you want to delete this list?</h2>
          <div className="cancel-shopping-list-popup__buttons">
            <button type="button" onClick={handleCloseClick} className="cancel-shopping-list-popup__button cancel-shopping-list-popup__button_cancel">cancel</button>
            <button type="button" onClick={handleDeleteSLClick} className="cancel-shopping-list-popup__button cancel-shopping-list-popup__button_confirm">Yes</button>
          </div>
        </div>
      )
        : (
          <div className="cancel-shopping-list-popup__container">
            <button type="button" onClick={handleCloseClick} className="cancel-shopping-list-popup__close-btn">{}</button>
            <h2 className="cancel-shopping-list-popup__heading">Are you sure you want to cancel this list?</h2>
            <div className="cancel-shopping-list-popup__buttons">
              <button type="button" onClick={handleCloseClick} className="cancel-shopping-list-popup__button cancel-shopping-list-popup__button_cancel">No</button>
              <button type="button" onClick={handleCancelSLClick} className="cancel-shopping-list-popup__button cancel-shopping-list-popup__button_confirm">Yes</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default CancelShoppingListPopup;
