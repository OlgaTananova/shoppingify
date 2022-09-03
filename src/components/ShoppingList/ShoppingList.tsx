import './ShoppingList.css';
import ShoppingCategory from "../ShoppingCategory/ShoppingCategory";
import {FormEventHandler, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
    updateExistingSLHeading
} from "../../store/shoppingSlice";
import {IShoppingCategory, IShoppingItem} from "../../types";
import useForm from "../../utils/useForm";
import EditSLHeadingForm from "../EditSLHeadingForm/EditSLHeadingForm";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";
import image from '../../images/undraw_shopping_app_flsj 1.svg';

const ShoppingList = () => {
    const isEditShoppingList = useAppSelector(state => state.shopping.isEditShoppingList);
    const itemsInShoppingList = useAppSelector(state => state.shopping.items);
    const shoppingListStatus = useAppSelector(state => state.shopping.status);
    const shoppingListHeading = useAppSelector(state => state.shopping.heading);
    const shoppingListId = useAppSelector(state => state.shopping._id);
    const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(itemsInShoppingList!.length === 0);
    const dispatch = useAppDispatch();
    const initialValues = useMemo(()=>{
        return {
            'shopping-list-heading': {
                value: '',
                required: true,
            }
        }
    }, [])
    const editSLHeadingForm = useForm(initialValues);

    // @ts-ignore
    const itemsByCategory = itemsInShoppingList!.length !== 0 ? itemsInShoppingList!.reduce((prev: IShoppingCategory, value: IShoppingItem) => {
            if (!prev[value.categoryId]) {
                prev[value.categoryId] = [];
                prev[value.categoryId].push(value)
            } else {
                prev[value.categoryId].push(value);
            }
            return prev;
        }, {})
        : null;

    useEffect(() => {
        if (itemsInShoppingList!.length === 0) {
            setIsShoppingListEmpty(true);
        } else {
            setIsShoppingListEmpty(false);
        }
    }, [itemsInShoppingList]);

    useEffect(()=>{
        editSLHeadingForm.setValues({'shopping-list-heading': {value: shoppingListHeading, required: true}});
    }, [shoppingListHeading]);

    const editSLHeadingFormSubmitHandler:FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(setIsLoadingTrue());
        dispatch(updateExistingSLHeading({shoppingListId: shoppingListId, heading: editSLHeadingForm.values["shopping-list-heading"].value })).unwrap()
            .catch((err)=> {
                dispatch(setShowErrorTrue(err.message));
            })
            .finally(()=> {
                dispatch(setIsLoadingFalse());
            })
    }


    return (
            isShoppingListEmpty?
                <div className={'shopping-list shopping-list_empty'}>
                    {shoppingListStatus !== 'idle' &&
                      <EditSLHeadingForm value={editSLHeadingForm.values["shopping-list-heading"].value}
                                         onChange={editSLHeadingForm.handleChange}
                                         error={editSLHeadingForm.errors['shopping-list-heading']}
                                         required={editSLHeadingForm.values['shopping-list-heading'].required}
                                        onSubmit={editSLHeadingFormSubmitHandler} isValid={editSLHeadingForm.isValid}/>
                    }
                    <p className={'shopping-list__no-items'}>No Items</p>
                    <img className={'shopping-list-empty-img'} src={image}>{}</img>
                </div>
                :
                <div className={'shopping-list'}>
                    <>
                        <EditSLHeadingForm value={editSLHeadingForm.values["shopping-list-heading"].value}
                                           onChange={editSLHeadingForm.handleChange} error={editSLHeadingForm.errors['shopping-list-heading']}
                                           required={editSLHeadingForm.values['shopping-list-heading'].required}
                                           onSubmit={editSLHeadingFormSubmitHandler} isValid={editSLHeadingForm.isValid}/>
                        {itemsByCategory&& Object.entries(itemsByCategory).map((item:[string, IShoppingItem[]] )=> {
                                return <ShoppingCategory items={item[1]}
                                                         categoryId={item[0]}
                                                         key={item[0]}
                                                         isEditShoppingList={isEditShoppingList}/>

                        })}
                    </>
                </div>
    )
}

export default ShoppingList;
