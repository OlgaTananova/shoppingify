import './Item.css';
import {Dispatch, MouseEventHandler, SetStateAction, useState} from "react";

const Item = ({item, setIsItemInfoOpen}: {item:string, setIsItemInfoOpen: Dispatch<SetStateAction<boolean>>}) => {

    const handleClick: MouseEventHandler = () => {
        setIsItemInfoOpen(true);
    }
    return (
        <li onClick={handleClick} className={'category__item'}>
            <p className={'category__item-name'}>{item}</p>
            <button type={'button'} className={'category__item-button'}>{}</button>
        </li>
    )
}

export default Item;
