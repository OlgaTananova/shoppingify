import {useAppDispatch, useAppSelector} from "../../store/hooks";
import useForm from "../../utils/useForm";
import {FormEventHandler, useMemo} from "react";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {addNewItemToShoppingList} from "../../store/shoppingSlice";


const AddItemToActiveShoppingListForm = () => {
    const activeShoppingList = useAppSelector(state => state.shopping)
    const items = useAppSelector(state => state.items.items);
    const dispatch = useAppDispatch();
    const initialValues = useMemo(()=>{
        return {
            'add-item-input': {
                value: '',
                required: true,
            }
        }
    },[])

    const addItemForm = useForm(initialValues);

    const addItemToActiveShoppingListHandleSubmit: FormEventHandler =(e)=>{
        e.preventDefault();
        const clearedInput = addItemForm.values["add-item-input"].value.toLowerCase().trim();
        const addedItem = items.find((item) => {
            return item.name.toLowerCase().trim() === clearedInput;
        });

        if (!addedItem) {
            dispatch(setShowErrorTrue('Item or category is not found.'));
        } else {
            dispatch(setIsLoadingTrue());
            dispatch(addNewItemToShoppingList({
                shoppingListId: activeShoppingList._id, categoryId: addedItem.categoryId, itemId: addedItem._id })).unwrap()
                .then(()=>{
                    addItemForm.resetForm();
                })
                .catch((err)=>{
                    dispatch(setShowErrorTrue(err.message));
                })
                .finally(()=>{
                    dispatch(setIsLoadingFalse());
                })
        }
    }

    return (
        <div className={`shopping-list__add-item-form-container`}>
            <form className={`shopping-list__add-item-form`}
                  noValidate={true}
                  onSubmit={addItemToActiveShoppingListHandleSubmit}
                  name={'add-item-form'}>
                <input className={'shopping-list__add-item-input'}
                       name={'add-item-input'}
                       value={addItemForm.values["add-item-input"].value}
                       onChange={addItemForm.handleChange}
                       required={true}
                       placeholder={'Enter a name'}/>
                <button type={'submit'} disabled={!addItemForm.isValid} className={`shopping-list__add-item-submit-btn`}>{'Save'}</button>
            </form>
            <span className={'shopping-list__add-item-error'}>{addItemForm.errors['add-item-input']}</span>
        </div>
    )
}

export default AddItemToActiveShoppingListForm;
