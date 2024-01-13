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
    clearShoppingList,
    deleteExistingItemFromSL, getActiveShoppingList,
    updateItemQtyInExistingSL,
    updateItemStatusExistingSL, updatePriceOfItemInSL,
    updatePricePerUnitOfItemInSL,
    updateUnitsOfItemInSL,
} from '../../store/shoppingSlice';
import useForm from '../../utils/useForm';
import {onUpdateActiveShoppingList, onUpdateShoppingLists} from "../../store/shoppingHistorySlice";

function ShoppingItem({item}: { item: IShoppingItem }) {
    const [isEditQtyMenuOpened, setIsEditQtyMenuOpened] = useState(false);
    const [isEditUnitsMenuOpened, setIsEditUnitsMenuOpened] = useState(false);
    const [isEditPricePerUnitMenuOpened, setIsEditPricePerUnitMenuOpened] = useState(false);
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
    const initialValuesForPrice = useMemo(() => ({
        'price': {
            value: 0,
            required: true,
        },
    }), []);
    const editItemUnitsForm = useForm(initialValuesForUnits);
    const editItemPricePerUnitForm = useForm(initialValuesForPricePerUnit);
    const editItemQtyForm = useForm(initialValuesForQty);
    const editItemPriceForm = useForm(initialValuesForPrice);
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
    }, [item.pricePerUnit, isEditPricePerUnitMenuOpened]);
    // function to update item quantity in the form
    useEffect(() => {
        editItemQtyForm.setValues({
            'item-qty': {value: item?.quantity, required: true},
        });
    }, [item.quantity, isEditQtyMenuOpened]);
    //function to update item's price in the form
    useEffect(() => {
        // @ts-ignore
        editItemPriceForm.setValues({
            'price': {value: item?.price || 0, required: true},
        });
    }, [item.price, isEditPriceMenuOpened]);

    /* Functions to open and close update item's bars */
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
    // function to open and close edit price per unit menu
    const openEditPricePerUnitBarHandleClick: MouseEventHandler = () => {
        setIsEditPricePerUnitMenuOpened(!isEditPricePerUnitMenuOpened);
        if (!isEditPricePerUnitMenuOpened) {
            editItemPricePerUnitForm.resetForm();
        }
    };
    // function to open and close the edit price menu bar
    const openEditPriceBarHandleClick: MouseEventHandler = () => {
        setIsEditPriceMenuOpened(!isEditPriceMenuOpened);
        if (!isEditPriceMenuOpened) {
            editItemPriceForm.resetForm();
        }
    };

    /* Functions to manipulate the item's data */
    // function to delete item from shopping list
    const deleteItemHandleClick: MouseEventHandler = async () => {
        try {
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                deleteExistingItemFromSL({
                    shoppingListId: activeShoppingList || "",
                    shoppingListItemId: item._id,
                })).unwrap();
            dispatch(onUpdateActiveShoppingList(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
        }

    };
    // function to update item quantity in shopping list
    const changeItemQtySubmitHandler: FormEventHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                updateItemQtyInExistingSL({
                    shoppingListId: activeShoppingList || "",
                    shoppingListItemId: item._id,
                    quantity: editItemQtyForm.values['item-qty'].value,
                }),
            ).unwrap();
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
            setIsEditQtyMenuOpened(false);
        }
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
    const updateItemStateHandleClick: MouseEventHandler = async () => {
        const status = item.status === 'pending' ? 'completed' : 'pending';
        try {
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                updateItemStatusExistingSL({
                    shoppingListId: activeShoppingList || "",
                    status,
                    shoppingListItemId: item._id,
                }),
            ).unwrap();
            dispatch(onUpdateShoppingLists(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error occurred.";
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
        }
    };
    // function to update item units in shopping list
    const handleEditItemUnitsClick: FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            e.preventDefault();
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                updateUnitsOfItemInSL({
                    shoppingListId: activeShoppingList || "",
                    shoppingListItemId: item._id,
                    units: editItemUnitsForm.values['item-units'].value,
                }),
            ).unwrap();
            dispatch(onUpdateActiveShoppingList(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error occurred.";
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
            setIsEditUnitsMenuOpened(false);
        }
    };
    // function to update item price per unit in shopping list
    const handleEditItemPricePerUnitClick: FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            e.preventDefault();
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                updatePricePerUnitOfItemInSL({
                    shoppingListId: activeShoppingList || "",
                    shoppingListItemId: item._id,
                    pricePerUnit: editItemPricePerUnitForm.values['price-per-unit'].value,
                }),
            ).unwrap();
            dispatch(onUpdateActiveShoppingList(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error occurred.";
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
            setIsEditPricePerUnitMenuOpened(false);
        }
    };
    // function to update  the item's price in the shopping list
    const handleEditItemPriceClick: FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            e.preventDefault();
            dispatch(setIsLoadingTrue());
            const data = await dispatch(updatePriceOfItemInSL({
                shoppingListId: activeShoppingList || "",
                shoppingListItemId: item._id,
                price: editItemPriceForm.values.price.value,
            })).unwrap();
            dispatch(onUpdateActiveShoppingList(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error occurred.";
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
            setIsEditPriceMenuOpened(false);
        }
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
                    onClick={openEditPricePerUnitBarHandleClick}
                    className="shopping-list__item-action-button"
                >{`$${item.pricePerUnit?.toFixed(2)}`}</button>
                <button
                    type="button"
                    onClick={openEditPriceBarHandleClick}
                    className="shopping-list__item-action-button">{`$${item.price?.toFixed(
                    2,
                )}`}</button>
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
            {isEditPricePerUnitMenuOpened ? (
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
                        onClick={openEditPricePerUnitBarHandleClick}
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_cancel"
                        type="button"
                    >
                        {}
                    </button>
                </form>
            ) : null}
            {isEditPriceMenuOpened ? (
                    <form
                        onSubmit={handleEditItemPriceClick}
                        className="shopping-list__edit-item"
                        noValidate
                        name="shopping-list__edit-item-ediPriceForm">
                        <input
                            required
                            name="price"
                            value={editItemPriceForm.values.price.value}
                            onChange={editItemPriceForm.handleChange}
                            className="shopping-list__edit-item-editPriceForm-input"
                            type="number"
                        />
                        {editItemPriceForm.errors.price && (
                            <span
                                className="shopping-list__edit-item-input-error shopping-list__edit-item-editPriceForm-error">
                                {editItemPricePerUnitForm.errors.price}
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
                )
                : null}
        </div>
    );
}

export default ShoppingItem;
