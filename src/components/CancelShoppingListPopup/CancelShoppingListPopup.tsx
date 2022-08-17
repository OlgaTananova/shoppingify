import './CancelShoppingListPopup.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {MouseEventHandler} from "react";
import {setIsLoadingFalse, setIsLoadingTrue, setShowCancelSLFalse, setShowErrorTrue} from "../../store/appSlice";
import {clearShoppingList, getActiveShoppingList, updateSLStatus} from "../../store/shoppingSlice";
import {getAllShoppingLists} from "../../store/shoppingHistorySlice";
import {IShoppingList} from "../../types";

const CancelShoppingListPopup = () => {
    const showCancelSLPopup = useAppSelector(state => state.app.showCancelSL);
    const activeShoppingList = useAppSelector(state => state.shopping);
    const dispatch = useAppDispatch();

    const handleCloseClick: MouseEventHandler = () => {
        dispatch(setShowCancelSLFalse());
    }
    const handleCancelSLClick: MouseEventHandler = () => {
        dispatch(setIsLoadingTrue())
        dispatch(updateSLStatus({shoppingListId: activeShoppingList._id, status: 'cancelled'})).unwrap()
            .then(()=>{
                dispatch(getAllShoppingLists()).unwrap()
                    .then((data) => {
                        dispatch(clearShoppingList());
                        const activeShoppingList = data.find((list: IShoppingList) => {
                            return list.status === 'active';
                        });
                        if (activeShoppingList) {
                            dispatch(getActiveShoppingList(activeShoppingList));
                        }
                    })
            })
            .catch((err)=>{
                dispatch(setShowErrorTrue(err.message));
            })
            .finally(()=>{
                dispatch(setIsLoadingFalse());
                dispatch(setShowCancelSLFalse());
            })
    }
    return (
        <div className={`cancel-shopping-list-popup ${!showCancelSLPopup&& "cancel-shopping-list-popup_inactive"}`}>
            <div className={'cancel-shopping-list-popup__container'}>
                <button type={'button'} onClick={handleCloseClick} className={'cancel-shopping-list-popup__close-btn'}>{}</button>
                <h2 className={'cancel-shopping-list-popup__heading'}>Are you sure that you want to cancel this list?</h2>
                 <div className={'cancel-shopping-list-popup__buttons'}>
                     <button type={'button'} onClick={handleCloseClick} className={'cancel-shopping-list-popup__button cancel-shopping-list-popup__button_cancel'}>cancel</button>
                       <button type={'button'} onClick={handleCancelSLClick} className={'cancel-shopping-list-popup__button cancel-shopping-list-popup__button_confirm'}>Yes</button>
                 </div>
            </div>
        </div>
    )
}

export default CancelShoppingListPopup;
