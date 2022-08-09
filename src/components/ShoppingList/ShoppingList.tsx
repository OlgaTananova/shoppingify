import './ShoppingList.css';
import {ShoppingCategoryData, shoppingList} from "../../data";
import ShoppingCategory from "../ShoppingCategory/ShoppingCategory";
import {MouseEventHandler} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setIsEditShoppingListTrue} from "../../store/shoppingSlice";

const ShoppingList = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList);
    const isShoppingListEmpty = useAppSelector(state => state.shopping.categories)
    const dispatch = useAppDispatch();

    const handleEditShoppingListClick: MouseEventHandler = () => {
        dispatch(setIsEditShoppingListTrue());
    }

    return (isShoppingListEmpty && isShoppingListEmpty.length === 0?
            <div className={'shopping-list shopping-list_empty'}>
                <p className={'shopping-list__no-items'}>No Items</p>
                {/*<button type={'button'} className={'shopping-list__create-list-btn'} onClick={()=>{}}>Create new shopping list</button>*/}
            </div>
                : <div className={'shopping-list'}>
                    <div className={'shopping-list__upper-section'}>
                        <input className={`shopping-list__heading ${isEditShoppingList && 'shopping-list__heading_editable'}`}
                               type={'text'}
                               placeholder={'ShoppingList'}
                               name={'shopping-list-heading'}>{}</input>
                        <button onClick={handleEditShoppingListClick}
                                className={'shopping-list__edit-btn'}
                                type={'button'}>{}</button>
                    </div>
                    {
                        shoppingList.map((category: ShoppingCategoryData, index: number) => {
                            return (
                                <ShoppingCategory category={category}
                                                  key={index}
                                                  isEditShoppingList={isEditShoppingList}/>
                            )
                        })
                    }
                </div>
    )
}

export default ShoppingList;
