import './Shopping.css';
import {useState} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ShoppingList from "../ShoppingList/ShoppingList";

const Shopping =() => {
    const [showAddItemForm, setShowAddItemForm] = useState<boolean>(false);

    const handleClick = () => {
        setShowAddItemForm((prev) => true)
    }

    return (
        <div className={'shopping'}>
            {showAddItemForm&& <AddItemForm />}
            <div className={'add-item-section'}>
                <h3 className={'add-item-section__heading'}>Didn't find what you need?</h3>
                <button className={'add-item-section__btn'} type={'button'} onClick={handleClick}>Add item</button>
            </div>
            <ShoppingList />
        </div>
    )
}

export default Shopping;
