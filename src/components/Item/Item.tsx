import './Item.css';
import {IItem} from "../../types";
import {MouseEventHandler} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {addNewItemToShoppingList, createNewShoppingList} from "../../store/shoppingSlice";
import {Link} from "react-router-dom";

const Item = ({item}: {item:IItem}) => {
    const dispatch = useAppDispatch();
    const activeShoppingList = useAppSelector(state => state.shopping);

    const handleAddItemToShoppingListClick: MouseEventHandler = () =>{
        if (activeShoppingList.status === 'idle') {
            dispatch(setIsLoadingTrue());
            dispatch(createNewShoppingList({
                itemId: item._id,
                categoryId: item.categoryId,
            })).unwrap()
                .then(()=> {

                })
                .catch((err)=> {
                    dispatch(setShowErrorTrue(err.message));
                })
                .finally(()=>{
                    dispatch(setIsLoadingFalse());
                })
        } else {
            dispatch(setIsLoadingTrue());
            dispatch(addNewItemToShoppingList({
                itemId: item._id,
                categoryId: item.categoryId,
                shoppingListId: activeShoppingList._id
            })).unwrap()
                .catch((err)=>{
                    dispatch(setShowErrorTrue(err.message));
                })
                .finally(()=>{
                    dispatch(setIsLoadingFalse());
                })
        }

    }
    return (
        <li className={'category__item'}>
           <Link  className={'category__item-link'} to={`/items/${item._id}`}><p className={'category__item-name'}>{item.name}</p></Link>
            <button type={'button'} onClick={handleAddItemToShoppingListClick} className={'category__item-button'}>{}</button>
        </li>
    )
}

export default Item;
