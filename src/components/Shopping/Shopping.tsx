import './Shopping.css';
import {useState} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";

const Shopping =() => {
    const [showAddItemPopup, setShowAddItemPopup] = useState<boolean>(false);

    const handleClick = () => {
        setShowAddItemPopup((prev) => true)
    }

    return (
        <div className={'shopping'}>
            {showAddItemPopup&& <AddItemForm />}
            <div className={'add-item-section'}>
                <h3 className={'add-item-section__heading'}>Didn't find what you need?</h3>
                <button className={'add-item-section__btn'} type={'button'} onClick={handleClick}>Add item</button>
            </div>
        </div>
    )
}

export default Shopping;
