import './Category.css';
import {Link} from "react-router-dom";
import Item from '../Item/Item';
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";
import {NUMBER_OF_ITEMS} from "../../constants";
import {ICategory} from "../../types";

const Category = ({category}: {category: ICategory} ) => {
    return(
        <div className={'category'}>
        <h3 className={'category__heading'}>{category.category}</h3>
            <ul className={'category__item-list'}>{
                category.items.map((item) => {
                    return (
                        <Link key={item.itemId} className={'category__item-link'} to={`/items/${item.itemId}`}><Item  item={item} /></Link>
                    )
                })
            }
            </ul>
            {category.items.length > NUMBER_OF_ITEMS ?
            <ShowMoreBtn />
            : null}
        </div>
    )
}

export default Category;
