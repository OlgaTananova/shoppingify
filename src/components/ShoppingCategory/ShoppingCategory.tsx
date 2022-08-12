import './ShoppingCategory.css';
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import {IShoppingCategory, IShoppingItem} from "../../types";
import {useAppSelector} from "../../store/hooks";

const ShoppingCategory = ({items, isEditShoppingList,categoryId }: {items: IShoppingItem[] , isEditShoppingList: boolean, categoryId: string}) => {
    const category = useAppSelector(state=>state.categories.categories.find((value)=>{
        return categoryId === value._id;
    }))

    return (
        <div className={'shopping-list__category'}>
            <h3 className={'shopping-list__category-heading'}>{category&& category.category}</h3>
            {
                items.map((item) => {
                    return (
                        <ShoppingItem item={item} key={item.itemId} isEditShoppingList={isEditShoppingList}/>
                    )
                })
            }
        </div>
    )
}

export default ShoppingCategory;
