import './ShoppingHistory.css';
import {useAppSelector} from "../../store/hooks";
import {Link} from 'react-router-dom';
import { IShoppingList, IShoppingListByDate} from "../../types";
import {useMemo} from "react";

const ShoppingHistory = () => {
    const shoppingLists = useAppSelector(state => state.shoppingHistory.shoppingLists);


    const shoppingListByDate = useMemo(()=> shoppingLists.length !== 0 && shoppingLists.reduce((prev: IShoppingListByDate, value: IShoppingList) => {
        const monthAndYear = () => {
            const date = new Date(value.date);
            return `${new Intl.DateTimeFormat('en-Us', {month: 'long'}).format(date)} ${date.getFullYear()}`
        }
        if (!prev[monthAndYear()]) {
            prev[monthAndYear()] = [];
            value.status !== 'active'&& prev[monthAndYear()].push(value)
        } else {
            value.status !== 'active'&& prev[monthAndYear()].push(value);
        }
        return prev
    }, {}), [shoppingLists]);

    return (<>
            <h2 className={'shopping-history-heading'}>{'Shopping history'}</h2>
            <div className={'shopping-history'}>
                {Object.entries(shoppingListByDate).map((list: [string, IShoppingList[]], index) => {
                        return (
                            <div key={index}
                                 className={'shopping-history__lists-by-month'}>
                                <p className={'shopping-history__month-and-year'}>{list[0]}</p>
                                {list[1].map((list: IShoppingList) => {
                                    const modifiedDate = new Date(list.date);
                                    return (
                                        <Link to={`/history/${list._id}`}
                                              key={list._id}
                                              className={'shopping-history__shopping-list'}>
                                            <h3 className={'shopping-list__shopping-list-name'}>{list.heading}</h3>
                                            <div className={'shopping-history__shopping-list-data'}>
                                                <p className={'shopping-history__shopping-list__date shopping-history__shopping-list__date_long'}>{modifiedDate.toDateString()}</p>
                                                <span className={'shopping-history__shopping-list__date shopping-history__shopping-list__date_short'}>{modifiedDate.toLocaleDateString('en-US')}</span>
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
        </>
    )
}

export default ShoppingHistory;
