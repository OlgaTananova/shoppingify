import './Category.css';
import Item from '../Item/Item';
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";
import {NUMBER_OF_ADD_ITEMS, NUMBER_OF_ITEMS} from "../../constants";
import {ICategory, IItem} from "../../types";
import {useAppSelector} from "../../store/hooks";
import {MouseEventHandler, useEffect, useState} from "react";
import ShowLessBtn from "../ShowLessBtn/ShowLessBtn";


const Category = ({category}: { category: ICategory }) => {
    const items = useAppSelector(state => state.items.items);
    const [itemsInCategory, setItemsInCategory] = useState<IItem[]>([]);
    const [showedItems, setShowedItems] = useState<IItem[]>([]);

    useEffect(() => {
        const filter = items.filter((item) => {
            return item.categoryId === category._id
        })
        setItemsInCategory(filter);
    }, [items, category]);

    useEffect(() => {
        setShowedItems(itemsInCategory.slice(0, NUMBER_OF_ITEMS))
    }, [itemsInCategory])


    const handleShowMoreBtnClick: MouseEventHandler = () => {
        setShowedItems(itemsInCategory.slice(0, itemsInCategory.length + NUMBER_OF_ADD_ITEMS))
    }

    const handleShowLessClick: MouseEventHandler = () => {
        setShowedItems(itemsInCategory.slice(0, itemsInCategory.length - NUMBER_OF_ADD_ITEMS));
    }

    return (
        <div className={'category'}>
            <h3 className={'category__heading'}>{category.category}</h3>
            <ul className={'category__item-list'}>
                {showedItems.map((item) => {
                    return (
                        <Item key={item._id}
                              item={item}/>
                    )
                })
                }
            </ul>
            {showedItems.length >= NUMBER_OF_ITEMS && showedItems.length < itemsInCategory.length ?
                <ShowMoreBtn onClick={handleShowMoreBtnClick}/>
                : null}
            {showedItems.length === itemsInCategory.length && showedItems.length > NUMBER_OF_ITEMS ?
                <ShowLessBtn onClick={handleShowLessClick}/>
                : null}
        </div>
    )
}

export default Category;
