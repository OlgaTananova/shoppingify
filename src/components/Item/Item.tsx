import './Item.css';
import {IItem} from "../../types";

const Item = ({item}: {item:IItem}) => {

    return (
        <li className={'category__item'}>
            <p className={'category__item-name'}>{item.name}</p>
            <button type={'button'} className={'category__item-button'}>{}</button>
        </li>
    )
}

export default Item;
