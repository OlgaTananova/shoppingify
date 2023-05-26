import './AddNewCategory.css';
import { FormEvent, FormEventHandler, useMemo } from 'react';
import { useAppDispatch } from '../../store/hooks';
import useForm from '../../utils/useForm';
import { addCategory } from '../../store/categoriesSlice';
import { setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue } from '../../store/appSlice';

function AddNewCategory() {
  const dispatch = useAppDispatch();
  const initialValues = useMemo(() => ({
    category: {
      value: '',
      required: true,
    },
  }), []);
  const form = useForm(initialValues);

  const handleSubmitAddCategoryForm: FormEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(addCategory(form.values.category.value)).unwrap()
      .then(() => {
        form.resetForm();
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  return (
    <div className="add-new-category">
      <form
        name="add-new-category-form"
        onSubmit={handleSubmitAddCategoryForm}
        className="add-new-category-form"
        noValidate
      >
        <input
          className="add-new-category-form__input"
          type="text"
          required
          placeholder="category"
          name="category"
          minLength={2}
          maxLength={30}
          value={form.values.category.value}
          onChange={form.handleChange}
        />
        <button
          type="submit"
          disabled={!form.isValid}
          className={`add-new-category-form__submit-btn ${!form.isValid && 'add-new-category-form__submit-btn_disabled'}`}
        >
          Add category
        </button>
      </form>
      {form.errors.category && <span className="add-new-category-form__error">{form.errors.category}</span>}
    </div>
  );
}

export default AddNewCategory;
