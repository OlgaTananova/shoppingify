import './Category.css';
import {Link} from "react-router-dom";
import Item from '../Item/Item';
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";
import {NUMBER_OF_ITEMS} from "../../constants";
import {ICategory, IItem} from "../../types";
import {useAppSelector} from "../../store/hooks";

const Category = ({category}: {category: ICategory} ) => {
    const items = useAppSelector(state => state.items.items);
    const itemsInCategory = items.filter((item) => {
       return  item.categoryId === category._id;
    });

    return(
        <div className={'category'}>
        <h3 className={'category__heading'}>{category.category}</h3>
            <ul className={'category__item-list'}>
                {itemsInCategory.map((item) => {
                    return (
                     <Item key={item._id} item={item} />
                    )
                })
            }
            </ul>
            {itemsInCategory.length > NUMBER_OF_ITEMS ?
            <ShowMoreBtn />
            : null}
        </div>
    )
}

export default Category;
