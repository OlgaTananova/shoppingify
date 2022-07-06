import './ShoppingHistory.css';
import {MouseEventHandler, useState} from 'react';
import ShoppingListCard from "../ShoppingListCard/ShoppingListCard";

const ShoppingHistory = () => {
    const [isShoppingListCardOpen, setIsShoppingListCardOpen] = useState(false);

    const handleShoppingListCardClick: MouseEventHandler = () => {
        setIsShoppingListCardOpen(true);
    }
    return (
        <div className={'shopping-history'}>
            {isShoppingListCardOpen? <ShoppingListCard setIsShoppingListCardOpen={setIsShoppingListCardOpen}/>
            : <>
                    <h2 className={'shopping-history__heading'}>{'Shopping history'}</h2>
                    <div className={'shopping-history__lists-by-month'}>
                        <p className={'shopping-history__month-and-year'}>August 2020</p>
                        <div onClick={handleShoppingListCardClick} className={'shopping-history__shopping-list'}>
                            <h3 className={'shopping-list__shopping-list-name'}>{'Grocery-list'}</h3>
                            <div className={'shopping-history__shopping-list-data'}>
                                <p className={'shopping-history__shopping-list__date'}>{'Mon 8.24.2020'}</p>
                                <p className={'shopping-history__shopping-list-status shopping-history__shopping-list-status_completed'}>{'completed'}</p>
                                <i className={'shopping-history__shopping-list-open-icon'}>{}</i>
                            </div>
                        </div>
                    </div>
                    <div className={'shopping-history__lists-by-month'}>
                        <p className={'shopping-history__month-and-year'}>September 2020</p>
                        <div className={'shopping-history__shopping-list'}>
                            <h3 className={'shopping-list__shopping-list-name'}>{'Grocery-list'}</h3>
                            <div className={'shopping-history__shopping-list-data'}>
                                <p className={'shopping-history__shopping-list__date'}>{'Mon 9.24.2020'}</p>
                                <p className={'shopping-history__shopping-list-status shopping-history__shopping-list-status_cancelled'}>{'cancelled'}</p>
                                <i className={'shopping-history__shopping-list-open-icon'}>{}</i>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default ShoppingHistory;
