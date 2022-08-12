import './CreateShoppingListForm.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {FormEventHandler, useMemo} from "react";
import useForm from "../../utils/useForm";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {createNewShoppingList} from "../../store/shoppingSlice";

const CreateShoppingListForm = ()=> {
    const items = useAppSelector(state => state.items.items);
    const initialValues = useMemo(() => {
        return {
            'add-item-input': {
                value: '',
                required: true,
            }
        }
    }, [])
    const createShoppingListForm = useForm(initialValues);
    const dispatch = useAppDispatch();

    const handleCreateShoppingListFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const clearedInput = createShoppingListForm.values["add-item-input"].value.toLowerCase().trim();
        const addedItem = items.find((item) => {
            return item.name.toLowerCase().trim() === clearedInput;
        });
        if (!addedItem) {
            dispatch(setShowErrorTrue('Item or category is not found.'));
        } else {
            dispatch(setIsLoadingTrue());
            dispatch(createNewShoppingList({
                itemId: addedItem._id,
                categoryId: addedItem.categoryId,
            })).unwrap()
                .then(() => {
                    createShoppingListForm.resetForm();
                })
                .catch((err) => {
                    dispatch(setShowErrorTrue(err.message));
                })
                .finally(() => {
                    dispatch(setIsLoadingFalse());
                })
        }

    }
        return (
            <div className={`shopping-list__add-item-form-container`}>
                <div className={'shopping-list-empty-img'}>{}</div>
                <form className={`shopping-list__add-item-form shopping-list__add-item-form_empty`}
                      name={'create-shopping-list-form'}
                      onSubmit={handleCreateShoppingListFormSubmit}
                      noValidate={true}>
                    <input className={'shopping-list__add-item-input'}
                           name={'add-item-input'}
                           required={true}
                           value={createShoppingListForm.values["add-item-input"].value}
                           onChange={createShoppingListForm.handleChange}
                           placeholder={'Enter a name'}/>
                    <button type={"submit"}
                            disabled={!createShoppingListForm.isValid}
                            className={`shopping-list__add-item-submit-btn shopping-list__add-item-submit-btn_empty`}>{'Save'}</button>
                </form>
                <span className={'shopping-list__add-item-error'}>{createShoppingListForm.errors['add-item-input']}</span>
            </div>)
    }

export default CreateShoppingListForm;
