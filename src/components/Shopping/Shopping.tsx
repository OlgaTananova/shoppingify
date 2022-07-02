import './Shopping.css';
import {Dispatch, SetStateAction, useState} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ShoppingList from "../ShoppingList/ShoppingList";
import AddItemToSLForm from "../AddItemToSLForm/AddItemToSLForm";
import ItemInfo from "../ItemInfo/ItemInfo";

const Shopping =({isItemInfoOpen, setIsItemInfoOpen}: {isItemInfoOpen: boolean, setIsItemInfoOpen: Dispatch<SetStateAction<boolean>>}) => {
    const [showAddItemForm, setShowAddItemForm] = useState<boolean>(false);
    const [isEditShoppingList, setIsEditShoppingList] = useState<boolean>(false);
    const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(false);

    const handleClick = () => {
        setShowAddItemForm(true)
    }

    return (
        <div className={'shopping'}>
            {isItemInfoOpen && <ItemInfo setIsItemInfoOpen={setIsItemInfoOpen}/>}
            {showAddItemForm && <AddItemForm/>}
            {(!isItemInfoOpen && !showAddItemForm) && <>
              <div className={'add-item-section'}>
                <h3 className={'add-item-section__heading'}>Didn't find what you need?</h3>
                <button className={'add-item-section__btn'}
                        type={'button'}
                        onClick={handleClick}>Add item
                </button>
              </div>
              <ShoppingList isShoppingListEmpty={isShoppingListEmpty}
                            isEditShoppingList={isEditShoppingList}
                            setIsEditShoppingList={setIsEditShoppingList}/>
              <div className={'shopping-list__add-item-form-big-container'}>
                <AddItemToSLForm isShoppingListEmpty={isShoppingListEmpty}
                                 isEditShoppingList={isEditShoppingList}
                                 setIsEditShoppingList={setIsEditShoppingList}/>
              </div>
            </>}
        </div>
    )
}

export default Shopping;
