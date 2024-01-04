import './AddItemForm.css';
import { FormEventHandler, useMemo } from 'react';
import useForm from '../../utils/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeAddItemForm } from '../../store/shoppingSlice';
import { addNewItem } from '../../store/itemInfoSlice';
import { addOrDeleteItemToCategory } from '../../store/categoriesSlice';
import {
  setIsLoadingFalse,
  setIsLoadingTrue,
  setShowErrorTrue,
} from '../../store/appSlice';

function AddItemForm() {
  const initialValues = useMemo(
    () => ({
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
    }),
    [],
  );

  const categories = useAppSelector((state) => state.categories.categories);
  const scroll = useAppSelector((state) => state.app.scroll);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const form = useForm(initialValues);
  const dispatch = useAppDispatch();

  const handleAddItemFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    const name = form.values.name.value;
    const note = form.values.note.value;
    const image = form.values.image.value;
    const categoryId = form.values.categoryId.value;
    dispatch(
      addNewItem({
        name,
        note,
        image,
        categoryId,
      }),
    )
      .unwrap()
      .then((data) => {
        dispatch(addOrDeleteItemToCategory(data.category));
        form.resetForm();
        dispatch(closeAddItemForm());
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
    dispatch(closeAddItemForm());
  };

  return (
    <form
      className="add-item-form"
      style={{ height: `calc(${innerHeight}px + ${scroll}px)` }}
      onSubmit={handleAddItemFormSubmit}
      onReset={handleReset}
      name="add-item-form"
      noValidate
    >
      <div className="add-item-form__container">
        <h3 className="add-item-form__heading">Add a new item</h3>
        <label className="add-item-form__label add-item-form__label_type_name">
          {' '}
          Name
          <input
            className="add-item-form__input"
            name="name"
            placeholder="Enter a name"
            required
            minLength={2}
            maxLength={30}
            type="text"
            value={form.values.name.value}
            onChange={form.handleChange}
          />
          <span className="add-item-form__error">{form.errors.name}</span>
        </label>
        <label className="add-item-form__label add-item-form__label_type_note">
          {' '}
          Note(optional)
          <textarea
            className="add-item-form__input"
            placeholder="Enter a note"
            value={form.values.note.value}
            onChange={form.handleChange}
            name="note"
          >
            {}
          </textarea>
          <span className="add-item-form__error">{form.errors.note}</span>
        </label>
        <label className="add-item-form__label add-item-form__label_type_image">
          {' '}
          Image(optional)
          <input
            className="add-item-form__input"
            type="url"
            placeholder="Enter a url"
            onChange={form.handleChange}
            value={form.values.image.value}
            // pattern={'/(https|http):\\/\\/(www.)?[a-zA-Z0-9-_]+\\.
            // [a-zA-Z]+(\\/[a-zA-Z0-9-._/~:@!$&\'()*+,;=]*$)?/'}
            name="image"
          />
          <span className="add-item-form__error">{form.errors.image}</span>
        </label>
        <label
          className="add-item-form__label add-item-form__label_type_category"
          htmlFor="category-select"
        >
          Category
          <select
            id="category-select"
            name="categoryId"
            value={form.values.categoryId.value}
            className="add-item-form__input"
            onChange={form.handleChange}
            required
          >
            <option className="add-item-form__option" value="">
              Enter a category
            </option>
            {categories.map((category) => (
              <option
                className="add-item-form__option"
                key={category._id}
                value={`${category._id}`}
              >
                {category.category}
              </option>
            ))}
          </select>
          <span className="add-item-form__error">{form.errors.categoryId}</span>
        </label>
        <div className="add-item-form__buttons">
          <button
            className="add-item-form__btn add-item-form__btn_type_reset"
            type="button"
            onClick={() => {
              dispatch(closeAddItemForm());
            }}
          >
            Cancel
          </button>
          <button
            className={`add-item-form__btn ${
              !form.isValid ? 'add-item-form__btn_disabled' : ''
            } add-item-form__btn_type_submit`}
            type="submit"
            disabled={!form.isValid}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddItemForm;
