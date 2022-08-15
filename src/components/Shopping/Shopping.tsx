import './Shopping.css';
import {useState} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ShoppingList from "../ShoppingList/ShoppingList";
import AddItemToSLForm from "../AddItemToSLForm/AddItemToSLForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {openAddItemForm} from "../../store/shoppingSlice";

const Shopping =() => {

    const dispatch = useAppDispatch();
    const showAddItemForm = useAppSelector(state => state.shopping.isAddItemFormOpened);
    const handleClick = () => {
        dispatch(openAddItemForm());
    }

    return (
        <div className={'shopping'}>
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
              <div className={'shopping-list__add-item-form-big-container'}>
                <AddItemToSLForm />
              </div>
            </>}
        </div>
    )
}

export default Shopping;
