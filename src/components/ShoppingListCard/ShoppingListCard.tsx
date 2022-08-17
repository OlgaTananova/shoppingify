import './ShoppingListCard.css';
import {MouseEventHandler} from "react";
import {useAppSelector} from "../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {IShoppingCategory, IShoppingItem} from "../../types";

const ShoppingListCard = () => {
    const {shoppingListId} = useParams<string>();
    const navigate = useNavigate();
    const shoppingList = useAppSelector(state => state.shoppingHistory.shoppingLists.find(
        (shoppingList) =>shoppingList._id === shoppingListId)) || null;
    const categories = useAppSelector(state => state.categories.categories);
    const items = useAppSelector(state => state.items.items);

    const handleClick: MouseEventHandler = () => {
        navigate(-1)
    }

    // @ts-ignore
    const itemsByCategory = shoppingList!.items!.reduce((prev: IShoppingCategory, value: IShoppingItem)=>{
        if (!prev[value.categoryId]) {
            prev[value.categoryId] = [];
            prev[value.categoryId].push(value)
        } else {
            prev[value.categoryId].push(value)
        }
        return prev
    }, {});

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
                    <p className={'shopping-list-card__date'}>{new Date(shoppingList.date).toDateString()}</p>
                    {itemsByCategory && Object.entries(itemsByCategory).map((category: [string, unknown]) => {
                        if (category[1] instanceof Array) {
                            const targetCategory = categories.find((value) => {
                                return value._id === category[0];
                            })
                            return (
                                <div key={category[0]}>
                                    <h3 className={'shopping-list-card__category'}>{targetCategory && targetCategory.category}</h3>
                                    <ul className={'shopping-list-card__items'}>
                                        {category[1].map((item) => {
                                            const itemInItems = items.find((i) => {
                                                return i._id === item.itemId;
                                            });
                                            return (<li key={item.itemId}
                                                        className={`shopping-list-card__item ${item.status === 'completed'&& 'shopping-list-card__item_completed'}`}>
                                                    <p className={'shopping-list-card__item-name'}>{itemInItems && itemInItems.name}</p>
                                                    <span className={'shopping-list-card__item-qty'}>{`${item.quantity} pcs`}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                            )
                        } else {
                            return null
                        }})
                    }
                </>
            }
        </div>
    )
}

export default ShoppingListCard;
