import './AddItemToSLForm.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import useForm from "../../utils/useForm";
import {FormEventHandler, MouseEventHandler, useEffect, useMemo, useState} from "react";
import {setIsLoadingFalse, setIsLoadingTrue, setShowCancelSLTrue, setShowErrorTrue} from "../../store/appSlice";
import {
    clearShoppingList,
    getActiveShoppingList,
    updateSLStatus
} from '../../store/shoppingSlice';
import CreateShoppingListForm from "../CreateShoppingListForm/CreateShoppingListForm";
import AddItemToActiveShoppingListForm from "../AddItemToActiveShoppingListForm/AddItemToActiveShoppingListForm";
import {getAllShoppingLists} from "../../store/shoppingHistorySlice";
import {IShoppingList} from "../../types";

const AddItemToSLForm = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList)
    const itemsInShoppingList = useAppSelector(state => state.shopping.items);
    const activeShoppingList = useAppSelector(state => state.shopping);
    const shoppingListStatus = useAppSelector(state => state.shopping.status);
    const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(itemsInShoppingList!.length === 0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (itemsInShoppingList!.length === 0 && shoppingListStatus === 'idle') {
            setIsShoppingListEmpty(true);
        } else {
            setIsShoppingListEmpty(false);
        }
    }, [itemsInShoppingList]);

    const getShoppingLists = () => {
        dispatch(getAllShoppingLists()).unwrap()
            .then((data) => {
                dispatch(clearShoppingList());
                const activeShoppingList = data.find((list: IShoppingList) => {
                    return list.status === 'active';
                });
                if (activeShoppingList) {
                    dispatch(getActiveShoppingList(activeShoppingList));
                }
            })
    }

    const handleCompleteSLClick: MouseEventHandler = () => {
        dispatch(setIsLoadingTrue());
        dispatch(updateSLStatus({shoppingListId: activeShoppingList._id, status: 'completed'})).unwrap()
            .then(() => {
                getShoppingLists();
            })
            .catch((err) => {
                dispatch(setShowErrorTrue(err.message));
            })
            .finally(() => {
                dispatch(setIsLoadingFalse());
            })
    }

    const handleCancelSLClick: MouseEventHandler = () => {
        dispatch(setShowCancelSLTrue());
    }

    if (isShoppingListEmpty && !isEditShoppingList) {
        return <CreateShoppingListForm/>
    } else if (!isEditShoppingList && !isShoppingListEmpty) {
        return <AddItemToActiveShoppingListForm/>
    } else {
        return (
            <div className={`shopping-list__add-item-form-container shopping-list__add-item-form-container_editSL`}>
                <div>
                    <button className={'shopping-list__complete-btn shopping-list__complete-btn_cancel'}
                            type={'button'} onClick={handleCancelSLClick}>cancel
                    </button>
                    <button className={'shopping-list__complete-btn shopping-list__complete-btn_complete'}
                            onClick={handleCompleteSLClick}
                            type={'button'}>complete
                    </button>
                </div>
            </div>
        )
    }

}

export default AddItemToSLForm;
