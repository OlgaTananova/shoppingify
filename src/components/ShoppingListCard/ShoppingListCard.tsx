import './ShoppingListCard.css';
import { MouseEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { IShoppingCategory } from '../../types';

function ShoppingListCard() {
  const { shoppingListId } = useParams<string>();
  const navigate = useNavigate();
  const shoppingList = useAppSelector((state) => state.shoppingHistory.shoppingLists.find(
    (SL) => SL._id === shoppingListId,
  )) || null;
  const categories = useAppSelector((state) => state.categories.categories);
  const items = useAppSelector((state) => state.items.items);

  const handleClick: MouseEventHandler = () => {
    navigate(-1);
  };

  const itemsByCategory = shoppingList!.items!.reduce((prev, value) => {
    if (value) {
      if (!prev[value.categoryId]) {
        prev[value.categoryId] = [];
        prev[value.categoryId].push(value);
      } else {
        prev[value.categoryId].push(value);
      }
    }
    return prev;
  }, {} as IShoppingCategory);

  return (
    <div className="shopping-list-card">
      <button
        onClick={handleClick}
        className="item-info__return-btn"
        type="button"
      >
        back
      </button>
      {!shoppingList
        ? <div>ShoppingList not found!</div>
        : (
          <>
            <h2 className="shopping-list-card__heading">{shoppingList.heading}</h2>
            <p className="shopping-list-card__date">{new Date(shoppingList.date).toDateString()}</p>
            {itemsByCategory && Object.entries(itemsByCategory).map((category: [string, unknown]) => {
              if (category[1] instanceof Array) {
                const targetCategory = categories.find((value) => value._id === category[0]);
                return (
                  <div key={category[0]}>
                    <h3 className="shopping-list-card__category">{targetCategory && targetCategory.category}</h3>
                    <ul className="shopping-list-card__items">
                      {category[1].map((item) => {
                        const itemInItems = items.find((i) => i._id === item.itemId);
                        return (
                          <li
                            key={item.itemId}
                            className={`shopping-list-card__item ${item.status === 'completed' && 'shopping-list-card__item_completed'}`}
                          >
                            <p className="shopping-list-card__item-name">{itemInItems && itemInItems.name}</p>
                            <span className="shopping-list-card__item-qty">{`${item.quantity} pcs`}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                );
              }
              return null;
            })}
          </>
        )}
    </div>
  );
}

export default ShoppingListCard;
