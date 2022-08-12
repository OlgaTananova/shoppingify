import './ShoppingList.css';
// import {ShoppingCategoryData, shoppingList} from "../../data";
import ShoppingCategory from "../ShoppingCategory/ShoppingCategory";
import {MouseEventHandler, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setIsEditShoppingListTrue, getActiveShoppingList, setIsEditShoppingListFalse} from "../../store/shoppingSlice";
import {IShoppingCategory, IShoppingItem} from "../../types";

const ShoppingList = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList);
    const itemsInShoppingList = useAppSelector(state => state.shopping.items);
    const shoppingListStatus = useAppSelector(state => state.shopping.status);
    const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(itemsInShoppingList!.length === 0);
    const dispatch = useAppDispatch();

    // @ts-ignore
    const itemsByCategory = itemsInShoppingList!.length !== 0 ? itemsInShoppingList!.reduce((prev: IShoppingCategory, value: IShoppingItem) => {
            if (!prev[value.categoryId]) {
                prev[value.categoryId] = [];
                prev[value.categoryId].push(value)
            } else {
                prev[value.categoryId].push(value);
            }
            return prev;
        }, {})
        : null;

    useEffect(() => {
        if (itemsInShoppingList!.length === 0) {
            setIsShoppingListEmpty(true);
        } else {
            setIsShoppingListEmpty(false);
        }
    }, [itemsInShoppingList])

    const handleEditShoppingListClick: MouseEventHandler = () => {
        !isEditShoppingList ?
            dispatch(setIsEditShoppingListTrue())
            : dispatch(setIsEditShoppingListFalse())
    }

    return (
            isShoppingListEmpty?
                <div className={'shopping-list shopping-list_empty'}>
                    {shoppingListStatus !== 'idle' &&
                      <input className={`shopping-list__heading ${isEditShoppingList && 'shopping-list__heading_editable'}`}
                             type={'text'}
                             placeholder={'ShoppingList'}
                             name={'shopping-list-heading'}>{}</input>
                    }
                    <p className={'shopping-list__no-items'}>No Items</p>
                </div>
                :
                <div className={'shopping-list'}>
                    <>
                    <div className={'shopping-list__upper-section'}>
                        <input className={`shopping-list__heading ${isEditShoppingList && 'shopping-list__heading_editable'}`}
                               type={'text'}
                               placeholder={'ShoppingList'}
                               name={'shopping-list-heading'}>{}</input>
                        <button onClick={handleEditShoppingListClick}
                                className={'shopping-list__edit-btn'}
                                type={'button'}>{}</button>
                    </div>
                        {itemsByCategory&& Object.entries(itemsByCategory).map((item:[string, IShoppingItem[]] )=> {
                                return <ShoppingCategory items={item[1]}
                                                         categoryId={item[0]}
                                                         key={item[0]}
                                                         isEditShoppingList={isEditShoppingList}/>

                        })}
                    </>
                </div>
    )
}

export default ShoppingList;
