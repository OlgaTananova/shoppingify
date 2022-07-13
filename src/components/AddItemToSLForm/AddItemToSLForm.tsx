import './AddItemToSLForm.css';
import {useAppSelector} from "../../store/hooks";

const AddItemToSLForm = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList);
    const isShoppingListEmpty = useAppSelector(state => state.shopping.isShoppingListEmpty);

    return (
        <>
            {isShoppingListEmpty && <div className={'shopping-list-empty-img'}>{}</div>}
            <div className={`shopping-list__add-item-form-container ${isEditShoppingList && 'shopping-list__add-item-form-container_editSL'}`}>
                {!isEditShoppingList ?
                    <form className={`shopping-list__add-item-form ${isShoppingListEmpty&& 'shopping-list__add-item-form_empty'}`}
                          name={'add-item-form'}>
                        <input className={'shopping-list__add-item-input'}
                               name={'add-item-input'}
                               placeholder={'Enter a name'}/>
                        <button className={`shopping-list__add-item-submit-btn ${isShoppingListEmpty&& 'shopping-list__add-item-submit-btn_empty'}`}>{'Save'}</button>
                    </form>
                    :
                    <div>
                        <button className={'shopping-list__complete-btn shopping-list__complete-btn_cancel'}
                                type={'reset'}>cancel
                        </button>
                        <button className={'shopping-list__complete-btn shopping-list__complete-btn_complete'}
                                type={'submit'}>complete
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default AddItemToSLForm;
