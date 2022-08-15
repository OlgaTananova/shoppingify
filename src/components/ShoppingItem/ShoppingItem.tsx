import './ShoppingItem.css';
import {MouseEventHandler, useState} from "react";
import {IShoppingItem} from "../../types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {
    deleteExistingItemFromSL,
    updateItemQtyInExistingSL,
    updateItemStatusExistingSL
} from "../../store/shoppingSlice";

const ShoppingItem = ({item, isEditShoppingList}: {item: IShoppingItem, isEditShoppingList: boolean}) => {
    const [isEditQtyMenuOpen, setIsEditQtyMenuOpen] = useState<boolean>(false);
    const itemInItems = useAppSelector(state => state.items.items.find((itemInItems)=>{
        return item.itemId === itemInItems._id;
    }));
    const activeShoppingList = useAppSelector(state => state.shopping._id);
    const dispatch = useAppDispatch();

    const openEditBarHandleClick: MouseEventHandler = ()=> {
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
            });
    }

    const incrementItemQtyHandleClick: MouseEventHandler = () => {
        dispatch(setIsLoadingTrue());
        dispatch(updateItemQtyInExistingSL({shoppingListId: activeShoppingList, itemId: item.itemId, quantity: item.quantity+1 })).unwrap()
            .catch((err)=> {
                setShowErrorTrue(err.message)
            })
            .finally(()=> {
                dispatch(setIsLoadingFalse());
            })
    };

    const decrementItemQtyHandleClick: MouseEventHandler = () => {
        if (item.quantity  === 1) {
            dispatch(setShowErrorTrue('Item quantity cannot be 0. If you want to delete this item, please, click "delete" button.'));
            return
        }
        dispatch(setIsLoadingTrue());
        dispatch(updateItemQtyInExistingSL({shoppingListId: activeShoppingList, itemId: item.itemId, quantity: item.quantity-1 })).unwrap()
            .catch((err)=> {
                setShowErrorTrue(err.message)
            })
            .finally(()=> {
                dispatch(setIsLoadingFalse());
            })
    };

    const updateItemStateHandleClick: MouseEventHandler = () => {
        const status = item.status === 'pending'? 'completed' : 'pending';
        dispatch(setIsLoadingTrue());
        dispatch(updateItemStatusExistingSL({shoppingListId: activeShoppingList, itemId: item.itemId, status: status})).unwrap()
            .catch((err) => {
                setShowErrorTrue(err.message);
            })
            .finally(()=> {
                dispatch(setIsLoadingFalse());
            })
    }

    return (
        <div className={'shopping-list__item'}>
            <button type={'button'} onClick={updateItemStateHandleClick} className={`shopping-list__item-checkbox ${item.status === 'completed' && 'shopping-list__item-checkbox_checked'}`}/>
            <p className={`shopping-list__item-name ${item.status === 'completed'&& 'shopping-list__item-name_completed'}`}>{itemInItems&& itemInItems.name}</p>
            <button type={'button'} onClick={openEditBarHandleClick} className={'shopping-list__item-quantity'}>{`${item.quantity} pcs`}</button>
            {isEditQtyMenuOpen?
                <div className={'shopping-list__edit-item-qty'}>
                    <button type={'button'} onClick={deleteItemHandleClick} className={'shopping-list__delete-item'}>{}</button>
                    <button type ={'button'} onClick={decrementItemQtyHandleClick} className={'shopping-list__change-qty shopping-list__change-qty_decrease'}>{}</button>
                    <button type={'button'} onClick={openEditBarHandleClick} className={'shopping-list__item-quantity shopping-list__item-quantity_edit'}>{`${item.quantity} pcs`}</button>
                    <button onClick={incrementItemQtyHandleClick} type={'button'} className={'shopping-list__change-qty shopping-list__change-qty_increase'}>{}</button>
                </div>
                :null
            }
        </div>
    )
}

export default ShoppingItem;
