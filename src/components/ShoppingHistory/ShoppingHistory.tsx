import './ShoppingHistory.css';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { IShoppingList, IShoppingListByDate } from '../../types';

function ShoppingHistory() {
  const shoppingLists = useAppSelector((state) => state.shoppingHistory.shoppingLists);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const shoppingListByDate = useMemo(() => shoppingLists.length !== 0 && shoppingLists.reduce((prev: IShoppingListByDate, value: IShoppingList) => {
    const monthAndYear = () => {
      const date = new Date(value.date);
      return `${new Intl.DateTimeFormat('en-Us', { month: 'long' }).format(date)} ${date.getFullYear()}`;
    };
    if (!prev[monthAndYear()]) {
      // eslint-disable-next-line no-param-reassign
      prev[monthAndYear()] = [];
      value.status !== 'active' && prev[monthAndYear()].push(value);
    } else {
      value.status !== 'active' && prev[monthAndYear()].push(value);
    }
    return prev;
  }, {}), [shoppingLists]);

  return (
    <div
      className="shopping-history"
      style={{ minHeight: `${innerHeight}px` }}
    >
      <h2 className="shopping-history-heading">Shopping history</h2>
      {Object.entries(shoppingListByDate).map((list: [string, IShoppingList[]], index) => (
        <div
          key={index}
          className="shopping-history__lists-by-month"
        >
          <p className="shopping-history__month-and-year">{list[0]}</p>
          {list[1].map((l: IShoppingList) => {
            const modifiedDate = new Date(l.date);
            return (
              <Link
                to={`/history/${l._id}`}
                key={l._id}
                className="shopping-history__shopping-list"
              >
                <h3 className="shopping-list__shopping-list-name">{l.heading}</h3>
                <div className="shopping-history__shopping-list-data">
                  <p className="shopping-history__shopping-list__date shopping-history__shopping-list__date_long">{modifiedDate.toDateString()}</p>
                  <span className="shopping-history__shopping-list__date shopping-history__shopping-list__date_short">{modifiedDate.toLocaleDateString('en-US')}</span>
                  <p className={`shopping-history__shopping-list-status shopping-history__shopping-list-status_${l.status}`}>{l.status}</p>
                  <i className="shopping-history__shopping-list-open-icon">{}</i>
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ShoppingHistory;
