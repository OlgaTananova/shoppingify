import './ExpensesByYear.css';
import { ChangeEventHandler, useEffect, useState } from 'react';
import {
  IExpensesByCategory, IExpensesByMonth, IExpensesBySingleCategory, IExpensesByYear,
} from '../../types';
import { useAppSelector } from '../../store/hooks';
import CategoriesByMonth from '../CategoriesByMonth/CategoriesByMonth';

export default function ExpensesByYear() {
  const items = useAppSelector((state) => state.items.items);
  const categories = useAppSelector((state) => state.categories.categories);
  const shoppingLists = useAppSelector((state) => state.shoppingHistory.shoppingLists);
  const [spendingByYear, setSpendingByYear] = useState<IExpensesByYear>({});
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const sortedExpensesByYear = shoppingLists.reduce((prev, value) => {
      const year = new Date(value.date).getFullYear().toString();
      if (!prev[year]) {
        prev[year] = {
          date: year,
          categories: value?.items?.reduce((pr, vl) => {
            if (!pr[vl!.categoryId]) {
              pr[vl!.categoryId] = {
                categoryName: categories.find((c) => c._id === vl?.categoryId)?.category || 'Unknown category',
                total: vl?.price || 0,
                items: {
                  [vl!.itemId]: {
                    itemName: items.find((i) => i._id === vl?.itemId)?.name || 'Unknown item',
                    total: vl?.price || 0,
                  },
                },
              };
            } else {
              pr[vl!.categoryId].total += vl?.price || 0;
              // @ts-ignore
              if (!pr[vl!.categoryId].items[vl!.itemId]) {
                // @ts-ignore
                pr[vl!.categoryId].items[vl!.itemId] = {
                  itemName: items.find((i) => i._id === vl?.itemId)?.name || 'Unknown item',
                  total: vl?.price || 0,
                };
              } else {
                // @ts-ignore
                pr[vl!.categoryId].items[vl!.itemId].total += vl?.price || 0;
              }
            }
            return pr;
          }, {} as IExpensesByCategory) || {},
          total: (value?.items?.reduce((p, v) => {
            p += v?.price || 0;
            return p;
          }, 0) || 0) + (value?.salesTax || 0),
          salesTax: value?.salesTax || 0,
        };
      } else {
        // @ts-ignore
        prev[year].total += (value?.items?.reduce((p, v) => {
          p += v?.price || 0;
          return p;
        }, 0) || 0) + (value?.salesTax || 0);
        // @ts-ignore
        prev[year].salesTax += value?.salesTax || 0;
        value?.items?.forEach((v) => {
          if (!prev[year].categories[v!.categoryId]) {
            prev[year].categories[v!.categoryId] = {
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
            // @ts-ignore
            prev[year].categories[v!.categoryId].total += v?.price || 0;
            // @ts-ignore
            if (!prev[year].categories[v!.categoryId].items[v!.itemId]) {
              // @ts-ignore
              prev[year].categories[v!.categoryId].items[v!.itemId] = {
                itemName: items.find((i) => i._id === v?.itemId)?.name || 'Unknown item',
                total: v?.price || 0,
              };
            } else {
              // @ts-ignore
              prev[year].categories[v!.categoryId].items[v!.itemId].total += v?.price || 0;
            }
          }
        });
      }
      return prev;
    }, {} as IExpensesByYear);
    setSpendingByYear(sortedExpensesByYear);
  }, [shoppingLists]);

  // This function sets the selected year to the first year in the object of expenses by year
  useEffect(() => {
    if (Object.keys(spendingByYear).length !== 0) {
      const firstValue = Object.keys(spendingByYear)[0];
      setSelectedYear(firstValue);
    }
  }, [spendingByYear]);

  const handleSelectYear: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <div className="statistics__byYear">

      <p className="statistics__byYear-heading">Expenses by year</p>
      {/* year selector */}
      {
          Object.keys(spendingByYear).length !== 0 ? (
            <select className="statistics__byYear-month-selector" onChange={handleSelectYear}>
              {Object.keys(spendingByYear).map((value, index) => (
                <option key={index} value={value}>{value}</option>))}
            </select>
          )
            : null
        }
      {/* categories container */}
      {
          Object.keys(spendingByYear).length !== 0
            ? (spendingByYear[selectedYear]?.categories
                  && Object.entries(spendingByYear[selectedYear].categories).map((value) => (
                    <CategoriesByMonth category={value[1] as IExpensesBySingleCategory} index={value[0]} totalInMonth={spendingByYear[selectedYear].total} />

                  )))
            : null
        }
      <div className="statistics__byYear-salesTax-section">
        <p className="statistics__byYear-salesTax-heading">Sales Tax</p>
        <p className="statistics__byYear-salesTax-value">{`$${spendingByYear[selectedYear]?.salesTax.toFixed(2) || 0}`}</p>
      </div>
      <div className="statistics__byYear-total-section">
        <p className="statistics__byYear-total-heading">Total</p>
        <p className="statistics__byYear-total-value">{`$${spendingByYear[selectedYear]?.total.toFixed(2) || 0}`}</p>
      </div>
    </div>
  );
}
