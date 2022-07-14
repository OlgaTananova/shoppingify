import './ShoppingHistory.css';
import {MouseEventHandler, useState} from 'react';
import ShoppingListCard from "../ShoppingListCard/ShoppingListCard";
import {useAppSelector} from "../../store/hooks";
import { Link } from 'react-router-dom';
import {current} from "@reduxjs/toolkit";
import {IShoppingList, IShoppingListByDate} from "../../types";

const ShoppingHistory = () => {
    const [isShoppingListCardOpen, setIsShoppingListCardOpen] = useState(false);
    const shoppingLists = useAppSelector(state => state.shoppingHistory)
    const handleShoppingListCardClick: MouseEventHandler = () => {
        setIsShoppingListCardOpen(true);
    }

    const shoppingListByDate = shoppingLists.reduce((prev: IShoppingListByDate, value: IShoppingList) => {
        if (!prev[value.date.toLocaleDateString('en-us', {month: 'long', year: "numeric"})]) prev[value.date.toLocaleDateString( 'en-us',{month: 'long', year: "numeric"})] = [];
        prev[value.date.toLocaleDateString('en-us', {month: 'long', year: "numeric"})].push(value)
        return prev
    }, {});

    return (
        <div className={'shopping-history'}>
            <h2 className={'shopping-history__heading'}>{'Shopping history'}</h2>
            { Object.keys(shoppingListByDate).map((list, index) => {
                return (

                        <div  key={index} className={'shopping-history__lists-by-month'}>
                            <p className={'shopping-history__month-and-year'}>{list}</p>
                            {shoppingListByDate[list].map((list) => {
                                return (
                                    <Link to={`/history/${list.id}`} key={list.id} onClick={handleShoppingListCardClick} className={'shopping-history__shopping-list'}>
                                        <h3 className={'shopping-list__shopping-list-name'}>{list.heading}</h3>
                                        <div className={'shopping-history__shopping-list-data'}>
                                            <p className={'shopping-history__shopping-list__date'}>{list.date.toDateString()}</p>
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
