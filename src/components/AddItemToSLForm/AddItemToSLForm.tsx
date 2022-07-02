import './AddItemToSLForm.css';
import {Dispatch, SetStateAction} from "react";

const AddItemToSLForm = ({isEditShoppingList, setIsEditShoppingList, isShoppingListEmpty} : {isEditShoppingList: boolean, setIsEditShoppingList: Dispatch<SetStateAction<boolean>>, isShoppingListEmpty: boolean}) => {

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
                        <button onClick={() => {
                            setIsEditShoppingList(false)
                        }}
                                className={'shopping-list__complete-btn shopping-list__complete-btn_cancel'}
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
