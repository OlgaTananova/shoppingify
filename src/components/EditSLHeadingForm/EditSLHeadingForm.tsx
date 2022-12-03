import './EditSLHeadingForm.css';
import {
  ChangeEventHandler, FormEventHandler, MouseEventHandler, useState,
} from 'react';
import { setIsEditShoppingListFalse, setIsEditShoppingListTrue } from '../../store/shoppingSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function EditSLHeadingForm({
  value, onChange, error, required, onSubmit, isValid,
}: {
  value: string,
  onChange: ChangeEventHandler,
  error: string,
  required: boolean,
  onSubmit: FormEventHandler, isValid: boolean
}) {
  const isEditShoppingList = useAppSelector((state) => state.shopping.isEditShoppingList);
  const dispatch = useAppDispatch();
  const [showEditHeadingButton, setShowEditHeadingButton] = useState<boolean>(false);

  const handleEditShoppingListClick: MouseEventHandler = () => {
    !isEditShoppingList
      ? dispatch(setIsEditShoppingListTrue())
      : dispatch(setIsEditShoppingListFalse());
  };

  return (
    <>
      <div className="shopping-list__heading-section">
        <form
          className={`shopping-list__edit-heading-form 
            ${!isValid && 'shopping-list__edit-heading-form_disabled'}`}
          name="editSL-heading-form"
          onSubmit={onSubmit}
          noValidate
        >
          <input
            className="shopping-list__heading"
            type="text"
            value={value}
            minLength={2}
            maxLength={30}
            onFocus={() => setShowEditHeadingButton(true)}
            onBlur={() => setTimeout(() => setShowEditHeadingButton(false), 1000)}
            onChange={onChange}
            required={required}
            name="shopping-list-heading"
          />
          <button
            type="submit"
            className={`shopping-list__edit-heading-btn 
                    ${showEditHeadingButton && 'shopping-list__edit-heading-btn_visible'}
                    ${!isValid && 'shopping-list__edit-heading-btn_disabled'}`}
            disabled={!isValid}
          >
            Edit
          </button>
        </form>
        <button
          onClick={handleEditShoppingListClick}
          className="shopping-list__edit-btn"
          type="button"
        >
          {}
        </button>
      </div>
      <span className="shopping-list__heading-error">{error}</span>
    </>
  );
}

export default EditSLHeadingForm;
