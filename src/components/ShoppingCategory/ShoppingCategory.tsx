/*
* */
import './ShoppingCategory.css';
import { useEffect, useState } from 'react';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import { IShoppingItem } from '../../types';
import { useAppSelector } from '../../store/hooks';

function ShoppingCategory({ items, categoryId }:
{ items: IShoppingItem[], categoryId: string }) {
  const category = useAppSelector((state) => state.categories.categories.find((value) => categoryId === value._id));
  const [categoryTotal, setCategoryTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    items?.forEach((item) => {
      const itemPrice = item?.price || 0;
      total += itemPrice;
    });
    setCategoryTotal(total);
  }, [items]);
  return (
    <div className="shopping-list__category">
      <div className="shopping-list__category-header">
        <h3 className="shopping-list__category-heading">{category && category.category}</h3>
        <span className="shopping-list__category-total">{`$ ${categoryTotal.toFixed(2)}`}</span>
      </div>
      {
                items.map((item) => (
                  <ShoppingItem item={item} key={item.itemId} />
                ))
            }
    </div>
  );
}

export default ShoppingCategory;
