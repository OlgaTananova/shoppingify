import './ShoppingHistory.css';
import {useAppSelector} from "../../store/hooks";
import {Link} from 'react-router-dom';
import {IShoppingItem, IShoppingList, IShoppingListByDate} from "../../types";

const ShoppingHistory = () => {
    const shoppingLists = useAppSelector(state => state.shoppingHistory.shoppingLists);


    const shoppingListByDate = shoppingLists.length !== 0 && shoppingLists.reduce((prev: IShoppingListByDate, value: IShoppingList) => {
        if (!prev[value.date]) {
            prev[value.date] = [];
            prev[value.date].push(value)
        } else {
            prev[value.date].push(value);
        }
        return prev
    }, {});

    return (
        <div className={'shopping-history'}>
             <h2 className={'shopping-history__heading'}>{'Shopping history'}</h2>
           {Object.entries(shoppingListByDate).map((list:[string, IShoppingList[]], index) => {
                    const modifiedDate = new Date(list[0]);
                    return (
                        <div key={index}
                             className={'shopping-history__lists-by-month'}>
                             <p className={'shopping-history__month-and-year'}>{modifiedDate.toLocaleDateString('us-en', {
                                year: 'numeric',
                                month: 'long'
                            })}</p>
                            {list[1].map((list: IShoppingList) => {
                                const modifiedDate = new Date(list.date);
                                return (
                                    <Link to={`/history/${list._id}`}
                                          key={list._id}
                                          className={'shopping-history__shopping-list'}>
                                        <h3 className={'shopping-list__shopping-list-name'}>{list.heading}</h3>
                                        <div className={'shopping-history__shopping-list-data'}>
                                             <p className={'shopping-history__shopping-list__date'}>{modifiedDate.toDateString()}</p>
                                             <p className={`shopping-history__shopping-list-status shopping-history__shopping-list-status_${list.status}`}>{list.status}</p>
                                             <i className={'shopping-history__shopping-list-open-icon'}>{}</i>
                                         </div>
                                     </Link>
                                )
                            })}
                         </div>)
                }
            )
            }
        </div>
    )
}

export default ShoppingHistory;
