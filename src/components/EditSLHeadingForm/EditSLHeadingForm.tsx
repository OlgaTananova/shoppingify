import './EditSLHeadingForm.css';
import {
  ChangeEventHandler, FormEventHandler, MouseEventHandler, useMemo, useState,
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
  const shoppingList = useAppSelector((state) => state.shopping.items);
  const itemsInItems = useAppSelector((state) => state.items.items);
  const dispatch = useAppDispatch();
  const [showEditHeadingButton, setShowEditHeadingButton] = useState<boolean>(false);
  const [showCopyToClipboardMessage, setShowCopyToClipboardMessage] = useState<boolean>(false);

  const handleEditShoppingListClick: MouseEventHandler = () => {
    !isEditShoppingList
      ? dispatch(setIsEditShoppingListTrue())
      : dispatch(setIsEditShoppingListFalse());
  };

  const shoppingListToClipboard = useMemo(() => (shoppingList!.length !== 0 ? shoppingList!.reduce((prev, item) => {
    const itemInItems = itemsInItems.find((i) => i._id === item!.itemId);
    const name = itemInItems!.name || 'Unknown item';
    prev.push(name.concat(' ', item!.quantity.toString()));
    return prev;
  }, [] as unknown as [string])
    : []), []);

  const copyToClipboardClick: MouseEventHandler = () => {
    navigator.clipboard.writeText(shoppingListToClipboard.join(', \n'));
    setShowCopyToClipboardMessage(true);
    setTimeout(() => {
      setShowCopyToClipboardMessage(false);
    }, 5000);
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
          className="shopping-list__button shopping-list__button_complete"
          type="button"
          aria-label="Button to complete or cancel the active shopping list"
        >
          {}
        </button>
        <button
          type="button"
          className={`shopping-list__button shopping-list__button_copy 
          ${showCopyToClipboardMessage && 'shopping-list__button_copy_active'}`}
          onClick={copyToClipboardClick}
          title="The shopping list was copied to clipboard"
        >
          {}
        </button>
      </div>
      <span className="shopping-list__heading-error">{error}</span>
    </>
  );
}

export default EditSLHeadingForm;