import './ShoppingListCard.css';
import {MouseEventHandler} from "react";
import {useAppSelector} from "../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";

const ShoppingListCard = () => {
    const {shoppingListId} = useParams<string>();
    const navigate = useNavigate();
    const shoppingList = useAppSelector(state => state.shoppingHistory.find(
        (shoppingList) => (shoppingList.id === shoppingListId)
    ));

    const handleClick: MouseEventHandler = () => {
        navigate(-1)
    }

    return (
        <div className={'shopping-list-card'}>
            <button onClick={handleClick}
                    className={'item-info__return-btn'}
                    type={'button'}>back
            </button>
            {!shoppingList ?
                <div>{'ShoppingList not found!'}</div>
                :
                <>
                    <h2 className={'shopping-list-card__heading'}>{shoppingList.heading}</h2>
                    <p className={'shopping-list-card__date'}>{shoppingList.date.toDateString()}</p>
                    {shoppingList.categories.map((category, index) => {
                        return (
                            <div key={index}>
                                <h3 className={'shopping-list-card__category'}>{category.name}</h3>
                                <ul className={'shopping-list-card__items'}>
                                    {category.items.map((item, index) =>
                                        <li key={index}
                                            className={'shopping-list-card__item'}>
                                            <p className={'shopping-list-card__item-name'}>{item[0]}</p>
                                            <span className={'shopping-list-card__item-qty'}>{`${item[1]} pcs`}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                        )
                    })
                    }
                </>
            }
        </div>
    )
}

export default ShoppingListCard;
