import './Shopping.css';
import {useState} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ShoppingList from "../ShoppingList/ShoppingList";
import AddItemToSLForm from "../AddItemToSLForm/AddItemToSLForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {openAddItemForm} from "../../store/shoppingSlice";
import {setShowMobileSLTrue} from "../../store/appSlice";

const Shopping =() => {

    const dispatch = useAppDispatch();
    const showAddItemForm = useAppSelector(state => state.shopping.isAddItemFormOpened);
    const showMobileSL = useAppSelector(state => state.app.showMobileSL);
    const handleClick = () => {
        dispatch(openAddItemForm());
        dispatch(setShowMobileSLTrue());
    }

    return (
        <div className={`shopping ${showMobileSL&& 'shopping_showMobileSL'}`}>
            {showAddItemForm && <AddItemForm/>}
            {(!showAddItemForm) && <>
              <div className={'add-item-section'}>
                <h3 className={'add-item-section__heading'}>Didn't find what you need?</h3>
                <button className={'add-item-section__btn'}
                        type={'button'}
                        onClick={handleClick}>Add item
                </button>
              </div>
              <ShoppingList />
              <AddItemToSLForm />
            </>}
        </div>
    )
}

export default Shopping;
