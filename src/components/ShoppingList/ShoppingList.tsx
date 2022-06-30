import './ShoppingList.css';
import {shoppingList} from "../../data";
import ShoppingCategory from "../ShoppingCategory/ShoppingCategory";

const ShoppingList = () => {
    return (
        <div className={'shopping-list'}>
            <div className={'shopping-list__upper-section'}>
                <h3 className={'shopping-list__heading'}>{'Shopping List'}</h3>
                <button className={'shopping-list__edit-btn'} type={'button'}>{}</button>
            </div>
            {
                shoppingList.map((category) => {
                    return (
                       <ShoppingCategory category={category}/>
                    )
                })
            }
        </div>
    )
}

export default ShoppingList;
