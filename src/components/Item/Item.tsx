import './Item.css';
import {Dispatch, MouseEventHandler, SetStateAction, useState} from "react";
import {useAppDispatch} from "../../store/hooks";
import {setItemInfoOpened} from "../../store/itemInfoSlice";

const Item = ({item}: {item:string}) => {
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler = () => {
        dispatch(setItemInfoOpened());
    }
    return (
        <li onClick={handleClick} className={'category__item'}>
            <p className={'category__item-name'}>{item}</p>
            <button type={'button'} className={'category__item-button'}>{}</button>
        </li>
    )
}

export default Item;
