import './Category.css';
import {Data} from "../../data";
import Item from '../Item/Item';
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";
import {NUMBER_OF_ITEMS} from "../../constants";

const Category = ({category}: {category: Data} ) => {
    return(
        <div className={'category'}>
        <h3 className={'category__heading'}>{category.category}</h3>
            <ul className={'category__item-list'}>{
                category.items.map((item, index) => {
                    return (
                        <Item item={item} key={index}/>
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
