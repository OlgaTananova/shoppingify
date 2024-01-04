/* This component displays items in categories */
import './Item.css';
import { MouseEventHandler, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setIsLoadingFalse,
  setIsLoadingTrue,
  setShowErrorTrue,
} from '../../store/appSlice';
import {
  addNewItemToShoppingList,
  createNewShoppingList,
} from '../../store/shoppingSlice';

function Item({ item }: { item: IItem }) {
  const dispatch = useAppDispatch();
  const activeShoppingList = useAppSelector((state) => state.shopping);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const handleAddItemToShoppingListClick: MouseEventHandler = () => {
    if (activeShoppingList.status === 'idle') {
      dispatch(setIsLoadingTrue());
      dispatch(
        createNewShoppingList({
          itemId: item._id,
          categoryId: item.categoryId,
        }),
      )
        .unwrap()
        .then(() => {})
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    } else {
      dispatch(setIsLoadingTrue());
      dispatch(
        addNewItemToShoppingList({
          itemId: item._id,
          categoryId: item.categoryId,
          shoppingListId: activeShoppingList._id,
        }),
      )
        .unwrap()
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    }
  };
  // This useEffect is used to check if the word is too long to fit in the container
  // If it is, it will be cut and replaced with '...'
  useEffect(() => {
    const word = wordRef !== null ? wordRef!.current!.offsetWidth : null;
    const numberOfWords = item.name.split(' ').length;
    const container =
      containerRef !== null ? containerRef!.current!.offsetWidth - 18 : null;
    if (word && container && word > container && numberOfWords === 1) {
      wordRef!.current!.style.overflow = 'hidden';
      wordRef!.current!.style.textOverflow = 'ellipsis';
      wordRef!.current!.style.whiteSpace = 'nowrap';
    } else {
      wordRef!.current!.style.overflow = 'unset';
      wordRef!.current!.style.textOverflow = 'unset';
      wordRef!.current!.style.overflowWrap = 'break-word';
      wordRef!.current!.style.whiteSpace = 'normal';
    }
  }, []);

  return (
    <li className="category__item">
      <Link
        ref={containerRef}
        className="category__item-link"
        to={`/items/${item._id}`}
      >
        <p ref={wordRef} className="category__item-name">
          {item.name}
        </p>
      </Link>
      <button
        type="button"
        onClick={handleAddItemToShoppingListClick}
        className="category__item-button"
      >
        {}
      </button>
    </li>
  );
}

export default Item;
