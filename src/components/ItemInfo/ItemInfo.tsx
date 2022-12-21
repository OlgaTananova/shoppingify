import './ItemInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteExistingItem, setIsEditItemTrue } from '../../store/itemInfoSlice';
import { deleteItemFromCategory } from '../../store/categoriesSlice';
import { setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue } from '../../store/appSlice';
import { addNewItemToShoppingList, createNewShoppingList } from '../../store/shoppingSlice';
import EditItemForm from '../EditItemForm/EditItemForm';

function ItemInfo() {
  const { itemId } = useParams<string>();
  const item = useAppSelector((state) => state.items.items.find((i) => i._id === itemId));
  const category = useAppSelector((state) => state.categories.categories.find((c) => item && item.categoryId === c._id));
  const activeShoppingList = useAppSelector((state) => state.shopping);
  const isEditItem = useAppSelector((state) => state.items.isEditItem);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const handleDeleteClick: MouseEventHandler = (event) => {
    dispatch(setIsLoadingTrue());
    if (itemId != null) {
      dispatch(deleteExistingItem(itemId)).unwrap()
        .then((data) => {
          dispatch(deleteItemFromCategory(data.category));
          navigate('/items');
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    }
  };

  const handleAddItemToSLClick: MouseEventHandler = () => {
    if (activeShoppingList.status === 'idle') {
      dispatch(setIsLoadingTrue());
      (item && category) && dispatch(createNewShoppingList({
        itemId: item._id,
        categoryId: category._id,
      })).unwrap()
        .then(() => {
          navigate('/items');
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    } else {
      dispatch(setIsLoadingTrue());
      (item && category) && dispatch(addNewItemToShoppingList({
        shoppingListId: activeShoppingList._id, categoryId: category._id, itemId: item._id,
      })).unwrap()
        .then(() => {
          navigate('/items');
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    }
  };

  const handleEditItemButtonClick: MouseEventHandler = () => {
    dispatch(setIsEditItemTrue());
  };

  return (
    !isEditItem
      ? (
        <div className="item-info">
          <div className="item-info__container">
            <button
              onClick={handleClick}
              className="item-info__return-btn"
              type="button"
            >
              back
            </button>
            {!item
              ? (
                <div className="item-info__not-found">
                  Item is not found.
                </div>
              )
              : (
                <>
                  {item.image !== '' && (
                  <img
                    className="item-info__img"
                    src={item.image}
                    alt={item.name}
                  />
                  )}
                  <span className="item-info__label item-info__label_type_name">name</span>
                  <p className="item-info__name">{item.name}</p>
                  <span className="item-info__label item-info__label_type_category">category</span>
                  <p className="item-info__category">{category && category.category}</p>
                  <span className="item-info__label item-info__label_type_note">note</span>
                  <p className="item-info__note">{item.note}</p>
                  <div className="item-info__buttons">
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      className="item-info__btn item-info__btn_delete"
                    >
                      delete
                    </button>
                    <button
                      type="button"
                      onClick={handleAddItemToSLClick}
                      className="item-info__btn item-info__btn_submit"
                    >
                      Add to list
                    </button>
                    <button
                      className="item-info__btn item-info__btn_edit"
                      type="button"
                      onClick={handleEditItemButtonClick}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
          </div>
        </div>
      )
      : (
        <EditItemForm />
      )
  );
}
export default ItemInfo;
