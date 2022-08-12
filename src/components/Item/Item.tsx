import './Item.css';
import {IItem} from "../../types";
import {MouseEventHandler} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {addNewItemToShoppingList} from "../../store/shoppingSlice";
import {Link} from "react-router-dom";

const Item = ({item}: {item:IItem}) => {
    const dispatch = useAppDispatch();
    const activeShoppingList = useAppSelector(state => state.shopping._id);

    const handleAddItemToShoppingListClick: MouseEventHandler = () =>{
        dispatch(setIsLoadingTrue());
        dispatch(addNewItemToShoppingList({
            itemId: item._id,
            categoryId: item.categoryId,
            shoppingListId: activeShoppingList
        })).unwrap()
            .catch((err)=>{
                dispatch(setShowErrorTrue(err.message));
            })
            .finally(()=>{
                dispatch(setIsLoadingFalse());
            })
    }
    return (
        <li className={'category__item'}>
           <Link  className={'category__item-link'} to={`/items/${item._id}`}><p className={'category__item-name'}>{item.name}</p></Link>
            <button type={'button'} onClick={handleAddItemToShoppingListClick} className={'category__item-button'}>{}</button>
        </li>
    )
}

export default Item;
