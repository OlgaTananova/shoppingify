import './ShoppingList.css';
import {ShoppingCategoryData, shoppingList} from "../../data";
import ShoppingCategory from "../ShoppingCategory/ShoppingCategory";
import {Dispatch, MouseEventHandler, SetStateAction, useState} from "react";

const ShoppingList = ({
                          isEditShoppingList,
                          setIsEditShoppingList,
                          isShoppingListEmpty
                      }: { isEditShoppingList: boolean, setIsEditShoppingList: Dispatch<SetStateAction<boolean>>, isShoppingListEmpty: boolean }) => {


    const handleEditShoppingListClick: MouseEventHandler = () => {
        setIsEditShoppingList(true);
    }

    return (isShoppingListEmpty?
            <div className={'shopping-list shopping-list_empty'}>
                No Items
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
