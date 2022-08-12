import './AddItemToSLForm.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import useForm from "../../utils/useForm";
import {FormEventHandler, useEffect, useMemo, useState} from "react";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import {createNewShoppingList} from '../../store/shoppingSlice';
import CreateShoppingListForm from "../CreateShoppingListForm/CreateShoppingListForm";
import AddItemToActiveShoppingListForm from "../AddItemToActiveShoppingListForm/AddItemToActiveShoppingListForm";

const AddItemToSLForm = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList)
    const itemsInShoppingList = useAppSelector(state => state.shopping.items);
    const shoppingListStatus = useAppSelector(state => state.shopping.status);
    const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(itemsInShoppingList!.length === 0 );

    useEffect(()=>{
        if (itemsInShoppingList!.length === 0 && shoppingListStatus === 'idle') {
            setIsShoppingListEmpty(true);
        } else {
            setIsShoppingListEmpty(false);
        }
    }, [itemsInShoppingList])

    if (isShoppingListEmpty && !isEditShoppingList){
      return <CreateShoppingListForm />
  } else if (!isEditShoppingList && !isShoppingListEmpty) {
      return <AddItemToActiveShoppingListForm />
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
          </div>
      )
  }

}

export default AddItemToSLForm;
