import './ShoppingCategory.css';
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import {Data, ShoppingCategoryData} from "../../data";

const ShoppingCategory = ({category}: {category: ShoppingCategoryData}) => {
    return (
        <div className={'shopping-list__category'}>
            <h3 className={'shopping-list__category-heading'}>{category.category}</h3>
            {
                category.items.map((item) => {
                    return (
                        <ShoppingItem item={item}/>
                    )
                })
            }
        </div>
    )
}

export default ShoppingCategory;
