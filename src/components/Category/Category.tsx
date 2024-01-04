import './Category.css';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import Item from '../Item/Item';
import ShowMoreBtn from '../ShowMoreBtn/ShowMoreBtn';
import { NUMBER_OF_ADD_ITEMS, NUMBER_OF_ITEMS } from '../../constants';
import { ICategory, IItem } from '../../types';
import { useAppSelector } from '../../store/hooks';
import ShowLessBtn from '../ShowLessBtn/ShowLessBtn';

function Category({ category }: { category: ICategory }) {
  const items = useAppSelector((state) => state.items.items);
  const [itemsInCategory, setItemsInCategory] = useState<IItem[]>([]);
  const [showedItems, setShowedItems] = useState<IItem[]>([]);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [numberOfItemsInRow, setNumberOfItemsInRow] = useState<number>(0);

  useEffect(() => {
    if (containerWidth >= 800) {
      setNumberOfItemsInRow(NUMBER_OF_ITEMS);
    } else if (containerWidth >= 680 && containerWidth < 800) {
      setNumberOfItemsInRow(NUMBER_OF_ITEMS - 1);
    } else if (containerWidth >= 380 && containerWidth < 680) {
      setNumberOfItemsInRow(NUMBER_OF_ITEMS - 2);
    } else if (containerWidth >= 300 && containerWidth < 380) {
      setNumberOfItemsInRow(NUMBER_OF_ITEMS - 3);
    } else if (containerWidth < 300) {
      setNumberOfItemsInRow(NUMBER_OF_ITEMS - 4);
    }
  }, [containerWidth]);

  useEffect(() => {
    const filter = items.filter((item) => item.categoryId === category._id);
    setItemsInCategory(filter);
  }, [items, category]);

  useEffect(() => {
    setShowedItems(itemsInCategory.slice(0, numberOfItemsInRow));
  }, [itemsInCategory, numberOfItemsInRow]);

  const traceContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', traceContainerWidth);
    return () => {
      window.removeEventListener('resize', traceContainerWidth);
    };
  }, []);

  useEffect(() => {
    traceContainerWidth();
  }, []);

  const handleShowMoreBtnClick: MouseEventHandler = () => {
    setShowedItems(
      itemsInCategory.slice(0, showedItems.length + numberOfItemsInRow),
    );
  };

  const handleShowLessClick: MouseEventHandler = () => {
    const itemsToSubtract =
      showedItems.length % numberOfItemsInRow === 0
        ? numberOfItemsInRow
        : showedItems.length % numberOfItemsInRow;
    setShowedItems(
      itemsInCategory.slice(0, showedItems.length - (itemsToSubtract || 0)),
    );
  };

  return (
    <div className="category" ref={containerRef}>
      <h3 className="category__heading">{category.category}</h3>
      <ul className="category__item-list">
        {showedItems.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </ul>
      <div className="category__buttons">
        {showedItems.length < itemsInCategory.length ? (
          <ShowMoreBtn onClick={handleShowMoreBtnClick} />
        ) : null}
        {showedItems.length > numberOfItemsInRow &&
        showedItems.length <= itemsInCategory.length ? (
          <ShowLessBtn onClick={handleShowLessClick} />
        ) : null}
      </div>
    </div>
  );
}

export default Category;
