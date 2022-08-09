import './AddItemToSLForm.css';
import {useAppSelector} from "../../store/hooks";

const AddItemToSLForm = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList);
    const isShoppingListEmpty = useAppSelector(state => state.shopping.categories);


        if (isShoppingListEmpty && !isEditShoppingList) {
           return(
            <div className={`shopping-list__add-item-form-container`}>
               <div className={'shopping-list-empty-img'}>{}</div>
              <form className={`shopping-list__add-item-form shopping-list__add-item-form_empty`}
                    name={'add-item-form'}>
                <input className={'shopping-list__add-item-input'}
                       name={'add-item-input'}
                       placeholder={'Enter a name'}/>
                <button type={"submit"}
                        className={`shopping-list__add-item-submit-btn shopping-list__add-item-submit-btn_empty`}>{'Save'}</button>
              </form>
            </div>)
        } else if (!isEditShoppingList && !isShoppingListEmpty) {
            return (
                <div className={`shopping-list__add-item-form-container`}>
                <form className={`shopping-list__add-item-form ${isShoppingListEmpty && 'shopping-list__add-item-form_empty'}`}
                  name={'add-item-form'}>
                <input className={'shopping-list__add-item-input'}
                       name={'add-item-input'}
                       placeholder={'Enter a name'}/>
                <button className={`shopping-list__add-item-submit-btn ${isShoppingListEmpty && 'shopping-list__add-item-submit-btn_empty'}`}>{'Save'}</button>
            </form>
                </div>)
        } else {
                return (
                    <div className={`shopping-list__add-item-form-container shopping-list__add-item-form-container_editSL`}>
                    <form>
                    <button className={'shopping-list__complete-btn shopping-list__complete-btn_cancel'}
                            type={'reset'}>cancel
                    </button>
                    <button className={'shopping-list__complete-btn shopping-list__complete-btn_complete'}
                            type={'submit'}>complete
                    </button>
                </form>
                    </div>)
            }

}

export default AddItemToSLForm;
