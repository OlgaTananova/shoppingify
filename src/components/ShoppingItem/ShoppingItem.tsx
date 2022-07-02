import './ShoppingItem.css';
import {MouseEventHandler, useState} from "react";

const ShoppingItem = ({item, isEditShoppingList}: {item: [string, number], isEditShoppingList: boolean}) => {
    const [isEditQtyMenuOpen, setIsEditQtyMenuOpen] = useState<boolean>(false);

    const handleClick: MouseEventHandler = ()=> {
        setIsEditQtyMenuOpen(!isEditQtyMenuOpen);
    }


    return (
        <div className={'shopping-list__item'}>
            {isEditShoppingList&&  <button type={'button'} className={'shopping-list__item-checkbox'}/>}
            <p className={'shopping-list__item-name'}>{item[0]}</p>
            <button type={'button'} onClick={handleClick} className={'shopping-list__item-quantity'}>{`${item[1]} pcs`}</button>
            {isEditQtyMenuOpen?
                <div className={'shopping-list__edit-item-qty'} onClick={handleClick}>
                    <button className={'shopping-list__delete-item'}>{}</button>
                    <button className={'shopping-list__change-qty shopping-list__change-qty_decrease'}>{}</button>
                    <button type={'button'} className={'shopping-list__item-quantity shopping-list__item-quantity_edit'}>{`${item[1]} pcs`}</button>
                    <button className={'shopping-list__change-qty shopping-list__change-qty_increase'}>{}</button>
                </div>
                :null
            }
        </div>
    )
}

export default ShoppingItem;
