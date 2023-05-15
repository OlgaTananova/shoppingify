/* This component is responsible for displaying the statistics page of the shopping
* It displays expenses by month, top items and top categories by value for the whole period */

import './Statistics.css';
import {
  ChangeEventHandler,
  useEffect, useMemo, useState,
} from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../store/hooks';
import {
  IExpensesByCategory,
  IExpensesByMonth,
  IItem, IShoppingItem, ISortedItems, IExpensesBySingleCategory,
} from '../../types';
import CategoriesByMonth from '../CategoriesByMonth/CategoriesByMonth';

function Statistics() {
  const shoppingItems = useAppSelector((state) => state.shoppingHistory.shoppingLists.map((sl) => sl.items));
  const items = useAppSelector((state) => state.items.items);
  const categories = useAppSelector((state) => state.categories.categories);
  const shoppingLists = useAppSelector((state) => state.shoppingHistory.shoppingLists);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const [spendingByMonth, setSpendingByMonth] = useState<IExpensesByMonth>({});
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const totalSum = useMemo(() => shoppingItems.reduce((prev, curr) => {
    curr && curr.forEach((i) => {
      if (i) {
        prev += i?.price || 0;
      }
    });
    return prev;
  }, 0), [shoppingItems]);

  const itemsInShoppingLists = useMemo(() => shoppingItems.reduce((prev, value) => {
    const name = (i: IShoppingItem) => items.find((v: IItem) => v._id === i.itemId);
    value && value.forEach((i) => {
      if (i && !prev[i.itemId]) {
        prev[i?.itemId] = {
          name: name(i) ? name(i)!.name : 'Unknown Item',
          price: i?.price || 0,
          share: ((i?.price || 0) / totalSum) * 100,
        };
      } else if (i) {
        prev[i.itemId].price += i?.price || 0;
        prev[i.itemId].share = ((prev[i.itemId].price + (i?.price || 0)) / totalSum) * 100;
      }
    });
    return prev;
  }, {} as ISortedItems), [items, shoppingItems, totalSum]);

  const categoriesInShoppingLists = useMemo(() => shoppingItems.reduce((prev, curr) => {
    const categoryName = (cat: IShoppingItem) => categories.find((c) => c._id === cat.categoryId);
    curr && curr.forEach((v) => {
      if (v && !prev[v.categoryId]) {
        prev[v.categoryId] = {
          name: categoryName(v) ? categoryName(v)!.category : 'Unknown category',
          price: v?.price || 0,
          share: ((v?.price || 0) / totalSum) * 100,
        };
      } else if (v) {
        prev[v.categoryId].price += v?.price || 0;
        prev[v.categoryId].share = (prev[v.categoryId].price / totalSum) * 100;
      }
    });
    return prev;
  }, {} as ISortedItems), [categories, shoppingItems, totalSum]);
  // List of top 5 items by value to display in the top items section
  const sortedItems = useMemo(() => Object.entries(itemsInShoppingLists).sort((a, b) => b[1].price - a[1].price).slice(0, 5), [itemsInShoppingLists]);
  // list of top 5 categories by value to display in the top categories section
  const sortedCategories = useMemo(() => Object.entries(categoriesInShoppingLists).sort((a, b) => b[1].price - a[1].price), [categoriesInShoppingLists]);
  //
  // const itemsByMonth = useMemo(() => shoppingLists.length !== 0 && shoppingLists.reduce((prev, value) => {
  //   const monthAndYear = () => {
  //     const date = new Date(value.date);
  //     return `${new Intl.DateTimeFormat('en-Us', { month: 'short', day: '2-digit' }).format(date)} ${date.getFullYear()}`;
  //   };
  //   if (!prev[monthAndYear()]) {
  //     prev[monthAndYear()] = {
  //       date: monthAndYear(),
  //       price: value?.items?.reduce((p, v) => {
  //         p += v?.price || 0;
  //         return p;
  //       }, 0) || 0,
  //     };
  //   } else {
  //     prev[monthAndYear()].price += value?.items?.reduce((p, v) => {
  //       p += v?.price || 0;
  //       return p;
  //     }, 0) || 0;
  //   }
  //   return prev;
  // }, {} as ISortedItemsByDate), [shoppingLists]);

  // This function calculates the total amount spent per month and per category
  useEffect(() => {
    if (shoppingLists.length !== 0) {
      // @ts-ignore
      // iterate through the shopping list
      const sortedExpenses = shoppingLists.reduce((prev, value) => {
        // generate a string with the month and year
        const monthAndYear = () => {
          const date = new Date(value.date);
          return `${new Intl.DateTimeFormat('en-Us', { month: 'short' }).format(date)} ${date.getFullYear()}`;
        };
        // if the month and year does not exist in the object, create it
        if (!prev[monthAndYear()]) {
          // @ts-ignore
          // @ts-ignore
          // inside the object, create a new object with the month and year as key
          prev[monthAndYear()] = {
            date: monthAndYear(),
            categories: value?.items?.reduce((p, v) => {
              if (!p[v!.categoryId]) {
                p[v!.categoryId] = {
                  categoryName: categories.find((c) => c._id === v?.categoryId)?.category || 'Unknown category',
                  total: v?.price || 0,
                  items: {
                    [v!.itemId]: {
                      itemName: items.find((i) => i._id === v?.itemId)?.name || 'Unknown item',
                      total: v?.price || 0,
                    },
                  },
                };
              } else {
                p[v!.categoryId]!.total += v?.price || 0;
                // @ts-ignore
                if (!p[v!.categoryId]!.items[v!.itemId]) {
                  // @ts-ignore
                  p[v!.categoryId]!.items[v!.itemId] = {
                    itemName: items.find((i) => i._id === v?.itemId)?.name || 'Unknown item',
                    total: v?.price || 0,
                  };
                } else {
                  // @ts-ignore
                  p[v!.categoryId]!.items[v!.itemId]!.total += v?.price || 0;
                }
              }
              return p;
            }, {} as IExpensesByCategory) || {},
            salesTax: value?.salesTax || 0,
            total: (value?.items?.reduce((p, v) => {
              p += v?.price || 0;
              return p;
            }, 0) || 0) + (value?.salesTax || 0),
          };
        } else {
          value?.items?.forEach((v) => {
            if (!prev[monthAndYear()].categories[v!.categoryId]) {
              prev[monthAndYear()].categories[v!.categoryId] = {
                categoryName: categories.find((c) => c._id === v?.categoryId)?.category || 'Unknown category',
                total: v?.price || 0,
                items: {
                  [v!.itemId]: {
                    itemName: items.find((i) => i._id === v?.itemId)?.name || 'Unknown item',
                    total: v?.price || 0,
                  },
                },
              };
            } else {
              prev[monthAndYear()].categories[v!.categoryId].total += v?.price || 0;
              // @ts-ignore
              if (!prev[monthAndYear()].categories[v!.categoryId].items[v!.itemId]) {
                // @ts-ignore
                prev[monthAndYear()].categories[v!.categoryId].items[v!.itemId] = {
                  itemName: items.find((i) => i._id === v?.itemId)?.name || 'Unknown item',
                  total: v?.price || 0,
                };
              } else {
                // @ts-ignore
                prev[monthAndYear()].categories[v!.categoryId].items[v!.itemId].total += v?.price || 0;
              }
            }
          });
          prev[monthAndYear()].salesTax += value?.salesTax || 0;
          prev[monthAndYear()].total += (value?.items?.reduce((p, v) => {
            p += v?.price || 0;
            return p;
          }, 0) || 0) + (value?.salesTax || 0);
        }
        return prev;
      }, {} as IExpensesByMonth);
      setSpendingByMonth(sortedExpenses);
    }
  }, [shoppingLists]);

  // This function sets the selected month to the first month in the object of expenses by month
  useEffect(() => {
    if (Object.keys(spendingByMonth).length !== 0) {
      const firstValue = Object.keys(spendingByMonth)[0];
      setSelectedMonth(firstValue);
    }
  }, [spendingByMonth]);

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (

    <div
      className="statistics"
      style={{ minHeight: `${innerHeight}px` }}
    >
      {/* Expenses by month by categories */}
      <div className="statistics__byMonth">

        <p className="statistics__ByMonth-heading">Expenses by categories</p>
        {/* month selector */}
        {
          Object.keys(spendingByMonth).length !== 0 ? (
            <select className="statistics__byMonth-month-selector" onChange={handleSelect}>
              {Object.keys(spendingByMonth).map((value, index) => (
                <option key={index} value={value}>{value}</option>))}
            </select>
          )
            : null
        }
        {/* categories container */}
        {
          Object.keys(spendingByMonth).length !== 0
            ? (spendingByMonth[selectedMonth]?.categories
                  && Object.entries(spendingByMonth[selectedMonth].categories).map((value) => (
                    <CategoriesByMonth category={value[1] as IExpensesBySingleCategory} index={value[0]} totalInMonth={spendingByMonth[selectedMonth].total} />

                  )))
            : null
}
        <div className="statistics__ByMonth-salesTax-section">
          <p className="statistics__ByMonth-salesTax-heading">Sales Tax</p>
          <p className="statistics__ByMonth-salesTax-value">{`$${spendingByMonth[selectedMonth]?.salesTax.toFixed(2) || 0}`}</p>
        </div>
        <div className="statistics__ByMonth-total-section">
          <p className="statistics__ByMonth-total-heading">Total</p>
          <p className="statistics__ByMonth-total-value">{`$${spendingByMonth[selectedMonth]?.total.toFixed(2) || 0}`}</p>
        </div>
      </div>
      {/* Top items */}
      {shoppingLists.length !== 0
        ? (
          <>
            <ul className="statistics__top-section">
              <h3 className="statistics__top-section-heading">Top Items</h3>
              {sortedItems.map((value) => (
                <li
                  className="statistics__top-unit"
                  key={value[0]}
                >
                  <p className="statistics__top-unit-name">{value[1].name}</p>
                  <span className="statistics__top-unit-share">{`${value[1].share.toFixed(2)} %`}</span>
                  <span
                    className="statistics__top-unit-line"
                    style={{ width: `${value[1].share}%` }}
                  >
                    {}
                  </span>
                </li>
              ))}
            </ul>
            {/* Top categories */}
            <ul className="statistics__top-section">
              <h3 className="statistics__top-section-heading">Top Categories</h3>
              {sortedCategories.map((value) => (
                <li
                  className="statistics__top-unit"
                  key={value[0]}
                >
                  <p className="statistics__top-unit-name">{value[1].name}</p>
                  <span className="statistics__top-unit-share">{`${value[1].share.toFixed(2)} %`}</span>
                  <span
                    className="statistics__top-unit-line statistics__top-unit-line_categories"
                    style={{ width: `${value[1].share.toFixed(2)}%` }}
                  >
                    {}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )
        : (
          <div className="statistics__nodata">
            There is no statistics data.
          </div>
        )}
    </div>
  );
}

export default Statistics;
