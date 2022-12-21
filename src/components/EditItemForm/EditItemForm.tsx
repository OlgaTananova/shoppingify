import './EditItemForm.css';
import { FormEventHandler, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import useForm from '../../utils/useForm';
import { setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue } from '../../store/appSlice';
import { setIsEditItemFalse, updateExistingItem } from '../../store/itemInfoSlice';
import { addItemToCategory, deleteItemFromCategory } from '../../store/categoriesSlice';
import { onUpdateShoppingLists } from '../../store/shoppingHistorySlice';
import { clearShoppingList, getActiveShoppingList } from '../../store/shoppingSlice';
import { IShoppingList } from '../../types';

function EditItemForm() {
  const initialValues = useMemo(() => ({
    name: {
      value: '',
      required: true,
    },
    note: {
      value: '',
      required: false,
    },
    image: {
      value: '',
      required: false,
    },
    categoryId: {
      value: '',
      required: true,
    },
  }), []);
  const { itemId } = useParams<string>();
  const item = useAppSelector((state) => state.items.items.find((i) => i._id === itemId));
  const categories = useAppSelector((state) => state.categories.categories);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const form = useForm(initialValues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setValues((prev) => ({
      ...prev,
      name: { value: item!.name || '', required: true },
      note: { value: item!.note || '', required: false },
      image: { value: item!.image || '', required: false },
      categoryId: { value: item!.categoryId || '', required: true },
    }));
  }, [item]);

  const handleEditItemFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    const name = form.values.name.value;
    const note = form.values.note.value;
    const image = form.values.image.value;
    const categoryId = form.values.categoryId.value;
    const id = item!._id;
    dispatch(updateExistingItem({
      id, name, note, image, categoryId,
    })).unwrap()
      .then((data) => {
        if (data.deleteFromCategory) {
          dispatch(deleteItemFromCategory(data.deleteFromCategory));
        }
        if (data.addToCategory) {
          dispatch(addItemToCategory(data.addToCategory));
        }
        if (data.updatedShoppingLists) {
          dispatch(onUpdateShoppingLists(data.updatedShoppingLists));
          const activeShoppingList = data.updatedShoppingLists.find((sl: IShoppingList) => sl.status === 'active');
          if (activeShoppingList) {
            dispatch(getActiveShoppingList(activeShoppingList));
          } else {
            dispatch(clearShoppingList());
          }
        }
        form.resetForm();
        dispatch(setIsEditItemFalse());
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  const handleReset: FormEventHandler = (e) => {
    e.preventDefault();
    form.resetForm();
    dispatch(setIsEditItemFalse());
  };

  return (
    <form
      className="edit-item-form"
      style={{ height: `calc(${innerHeight}px` }}
      onSubmit={handleEditItemFormSubmit}
      onReset={handleReset}
      name="edit-item-form"
      noValidate
    >
      <div className="edit-item-form__container">
        <h3 className="edit-item-form__heading">Edit item</h3>
        <label className="edit-item-form__label edit-item-form__label_type_name">
          {' '}
          Name
          <input
            className="edit-item-form__input"
            name="name"
            placeholder="Enter a name"
            required
            minLength={2}
            maxLength={30}
            type="text"
            value={form.values.name.value}
            onChange={form.handleChange}
          />
          <span className="edit-item-form__error">{form.errors.name}</span>
        </label>
        <label className="edit-item-form__label edit-item-form__label_type_note">
          {' '}
          Note(optional)
          <textarea
            className="edit-item-form__input"
            placeholder="Enter a note"
            value={form.values.note.value}
            onChange={form.handleChange}
            name="note"
          >
            {}
          </textarea>
          <span className="edit-item-form__error">{form.errors.note}</span>
        </label>
        <label className="edit-item-form__label edit-item-form__label_type_image">
          {' '}
          Image(optional)
          <input
            className="edit-item-form__input"
            type="url"
            placeholder="Enter a url"
            onChange={form.handleChange}
            value={form.values.image.value}
                        // pattern={'/(https|http):\\/\\/(www.)?[a-zA-Z0-9-_]+\\.
                        // [a-zA-Z]+(\\/[a-zA-Z0-9-._/~:@!$&\'()*+,;=]*$)?/'}
            name="image"
          />
          <span className="edit-item-form__error">{form.errors.image}</span>
        </label>
        <label
          className="edit-item-form__label edit-item-form__label_type_category"
          htmlFor="category-select"
        >
          Category
          <select
            id="category-select"
            name="categoryId"
            value={form.values.categoryId.value}
            className="edit-item-form__input"
            onChange={form.handleChange}
            required
          >
            <option
              className="edit-item-form__option"
              value=""
            >
              Enter a category
            </option>
            {categories.map((category) => (
              <option
                className="edit-item-form__option"
                key={category._id}
                value={`${category._id}`}
              >
                {category.category}
              </option>
            ))}
          </select>
          <span className="edit-item-form__error">{form.errors.categoryId}</span>
        </label>
        <div className="edit-item-form__buttons">
          <button
            className="edit-item-form__btn edit-item-form__btn_type_reset"
            type="button"
            onClick={() => {
              dispatch(setIsEditItemFalse());
            }}
          >
            Cancel
          </button>
          <button
            className={`edit-item-form__btn ${!form.isValid ? 'edit-item-form__btn_disabled' : ''} edit-item-form__btn_type_submit`}
            type="submit"
            disabled={!form.isValid}
          >
            Edit
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditItemForm;
