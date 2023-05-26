import './EditSLHeadingForm.css';
import {
  ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState,
} from 'react';
import {
  setIsEditShoppingListFalse,
  setIsEditShoppingListTrue,
} from '../../store/shoppingSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setIsToDeleteSL, setShowCancelSLTrue,
} from '../../store/appSlice';

// @ts-ignore
// @ts-ignore
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
  const shoppingList = useAppSelector((state) => state.shopping);
  const shoppingListItems = useAppSelector((state) => state.shopping.items);
  const itemsInItems = useAppSelector((state) => state.items.items);
  const dispatch = useAppDispatch();
  const [showEditHeadingButton, setShowEditHeadingButton] = useState<boolean>(false);
  const [showCopyToClipboardMessage, setShowCopyToClipboardMessage] = useState<boolean>(false);
  const [shoppingListToClipboard, setShoppingListToClipBoard] = useState([]);
  const handleEditShoppingListClick: MouseEventHandler = () => {
    !isEditShoppingList
      ? dispatch(setIsEditShoppingListTrue())
      : dispatch(setIsEditShoppingListFalse());
  };
    // update shoppingListToClipboard if shoppingList has been changed
  useEffect(() => {
    // @ts-ignore
    setShoppingListToClipBoard(() => (shoppingList!.length !== 0
      ? shoppingListItems!.reduce((prev, item) => {
        const itemInItems = itemsInItems.find((i) => i._id === item!.itemId);
        const name = itemInItems!.name || 'Unknown item';
        prev.push(name.concat(' ', item!.quantity.toString()));
        return prev;
      }, [] as unknown as [string])
      : []));
  }, [shoppingListItems]);

  const copyToClipboardClick: MouseEventHandler = () => {
    navigator.clipboard.writeText(shoppingListToClipboard.join(', \n'))
      .then(() => {
        setShowCopyToClipboardMessage(true);
        setTimeout(() => {
          setShowCopyToClipboardMessage(false);
        }, 5000);
      });
  };

  const handleDeleteShoppingListClick: MouseEventHandler = () => {
    dispatch(setShowCancelSLTrue());
    dispatch(setIsToDeleteSL(true));
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
        <div className="shopping-list__buttons">
          <button
            onClick={handleDeleteShoppingListClick}
            type="button"
            aria-label="Button to delete the active shopping list"
            className="shopping-list__button shopping-list__button_delete-list"
          >
            {}
          </button>
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
            aria-label="Button to copy the shopping list to a clipboard"
            title="The shopping list was copied to a clipboard"
          >
            {}
          </button>
        </div>
      </div>
      <span className="shopping-list__heading-error">{error}</span>
    </>
  );
}

export default EditSLHeadingForm;
