/* This component displays expenses by month with categories and items */
import './ExpensesByMonth.css';
import {
  ChangeEventHandler, useEffect, useMemo, useState,
} from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  IExpensesByCategory, IExpensesByMonth, IExpensesBySingleCategory,
} from '../../types';
import CategoriesByMonth from '../CategoriesByMonth/CategoriesByMonth';

export default function ExpensesByMonth() {
  const items = useAppSelector((state) => state.items.items);
  const categories = useAppSelector((state) => state.categories.categories);
  const shoppingLists = useAppSelector((state) => state.shoppingHistory.shoppingLists);
  const [spendingByMonth, setSpendingByMonth] = useState<IExpensesByMonth>({});
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  // This function calculates the total amount spent per month and per category
  useEffect(() => {
    if (shoppingLists.length !== 0) {
      // iterate through the shopping list
      const sortedExpenses = shoppingLists.reduce((prev, value) => {
        // generate a string with the month and year
        const monthAndYear = () => {
          let date = new Date(value.date);
          if (Number.isNaN(date.getTime())) {
            date = new Date();
          }
          return `${new Intl.DateTimeFormat('en-Us', { month: 'short' }).format(date)} ${date.getFullYear()}`;
        };
        // if the month and year does not exist in the object, create it
        if (!prev[monthAndYear()]) {
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
                if (!p[v!.categoryId].items[v!.itemId]) {
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

  // This function sets the selected month to the last month
  useEffect(() => {
    if (sortedSpendingByMonth.length !== 0) {
      const firstValue = sortedSpendingByMonth[0][0];
      setSelectedMonth(firstValue);
    }
  }, [spendingByMonth]);

  const handleSelectMonth: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedMonth(e.target.value);
  };
  // sort the expenses by month in descending order
  const sortedSpendingByMonth = useMemo(() => Object.entries(spendingByMonth).sort((a, b) => {
    const dateA = new Date(a[1].date);
    const dateB = new Date(b[1].date);
    return dateB.getTime() - dateA.getTime();
  }), [spendingByMonth]);
  return (
    <div className="statistics__byMonth">

      <p className="statistics__ByMonth-heading">Expenses by month</p>
      {/* month selector */}
      {
            Object.keys(spendingByMonth).length !== 0 ? (
              <select className="statistics__byMonth-month-selector" onChange={handleSelectMonth}>
                {sortedSpendingByMonth.map((value, index) => (
                  <option key={index} value={value[0]}>{value[0]}</option>))}
              </select>
            )
              : null
        }
      {/* categories container */}
      {
            Object.keys(spendingByMonth).length !== 0
              ? (spendingByMonth[selectedMonth]?.categories
                    && Object.entries(spendingByMonth[selectedMonth].categories).map((value) => (
                      <CategoriesByMonth category={value[1] as IExpensesBySingleCategory} key={value[0]} index={value[0]} totalInMonth={spendingByMonth[selectedMonth].total} />

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
  );
}
