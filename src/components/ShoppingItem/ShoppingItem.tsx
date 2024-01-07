import './ShoppingItem.css';
import {
    FormEventHandler,
    MouseEventHandler,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {IShoppingItem} from '../../types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
    setIsLoadingFalse,
    setIsLoadingTrue,
    setShowErrorTrue,
} from '../../store/appSlice';
import {
    deleteExistingItemFromSL,
    updateItemQtyInExistingSL,
    updateItemStatusExistingSL,
    updatePricePerUnitOfItemInSL,
    updateUnitsOfItemInSL,
} from '../../store/shoppingSlice';
import useForm from '../../utils/useForm';

function ShoppingItem({item}: { item: IShoppingItem }) {
    const [isEditQtyMenuOpened, setIsEditQtyMenuOpened] = useState(false);
    const [isEditUnitsMenuOpened, setIsEditUnitsMenuOpened] = useState(false);
    const [isEditPriceMenuOpened, setIsEditPriceMenuOpened] = useState(false);
    const items = useAppSelector((state) => state.items.items);
    const activeShoppingList = useAppSelector((state) => state.shopping._id);
    const dispatch = useAppDispatch();
    const initialValuesForQty = useMemo(
        () => ({
            'item-qty': {
                value: 0,
                required: true,
            },
        }),
        [],
    );
    const initialValuesForUnits = useMemo(
        () => ({
            'item-units': {
                value: '',
                required: true,
            },
        }),
        [],
    );
    const initialValuesForPricePerUnit = useMemo(
        () => ({
            'price-per-unit': {
                value: 0,
                required: true,
            },
        }),
        [],
    );
    const editItemUnitsForm = useForm(initialValuesForUnits);
    const editItemPricePerUnitForm = useForm(initialValuesForPricePerUnit);
    const editItemQtyForm = useForm(initialValuesForQty);
    const itemInItems = () => items.find((i) => i._id === item.itemId);
    // function to update item units in the form
    useEffect(() => {
        editItemUnitsForm.setValues({
            'item-units': {value: item?.units || '', required: true},
        });
    }, [item.units, isEditUnitsMenuOpened]);
    // function to update item price per unit in the form
    useEffect(() => {
        // @ts-ignore
        editItemPricePerUnitForm.setValues({
            'price-per-unit': {value: item?.pricePerUnit || 0, required: true},
        });
    }, [item.pricePerUnit, isEditPriceMenuOpened]);
    // function to update item quantity in the form
    useEffect(() => {
        editItemQtyForm.setValues({
            'item-qty': {value: item?.quantity, required: true},
        });
    }, [item.quantity, isEditQtyMenuOpened]);
    // function to open and close edit qty menu
    const openEditQtyBarHandleClick: MouseEventHandler = () => {
        setIsEditQtyMenuOpened(!isEditQtyMenuOpened);
        if (!isEditQtyMenuOpened) {
            editItemQtyForm.resetForm();
        }
    };
    // function to open and close edit units menu
    const openEditUnitsBarHandleClick: MouseEventHandler = () => {
        setIsEditUnitsMenuOpened(!isEditUnitsMenuOpened);
        if (!isEditUnitsMenuOpened) {
            editItemUnitsForm.resetForm();
        }
    };
    // function to open and close edit price menu
    const openEditPriceBarHandleClick: MouseEventHandler = () => {
        setIsEditPriceMenuOpened(!isEditPriceMenuOpened);
        if (!isEditPriceMenuOpened) {
            editItemPricePerUnitForm.resetForm();
        }
    };
    // function to delete item from shopping list
    const deleteItemHandleClick: MouseEventHandler = async () => {
        dispatch(setIsLoadingTrue());
        try {
            if (activeShoppingList) {
                await dispatch(
                    deleteExistingItemFromSL({
                        shoppingListId: activeShoppingList || "",
                        shoppingListItemId: item._id,
                    })).unwrap();
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
        }

    };
    // function to update item quantity in shopping list
    const changeItemQtySubmitHandler: FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(setIsLoadingTrue());
        dispatch(
            updateItemQtyInExistingSL({
                shoppingListId: activeShoppingList || "",
                shoppingListItemId: item._id,
                quantity: editItemQtyForm.values['item-qty'].value,
            }),
        )
            .unwrap()
            .catch((err) => {
                setShowErrorTrue(err.message);
            })
            .finally(() => {
                dispatch(setIsLoadingFalse());
                setIsEditQtyMenuOpened(false);
            });
    };
    // function to increment item quantity in the form
    const incrementItemQtyHandleClick: MouseEventHandler = () => {
        editItemQtyForm.setValues({
            'item-qty': {
                value: editItemQtyForm.values['item-qty'].value + 1,
                required: true,
            },
        });
    };
    // function to decrement item quantity in the form
    const decrementItemQtyHandleClick: MouseEventHandler = () => {
        if (item.quantity === 1) {
            dispatch(
                setShowErrorTrue(
                    'Item quantity cannot be 0. If you want to delete this item, please, click "delete" button.',
                ),
            );
            return;
        }
        editItemQtyForm.setValues({
            'item-qty': {
                value: editItemQtyForm.values['item-qty'].value - 1,
                required: true,
            },
        });
    };
    // function to update item status in shopping list
    const updateItemStateHandleClick: MouseEventHandler = () => {
        const status = item.status === 'pending' ? 'completed' : 'pending';
        dispatch(setIsLoadingTrue());
        dispatch(
            updateItemStatusExistingSL({
                shoppingListId: activeShoppingList || "",
                status,
                shoppingListItemId: item._id,
            }),
        )
            .unwrap()
            .catch((err) => {
                setShowErrorTrue(err.message);
            })
            .finally(() => {
                dispatch(setIsLoadingFalse());
            });
    };
    // function to update item units in shopping list
    const handleEditItemUnitsClick: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(setIsLoadingTrue());
        dispatch(
            updateUnitsOfItemInSL({
                shoppingListId: activeShoppingList || "",
                shoppingListItemId: item._id,
                units: editItemUnitsForm.values['item-units'].value,
            }),
        )
            .unwrap()
            .catch((err) => {
                setShowErrorTrue(err.message);
            })
            .finally(() => {
                dispatch(setIsLoadingFalse());
                setIsEditUnitsMenuOpened(false);
            });
    };
    // function to update item price per unit in shopping list
    const handleEditItemPricePerUnitClick: FormEventHandler<HTMLFormElement> = (
        e,
    ) => {
        e.preventDefault();
        dispatch(setIsLoadingTrue());
        dispatch(
            updatePricePerUnitOfItemInSL({
                shoppingListId: activeShoppingList || "",
                shoppingListItemId: item._id,
                pricePerUnit: editItemPricePerUnitForm.values['price-per-unit'].value,
            }),
        )
            .unwrap()
            .catch((err) => {
                setShowErrorTrue(err.message);
            })
            .finally(() => {
                dispatch(setIsLoadingFalse());
                setIsEditPriceMenuOpened(false);
            });
    };

    return (
        <div className="shopping-list__item">
            <button
                type="button"
                aria-label="Item check-box"
                onClick={updateItemStateHandleClick}
                className={`shopping-list__item-checkbox ${
                    item.status === 'completed' && 'shopping-list__item-checkbox_checked'
                }`}
            />
            <p
                className={`shopping-list__item-name ${
                    item.status === 'completed' && 'shopping-list__item-name_completed'
                }`}
            >
                {itemInItems() ? itemInItems()!.name : 'Unknown Item'}
            </p>
            <div className="shopping-list__item-action-buttons">
                <button
                    type="button"
                    onClick={openEditQtyBarHandleClick}
                    className="shopping-list__item-action-button"
                >{`${item.quantity}`}</button>
                <button
                    type="button"
                    onClick={openEditUnitsBarHandleClick}
                    className="shopping-list__item-action-button"
                >{`${item.units}`}</button>
                <button
                    type="button"
                    onClick={openEditPriceBarHandleClick}
                    className="shopping-list__item-action-button"
                >{`$${item.pricePerUnit?.toFixed(2)}`}</button>
                <span
                    className="shopping-list__item-action-button shopping-list__item-action-button_total">{`$${item.price?.toFixed(
                    2,
                )}`}</span>
            </div>
            {isEditQtyMenuOpened ? (
                <form
                    onSubmit={changeItemQtySubmitHandler}
                    noValidate
                    name="shopping-list__edit-item-form"
                    className="shopping-list__edit-item shopping-list__edit-item_editQtyForm"
                >
                    <button
                        type="button"
                        onClick={deleteItemHandleClick}
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_delete"
                    >
                        {}
                    </button>
                    <button
                        type="button"
                        onClick={decrementItemQtyHandleClick}
                        className="shopping-list__change-qty shopping-list__change-qty_decrease"
                    >
                        {}
                    </button>
                    <input
                        required
                        type="number"
                        name="item-qty"
                        value={editItemQtyForm.values['item-qty'].value}
                        onChange={editItemQtyForm.handleChange}
                        className="shopping-list__item-action-button shopping-list__item-quantity_edit"
                    />
                    {editItemQtyForm.errors['item-qty'] && (
                        <span
                            className="shopping-list__edit-item-input-error shopping-list__edit-item-editQtyForm-error">
              {editItemQtyForm.errors['item-qty']}
            </span>
                    )}
                    <button
                        onClick={incrementItemQtyHandleClick}
                        type="button"
                        className="shopping-list__change-qty shopping-list__change-qty_increase"
                    >
                        {}
                    </button>
                    <button
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_submit"
                        type="submit"
                    >
                        {}
                    </button>
                    <button
                        onClick={openEditQtyBarHandleClick}
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel"
                        type="button"
                    >
                        {}
                    </button>
                </form>
            ) : null}
            {isEditUnitsMenuOpened ? (
                <form
                    onSubmit={handleEditItemUnitsClick}
                    className="shopping-list__edit-item"
                    noValidate
                    name="shopping-list__edit-item-editUnitsForm"
                >
                    <input
                        minLength={1}
                        maxLength={5}
                        required
                        name="item-units"
                        value={editItemUnitsForm.values['item-units'].value}
                        onChange={editItemUnitsForm.handleChange}
                        className="shopping-list__edit-item-editUnitsForm-input"
                        type="text"
                    />
                    {editItemUnitsForm.errors['item-units'] && (
                        <span
                            className="shopping-list__edit-item-input-error shopping-list__edit-item-editUnitsForm-error">
              {editItemUnitsForm.errors['item-units']}
            </span>
                    )}
                    <button
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_submit"
                        type="submit"
                    >
                        {}
                    </button>
                    <button
                        onClick={openEditUnitsBarHandleClick}
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel"
                        type="button"
                    >
                        {}
                    </button>
                </form>
            ) : null}
            {isEditPriceMenuOpened ? (
                <form
                    onSubmit={handleEditItemPricePerUnitClick}
                    className="shopping-list__edit-item"
                    noValidate
                    name="shopping-list__edit-item-ediPricePerUnitForm"
                >
                    <input
                        required
                        name="price-per-unit"
                        value={editItemPricePerUnitForm.values['price-per-unit'].value}
                        onChange={editItemPricePerUnitForm.handleChange}
                        className="shopping-list__edit-item-editUnitsForm-input"
                        type="number"
                    />
                    {editItemPricePerUnitForm.errors['price-per-unit'] && (
                        <span
                            className="shopping-list__edit-item-input-error shopping-list__edit-item-editPricePerUnitForm-error">
              {editItemPricePerUnitForm.errors['price-per-unit']}
            </span>
                    )}
                    <button
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_submit"
                        type="submit"
                    >
                        {}
                    </button>
                    <button
                        onClick={openEditPriceBarHandleClick}
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel"
                        type="button"
                    >
                        {}
                    </button>
                </form>
            ) : null}
        </div>
    );
}

export default ShoppingItem;
