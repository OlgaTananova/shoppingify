import './ShoppingListCard.css';
import {shoppingList} from "../../data";
import {Dispatch, MouseEventHandler, SetStateAction} from "react";
import {useAppSelector} from "../../store/hooks";

const ShoppingListCard = ({setIsShoppingListCardOpen}: {setIsShoppingListCardOpen: Dispatch<SetStateAction<boolean>>}) => {
    const handleClick: MouseEventHandler = () => {
      setIsShoppingListCardOpen(false);
    }

    return (
        <div className={'shopping-list-card'}>
            <button onClick={handleClick}
                    className={'item-info__return-btn'}
                    type={'button'}>back
            </button>
            <h2 className={'shopping-list-card__heading'}>{'Grocery list'}</h2>
            <p className={'shopping-list-card__date'}>{'Mon 8.24.2020'}</p>
            <h3 className={'shopping-list-card__category'}>{'Beverages'}</h3>
            <ul className={'shopping-list-card__items'}>
                <li className={'shopping-list-card__item'}>
                    <p className={'shopping-list-card__item-name'}>{'Fanta'}</p>
                    <span className={'shopping-list-card__item-qty'}>{'3 pcs'}</span>
                </li>
                <li className={'shopping-list-card__item'}>
                    <p className={'shopping-list-card__item-name'}>{'Cola'}</p>
                    <span className={'shopping-list-card__item-qty'}>{'1 pcs'}</span>
                </li>
                <li className={'shopping-list-card__item'}>
                    <p className={'shopping-list-card__item-name'}>{'Cola'}</p>
                    <span className={'shopping-list-card__item-qty'}>{'1 pcs'}</span>
                </li>
                <li className={'shopping-list-card__item'}>
                    <p className={'shopping-list-card__item-name'}>{'Cola'}</p>
                    <span className={'shopping-list-card__item-qty'}>{'1 pcs'}</span>
                </li>
                <li className={'shopping-list-card__item'}>
                    <p className={'shopping-list-card__item-name'}>{'Cola'}</p>
                    <span className={'shopping-list-card__item-qty'}>{'1 pcs'}</span>
                </li>

            </ul>
        </div>
    )
}

export default ShoppingListCard;
