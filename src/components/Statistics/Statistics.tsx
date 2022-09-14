import './Statistics.css';
import {useAppSelector} from "../../store/hooks";
import {ISorderItemsByDate, ISortedItems} from "../../types";
import {useMemo} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from "recharts";

const Statistics = () => {
    const shoppingItems = useAppSelector(state => state.shoppingHistory.shoppingLists.map((sl) => {
        return sl.items;
    }));
    const items = useAppSelector(state => state.items.items);
    const categories = useAppSelector(state => state.categories.categories);
    const shoppingLists = useAppSelector(state => state.shoppingHistory.shoppingLists);


    const totalQty = useMemo(()=> shoppingItems.reduce((prev, curr) => {
        curr && curr.forEach((i) => {
            if (i) {
                prev += i.quantity;
            }
        });
        return prev
    }, 0), [shoppingItems]);

    const itemsInShoppingLists = useMemo(()=> shoppingItems.reduce((prev, value) => {
        value && value.forEach((i) => {
            if (i && !prev[i.itemId]) {
                prev[i.itemId] = {
                    quantity: i.quantity,
                    name: items.find((v) => {
                        return v._id === i.itemId;
                    })!.name,
                    share: Math.ceil(i.quantity / totalQty * 100),
                };
            } else if (i) {
                prev[i.itemId] = {
                    quantity: prev[i.itemId].quantity += i.quantity,
                    name: items.find((v) => {
                        return v._id === i.itemId;
                    })!.name,
                    share: Math.ceil(i.quantity / totalQty * 100),
                };
            }
        })
        return prev;
    }, {} as ISortedItems), [items, shoppingItems, totalQty]);

    const categoriesInShoppingLists = useMemo(()=> shoppingItems.reduce((prev, curr) => {
        curr && curr.forEach((v) => {
            if (v && !prev[v.categoryId]) {
                prev[v.categoryId] = {
                    quantity: v.quantity,
                    name: categories.find((c) => {
                        return c._id === v.categoryId
                    })!.category,
                    share: Math.ceil(v.quantity / totalQty * 100)
                }
            } else if (v) {
                prev[v.categoryId] = {
                    quantity: prev[v.categoryId].quantity + v.quantity,
                    name: categories.find((c) => {
                        return c._id === v.categoryId
                    })!.category,
                    share: Math.ceil(prev[v.categoryId].quantity / totalQty * 100)
                }
            }
        })
        return prev;
    }, {} as ISortedItems), [categories, shoppingItems, totalQty]);

    const sortedItems = useMemo(()=> Object.entries(itemsInShoppingLists).sort((a, b) => {
        return b[1].share - a[1].share
    }).slice(0, 5), [itemsInShoppingLists]);

    const sortedCategories = useMemo(()=> Object.entries(categoriesInShoppingLists).sort((a, b) => {
        return b[1].share - a[1].share
    }), [categoriesInShoppingLists]);

    const itemsByMonth= useMemo(()=> shoppingLists.length !== 0 && shoppingLists.reduce((prev, value) => {
        const monthAndYear = () => {
            const date = new Date(value.date);
            return `${new Intl.DateTimeFormat('en-Us', {month: 'short', day: '2-digit'}).format(date)} ${date.getFullYear()}`
        }
        if (!prev[monthAndYear()]) {
            prev[monthAndYear()] = {
                date: monthAndYear(),
                quantity: (value.items&& value.items.reduce((prev, curr)=>{
                    prev += curr!.quantity;
                    return prev
                }, 0)) || 0,
            };

        } else {
            prev[monthAndYear()] = {
                date: monthAndYear(),
                quantity: prev[monthAndYear()].quantity + ((value.items&& value.items.reduce((prev, curr)=>{
                    prev += curr!.quantity;
                    return prev
                }, 0)) || 0)
            }
        }
        return prev
    }, {} as ISorderItemsByDate), [shoppingLists]);

    return (
        <div className={'statistics'}>
            {shoppingLists.length !== 0 ?
                <>
                    <ul className={'statistics__top-section'}>
                        <h3 className={'statistics__top-section-heading'}>Top Items</h3>
                        {sortedItems.map((value) => {
                            return (
                                <li className={'statistics__top-unit'}
                                    key={value[0]}>
                                    <p className={'statistics__top-unit-name'}>{value[1].name}</p>
                                    <span className={'statistics__top-unit-share'}>{`${value[1].share} %`}</span>
                                    <span className={'statistics__top-unit-line'}
                                          style={{width: `${value[1].share}%`}}>{}</span>
                                </li>
                            )
                        })
                        }
                    </ul>
                    <ul className={'statistics__top-section'}>
                        <h3 className={'statistics__top-section-heading'}>Top Categories</h3>
                        {sortedCategories.map((value) => {
                            return (
                                <li className={'statistics__top-unit'}
                                    key={value[0]}>
                                    <p className={'statistics__top-unit-name'}>{value[1].name}</p>
                                    <span className={'statistics__top-unit-share'}>{`${value[1].share} %`}</span>
                                    <span className={'statistics__top-unit-line statistics__top-unit-line_categories'}
                                          style={{width: `${value[1].share}%`}}>{}</span>
                                </li>
                            )
                        })
                        }
                    </ul>
                    <div className={'statistics__graph'}>
                        <h3 className={'statistics__graph-heading'}>Summary</h3>
                        <ResponsiveContainer width={'99%'}
                                             height={'70%'}>
                            <LineChart width={800}
                                       height={300}
                                       data={Object.values(itemsByMonth)}
                                       margin={{top: 5, right: 40, bottom: 0, left: 0}}
                                       title={'Summary'}>
                                <Line dataKey={'quantity'}
                                      type={'monotone'}/>
                                <CartesianGrid stroke="#ccc"
                                               strokeDasharray="5 5"/>
                                <XAxis dataKey={'date'}/>
                                <YAxis/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
                : <div className={'statistics__nodata'}>
                    There is no statistics data.
                </div>}
        </div>
    )
}

export default Statistics;
