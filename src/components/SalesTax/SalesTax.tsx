import './SalesTax.css';
import {FormEventHandler, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import useForm from '../../utils/useForm';
import {
    setIsLoadingFalse,
    setIsLoadingTrue,
    setShowErrorTrue,
} from '../../store/appSlice';
import {clearShoppingList, getActiveShoppingList, updateSalesTaxInSL} from '../../store/shoppingSlice';
import {onUpdateActiveShoppingList} from "../../store/shoppingHistorySlice";

export default function SalesTax() {
    const salesTax = useAppSelector((state) => state.shopping.salesTax);
    const shoppingListId = useAppSelector((state) => state.shopping._id);
    const [isEditSalesTaxOpened, setIsEditSalesTaxOpened] =
        useState<boolean>(false);
    const dispatch = useAppDispatch();
    const initialValues = useMemo(
        () => ({
            'sales-tax': {
                value: 0,
                required: true,
            },
        }),
        [],
    );
    const editSalesTaxForm = useForm(initialValues);
    const handleEditSalesTaxBarClick = () => {
        setIsEditSalesTaxOpened(!isEditSalesTaxOpened);
    };

    useEffect(() => {
        editSalesTaxForm.setValues({
            'sales-tax': {value: salesTax || 0, required: true},
        });
    }, [salesTax]);

    const handleUpdateSalesTaxSubmitForm: FormEventHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                updateSalesTaxInSL({
                    salesTax: editSalesTaxForm.values['sales-tax'].value,
                    shoppingListId,
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
            setIsEditSalesTaxOpened(false);
        }
    };

    return (
        <div className="sales-tax">
            <p className="sales-tax__heading">Sales Tax</p>
            <button
                type="button"
                onClick={handleEditSalesTaxBarClick}
                className="sales-tax__action-button"
            >{`$ ${salesTax}`}</button>
            {isEditSalesTaxOpened ? (
                <form
                    onSubmit={handleUpdateSalesTaxSubmitForm}
                    className="shopping-list__edit-item"
                    noValidate
                    name="shopping-list__edit-item-editSalesTaxForm"
                >
                    <input
                        name="sales-tax"
                        required
                        value={editSalesTaxForm.values['sales-tax'].value}
                        onChange={editSalesTaxForm.handleChange}
                        className="shopping-list__edit-item-editSalesTaxForm-input"
                        type="number"
                    />
                    {editSalesTaxForm.errors['sales-tax'] && (
                        <span
                            className="shopping-list__edit-item-input-error shopping-list__edit-item-editSalesTaxForm-error">
              {editSalesTaxForm.errors['sales-tax']}
            </span>
                    )}
                    <button
                        className="shopping-list__edit-item-action-button shopping-list__edit-item-action-button_submit"
                        type="submit"
                    >
                        {}
                    </button>
                    <button
                        onClick={handleEditSalesTaxBarClick}
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
