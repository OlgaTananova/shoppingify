import './ShoppingCategory.css';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import { IShoppingItem } from '../../types';
import { useAppSelector } from '../../store/hooks';

function ShoppingCategory({ items, categoryId }:
{ items: IShoppingItem[], categoryId: string }) {
  const category = useAppSelector((state) => state.categories.categories.find((value) => categoryId === value._id));

  return (
    <div className="shopping-list__category">
      <h3 className="shopping-list__category-heading">{category && category.category}</h3>
      {
                items.map((item) => (
                  <ShoppingItem item={item} key={item.itemId} />
                ))
            }
    </div>
  );
}

export default ShoppingCategory;
