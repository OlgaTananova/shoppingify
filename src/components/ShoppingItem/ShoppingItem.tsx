import './ShoppingItem.css';
import {MouseEventHandler, useState} from "react";
import {IShoppingItem} from "../../types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {deleteExistingItemFromSL} from "../../store/shoppingSlice";

const ShoppingItem = ({item, isEditShoppingList}: {item: IShoppingItem, isEditShoppingList: boolean}) => {
    const [isEditQtyMenuOpen, setIsEditQtyMenuOpen] = useState<boolean>(false);
    const itemInItems = useAppSelector(state => state.items.items.find((itemInItems)=>{
        return item.itemId === itemInItems._id;
    }));
    const activeShoppingList = useAppSelector(state => state.shopping._id);
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler = ()=> {
        setIsEditQtyMenuOpen(!isEditQtyMenuOpen);
    }
    const deleteItemHandleClick: MouseEventHandler =()=> {
        dispatch(setIsLoadingTrue());
        dispatch(deleteExistingItemFromSL({shoppingListId: activeShoppingList, itemId: item.itemId})).unwrap()
            .catch((err)=>{
                setShowErrorTrue(err.message);
            })
            .finally(()=>{
                dispatch(setIsLoadingFalse());
            })
    }

    return (
        <div className={'shopping-list__item'}>
            {isEditShoppingList&&  <button type={'button'} className={'shopping-list__item-checkbox'}/>}
            <p className={'shopping-list__item-name'}>{itemInItems&& itemInItems.name}</p>
            <button type={'button'} onClick={handleClick} className={'shopping-list__item-quantity'}>{`${item.quantity} pcs`}</button>
            {isEditQtyMenuOpen?
                <div className={'shopping-list__edit-item-qty'}>
                    <button type={'button'} onClick={deleteItemHandleClick} className={'shopping-list__delete-item'}>{}</button>
                    <button className={'shopping-list__change-qty shopping-list__change-qty_decrease'}>{}</button>
                    <button type={'button'} className={'shopping-list__item-quantity shopping-list__item-quantity_edit'}>{`${item.quantity} pcs`}</button>
                    <button className={'shopping-list__change-qty shopping-list__change-qty_increase'}>{}</button>
                </div>
                :null
            }
        </div>
    )
}

export default ShoppingItem;
