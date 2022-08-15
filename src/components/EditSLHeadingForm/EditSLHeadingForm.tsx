import {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";
import {setIsEditShoppingListFalse, setIsEditShoppingListTrue} from "../../store/shoppingSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const EditSLHeadingForm = ({
                               value, onChange, error, required, onSubmit, isValid
                           }: {
    value: string,
    onChange: ChangeEventHandler,
    error: string,
    required: boolean,
    onSubmit: FormEventHandler, isValid: boolean
}) => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList);
    const dispatch = useAppDispatch();

    const handleEditShoppingListClick: MouseEventHandler = () => {
        !isEditShoppingList ?
            dispatch(setIsEditShoppingListTrue())
            : dispatch(setIsEditShoppingListFalse())
    }

    return (
        <form noValidate={true}
              name={'editSL-heading-form'}
              onSubmit={onSubmit}>
            <input className={`shopping-list__heading ${isEditShoppingList && 'shopping-list__heading_editable'}`}
                   type={'text'}
                   value={value}
                   onChange={onChange}
                   required={required}
                   name={'shopping-list-heading'}>{}</input>
            <button onClick={handleEditShoppingListClick}
                    className={'shopping-list__edit-btn'}
                    type={'button'}>{}</button>
            <span className={'shopping-list__heading-error'}>{error}</span>
        </form>
    )
}

export default EditSLHeadingForm;
