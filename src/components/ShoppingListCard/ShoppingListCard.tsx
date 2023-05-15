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
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  let totalSum = 0;
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
    <div
      className="shopping-list-card"
      style={{ minHeight: `${innerHeight}px` }}
    >
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
                const categoryTotal = category[1].reduce((prev, value) => {
                  if (value) {
                    prev += value.price;
                  }
                  return prev;
                }, 0);
                totalSum += categoryTotal;
                return (
                  <div key={category[0]}>
                    <div className="shopping-list-card__category-section">
                      <h3 className="shopping-list-card__category">{targetCategory && targetCategory.category}</h3>
                      <p className="shopping-list-card__category-total">{`$${categoryTotal.toFixed(2)}`}</p>
                    </div>
                    <ul className="shopping-list-card__items">
                      {category[1].map((item) => {
                        const itemInItems = items.find((i) => i._id === item.itemId);
                        return (
                          <li
                            key={item.itemId}
                            className={`shopping-list-card__item ${item.status === 'completed' && 'shopping-list-card__item_completed'}`}
                          >
                            <p className="shopping-list-card__item-name">{itemInItems ? itemInItems.name : 'Unknown item'}</p>
                            <span className="shopping-list-card__item-qty">{`${item.quantity} ${item.units}`}</span>
                            <span className="shopping-list-card__item-pricePerUnit">{`$${item.pricePerUnit.toFixed(2)}`}</span>
                            <span className="shopping-list-card__item-price">{`$${item.price.toFixed(2)}`}</span>

                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
            <div className="shopping-list-card__salesTax">
              <p className="shopping-list-card__salesTax-heading">Sales Tax</p>
              <p className="shopping-list-card__salesTax-value">{`$${shoppingList?.salesTax?.toFixed(2)}`}</p>
            </div>
            <div />
            <div className="shopping-list-card__totalSum">
              <p className="shopping-list-card__totalSum-heading">Total</p>
              <p className="shopping-list-card__totalSum-value">{`$${(totalSum + (shoppingList?.salesTax || 0)).toFixed(2)}`}</p>
            </div>
            <div />
          </>
        )}
    </div>
  );
}

export default ShoppingListCard;
