/* This component is used to render the categories by month in the Expenses by Month
section  in the Statistics page. */
import './CategoriesByMonth.css';
import { MouseEventHandler, useState } from 'react';
import { IExpensesBySingleCategory } from '../../types';

export default function CategoriesByMonth({
  category,
  index,
  totalInMonth,
}: {
  category: IExpensesBySingleCategory;
  index: string;
  totalInMonth: number;
}) {
  // This state is used to toggle the items in the category.
  const [isItemsOpened, setIsItemsOpened] = useState(false);

  const handleOpenItemsClick: MouseEventHandler = (e) => {
    setIsItemsOpened(!isItemsOpened);
  };
  return (
    <div>
      <div key={index} className="statistics__ByMonth-categories">
        <div className="statistics__ByMonth-categories-section">
          <button
            className="statistics__ByMonth-categories-section-showItemsButton"
            type="button"
            onClick={handleOpenItemsClick}
          >
            {}
          </button>
          <p className="statistics__ByMonth-categories-section-name">
            {category.categoryName}
          </p>
          <p className="statistics__ByMonth-categories-section-value">{`% ${
            category.total !== 0
              ? ((category.total / totalInMonth) * 100).toFixed(2)
              : (category.total * 100).toFixed(2)
          }`}</p>
          <p className="statistics__ByMonth-categories-section-value">{`$ ${category?.total.toFixed(
            2,
          )}`}</p>
        </div>
        <div className="statistics__ByMonth-categories-section-items">
          {isItemsOpened &&
            category.items &&
            Object.values(category.items).map((i, idx) => (
              <div
                key={idx}
                className="statistics__ByMonth-categories-section-item"
              >
                <p className="statistics__ByMonth-categories-section-item-name">
                  {i.itemName}
                </p>
                <p className="statistics__ByMonth-categories-section-item-value">{`$ ${i.total.toFixed(
                  2,
                )}`}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
