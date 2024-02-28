/*
 * This component is responsible for rendering the shopping list with its heading.
 * Additionally it sorts the items by category and renders the ShoppingCategory component.
 * */
import './ShoppingList.css';
import {FormEventHandler, useEffect, useMemo, useState} from 'react';
import ShoppingCategory from '../ShoppingCategory/ShoppingCategory';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {clearShoppingList, getActiveShoppingList, updateExistingSLHeading} from '../../store/shoppingSlice';
import {IShoppingCategory, IShoppingItem, IShoppingList} from '../../types';
import useForm from '../../utils/useForm';
import EditSLHeadingForm from '../EditSLHeadingForm/EditSLHeadingForm';
import {
    setIsLoadingFalse,
    setIsLoadingTrue,
    setShowErrorTrue,
} from '../../store/appSlice';
import image from '../../images/undraw_shopping_app_flsj 1.svg';
import SalesTax from '../SalesTax/SalesTax';
import {onUpdateActiveShoppingList} from "../../store/shoppingHistorySlice";

function ShoppingList() {
    const shoppingLists = useAppSelector((state) => state.shoppingHistory.shoppingLists);
    const itemsInShoppingList = useAppSelector((state) => state.shopping.items);
    const shoppingListStatus = useAppSelector((state) => state.shopping.status);
    const shoppingListHeading = useAppSelector((state) => state.shopping.heading);
    const shoppingListSalesTax = useAppSelector(
        (state) => state.shopping.salesTax,
    );
    const shoppingListId = useAppSelector((state) => state.shopping._id);
    const [isShoppingListEmpty, setIsShoppingListEmpty] = useState<boolean>(
        itemsInShoppingList ? itemsInShoppingList!.length === 0 : true,
    );
    const [totalSum, setTotalSum] = useState<number>(0);
    const dispatch = useAppDispatch();
    const initialValues = useMemo(
        () => ({
            'shopping-list-heading': {
                value: '',
                required: true,
            },
        }),
        [],
    );
    const editSLHeadingForm = useForm(initialValues);
    const [itemsByCategory, setItemsByCategory] =
        useState<IShoppingItem | null>();
    useEffect(() => {
        // @ts-ignore
        const sortedItems =
            itemsInShoppingList && itemsInShoppingList!.length !== 0
                ? itemsInShoppingList!.reduce(
                    //@ts-ignore
                    (prev: IShoppingCategory, value: IShoppingItem) => {
                        if (!prev[value.categoryId]) {
                            prev[value.categoryId] = [];
                            prev[value.categoryId].push(value);
                        } else {
                            prev[value.categoryId].push(value);
                        }
                        return prev;
                    },
                    {},
                )
                : null;
        setItemsByCategory(sortedItems);
    }, [itemsInShoppingList]);

    useEffect(() => {
        let sum =
            (itemsInShoppingList &&
                itemsInShoppingList?.reduce(
                    (prev, curr) => prev + (curr?.price || 0),
                    0,
                )) ||
            0;
        sum += shoppingListSalesTax || 0;
        setTotalSum(sum);
    }, [itemsInShoppingList, shoppingListSalesTax]);

    useEffect(() => {
        if (itemsInShoppingList && itemsInShoppingList!.length === 0) {
            setIsShoppingListEmpty(true);
        } else if (itemsInShoppingList && itemsInShoppingList.length !== 0) {
            setIsShoppingListEmpty(false);
        }
    }, [itemsInShoppingList]);

    useEffect(() => {
        editSLHeadingForm.setValues({
            'shopping-list-heading': {value: shoppingListHeading, required: true},
        });
    }, [shoppingListHeading]);

    const editSLHeadingFormSubmitHandler: FormEventHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(setIsLoadingTrue());
            const data = await dispatch(updateExistingSLHeading({
                shoppingListId: shoppingListId || "",
                heading: editSLHeadingForm.values['shopping-list-heading'].value,
            })).unwrap();
            dispatch(onUpdateActiveShoppingList(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
        } catch (err) {
            const errMessage = err instanceof Error ? err.message : "Unknown error occurred.";
            dispatch(setShowErrorTrue(errMessage));
        } finally {
            dispatch(setIsLoadingFalse());
        }
    };

    return isShoppingListEmpty ? (
        <div className="shopping-list shopping-list_empty">
            {shoppingListStatus !== 'idle' && (
                <EditSLHeadingForm
                    value={editSLHeadingForm.values['shopping-list-heading'].value}
                    onChange={editSLHeadingForm.handleChange}
                    error={editSLHeadingForm.errors['shopping-list-heading']}
                    required={editSLHeadingForm.values['shopping-list-heading'].required}
                    onSubmit={editSLHeadingFormSubmitHandler}
                    isValid={editSLHeadingForm.isValid}
                />
            )}
            <p className="shopping-list__no-items">No Items</p>
            <img
                className="shopping-list-empty-img"
                alt="Empty shopping list"
                src={image}
                loading="lazy"
            />
        </div>
    ) : (
        <div className="shopping-list">
            <EditSLHeadingForm
                value={editSLHeadingForm.values['shopping-list-heading'].value}
                onChange={editSLHeadingForm.handleChange}
                error={editSLHeadingForm.errors['shopping-list-heading']}
                required={editSLHeadingForm.values['shopping-list-heading'].required}
                onSubmit={editSLHeadingFormSubmitHandler}
                isValid={editSLHeadingForm.isValid}
            />
            {itemsByCategory &&
                Object.entries(itemsByCategory).map(
                    (item: [string, IShoppingItem[]]) => (
                        <ShoppingCategory
                            items={item[1]}
                            categoryId={item[0]}
                            key={item[0]}
                        />
                    ),
                )}
            <SalesTax/>
            <div className="shopping-list__total">
                <p className="shopping-list__total-heading">Total</p>
                <p className="shopping-list__total-sum">{`$ ${totalSum.toFixed(2)}`}</p>
            </div>
        </div>
    );
}

export default ShoppingList;
