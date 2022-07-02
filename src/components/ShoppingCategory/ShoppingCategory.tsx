import './ShoppingCategory.css';
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import {Data, ShoppingCategoryData} from "../../data";

const ShoppingCategory = ({category, isEditShoppingList }: {category: ShoppingCategoryData, isEditShoppingList: boolean}) => {
    return (
        <div className={'shopping-list__category'}>
            <h3 className={'shopping-list__category-heading'}>{category.category}</h3>
            {
                category.items.map((item:[string, number], index:number) => {
                    return (
                        <ShoppingItem item={item} key={index} isEditShoppingList={isEditShoppingList}/>
                    )
                })
            }
        </div>
    )
}

export default ShoppingCategory;
