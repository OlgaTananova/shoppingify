/* This component is responsible for displaying the statistics page of the shopping
 * It displays expenses by month, top items and top categories by value for the whole period */

import './Statistics.css';
import {useMemo} from 'react';
import {useAppSelector} from '../../store/hooks';
import {IItem, IShoppingItem, ISortedItems} from '../../types';
import ExpensesByMonth from '../ExpensesByMonth/ExpensesByMonth';
import ExpensesByYear from '../ExpensesByYear/ExpensesByYear';

function Statistics() {
    const shoppingItems = useAppSelector((state) =>
        state.shoppingHistory.shoppingLists.map((sl) => sl.items),
    );
    const items = useAppSelector((state) => state.items.items);
    const categories = useAppSelector((state) => state.categories.categories);
    const shoppingLists = useAppSelector(
        (state) => state.shoppingHistory.shoppingLists,
    );
    const innerHeight = useAppSelector((state) => state.app.innerHeight);
    const totalSum = useMemo(() => {
        const result = shoppingItems.reduce((prev, curr) => {
            curr &&
            curr.forEach((i) => {
                if (i) {
                    prev += i?.price || 0;
                }
            });
            return prev;
        }, 0);
        return result === 0 ? 1 : result;
    }, [shoppingItems]);

    const topItems = useMemo(
        () =>
            shoppingItems.reduce((prev, value) => {
                const name = (i: IShoppingItem) =>
                    items.find((v: IItem) => v._id === i.itemId);
                value &&
                value.forEach((i) => {
                    if (i && !prev[i.itemId]) {
                        prev[i?.itemId] = {
                            name: name(i) ? name(i)!.name : 'Unknown Item',
                            price: i?.price || 0,
                            share: ((i?.price || 0) / totalSum) * 100,
                        };
                    } else if (i) {
                        prev[i.itemId].price += i?.price || 0;
                        prev[i.itemId].share =
                            ((prev[i.itemId].price + (i?.price || 0)) / totalSum) * 100;
                    }
                });
                return prev;
            }, {} as ISortedItems),
        [items, shoppingItems, totalSum],
    );

    const topCategories = useMemo(
        () =>
            shoppingItems.reduce((prev, curr) => {
                const categoryName = (cat: IShoppingItem) =>
                    categories.find((c) => c._id === cat.categoryId);
                curr &&
                curr.forEach((v) => {
                    if (v && !prev[v.categoryId]) {
                        prev[v.categoryId] = {
                            name: categoryName(v)
                                ? categoryName(v)!.category
                                : 'Unknown category',
                            price: v?.price || 0,
                            share: ((v?.price || 0) / totalSum) * 100,
                        };
                    } else if (v) {
                        prev[v.categoryId].price += v?.price || 0;
                        prev[v.categoryId].share =
                            (prev[v.categoryId].price / totalSum) * 100;
                    }
                });
                return prev;
            }, {} as ISortedItems),
        [categories, shoppingItems, totalSum],
    );
    // List of top 5 items by value to display in the top items section
    const topSortedItems = useMemo(
        () =>
            Object.entries(topItems)
                .sort((a, b) => b[1].price - a[1].price)
                .slice(0, 5),
        [topItems],
    );
    // list of top categories by value to display in the top categories section
    const topSortedCategories = useMemo(
        () => Object.entries(topCategories).sort((a, b) => b[1].price - a[1].price),
        [topCategories],
    );

    return (
        <div className="statistics" style={{minHeight: `${innerHeight}px`}}>
            { /*<ExpensesByMonth />*/}
            <ExpensesByYear/>
            {shoppingLists.length !== 0 ? (
                <>
                    {/* Top categories */}
                    <ul className="statistics__top-section">
                        <h3 className="statistics__top-section-heading">Top Categories</h3>
                        {topSortedCategories.map((value) => (
                            <li className="statistics__top-unit" key={value[0]}>
                                <p className="statistics__top-unit-name">{value[1].name}</p>
                                <span className="statistics__top-unit-share">{`${value[1].share.toFixed(
                                    2,
                                )} %`}</span>
                                <span
                                    className="statistics__top-unit-line statistics__top-unit-line_categories"
                                    style={{width: `${value[1].share.toFixed(2)}%`}}
                                >
                  {}
                </span>
                            </li>
                        ))}
                    </ul>
                    {/* Top Items */}
                    <ul className="statistics__top-section">
                        <h3 className="statistics__top-section-heading">Top Items</h3>
                        {topSortedItems.map((value) => (
                            <li className="statistics__top-unit" key={value[0]}>
                                <p className="statistics__top-unit-name">{value[1].name}</p>
                                <span className="statistics__top-unit-share">{`${value[1].share.toFixed(
                                    2,
                                )} %`}</span>
                                <span
                                    className="statistics__top-unit-line"
                                    style={{width: `${value[1].share}%`}}
                                >
                  {}
                </span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="statistics__nodata">There is no statistics data.</div>
            )}
        </div>
    );
}

export default Statistics;
