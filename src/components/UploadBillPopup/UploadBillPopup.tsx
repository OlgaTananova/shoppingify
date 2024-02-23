/*
 This component is responsible for merging the bill with the existing
 shopping list.
*/

import './UploadBillPopup.css';
import {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
    closeUploadBillPopup,
    setInfoMessage,
    setIsLoadingFalse,
    setIsLoadingTrue,
    setShowErrorTrue,
} from '../../store/appSlice';
import {
    clearUploadedItems, closeUploadBillForm,
    createSLFromBill, getActiveShoppingList,
    mergeList,
    updateUploadedItems,
} from '../../store/shoppingSlice';
import {
    IFullShoppingItem, IItem,
    IShoppingItem,
    IUploadedShoppingItem,
    IUploadedShoppingItemErrors,
    IUploadedShoppingItemInitialState, IUploadListItemPayload,
} from '../../types';
import useForm from '../../utils/useForm';
import {onAddNewShoppingList, onUpdateActiveShoppingList} from "../../store/shoppingHistorySlice";

function UploadBillPopup() {
    const uploadedItems = useAppSelector((state) => state.shopping.uploadedBill.items);
    const uploadedSalesTax = useAppSelector((state) => state.shopping.uploadedBill.salesTax);
    const uploadedDateOfPurchase = useAppSelector((state) => state.shopping.uploadedBill.dateOfPurchase);
    const itemsFromSL = useAppSelector((state) => state.shopping.items);
    const itemsFromItems = useAppSelector((state) => state.items.items);
    const categories = useAppSelector((state) => state.categories.categories);
    const activeShoppingList = useAppSelector((state) => state.shopping._id);
    const showUploadBillPopup = useAppSelector(
        (state) => state.app.showUploadBillPopup);
    const [itemsFromSLWithNames, setItemsFromSLWithNames] = useState<IFullShoppingItem[]>([]);
    const [mergedSL, setMergedSL] = useState<IFullShoppingItem[]>([]);
    const [uploadedBill, setUploadedBill] = useState<IUploadListItemPayload[]>([]);
    const [totalSum, setTotalSum] = useState(0);
    const [isActiveSL, setIsActiveSL] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const editUploadedItemsForm = useForm<IUploadedShoppingItemInitialState[]>(
        [],
    );
    const editSalesTaxForm = useForm({
        'sales-tax': {value: 0, required: true},
    });
    const [errorsForUploadedItems, setErrorsForUploadedItems] = useState<IUploadedShoppingItemErrors[]>([]);
    const [isUploadedItemsValid, setIsUploadedItemsValid] = useState(false);

    // function to determine the total sum of the bill, sales tax and date of the bill
    // it triggers every time the uploadedItems, editUploadedItemsForm.values and editSalesTaxForm.values change
    useEffect(() => {
        const calculatedTotalSum = editUploadedItemsForm.values?.reduce(
            (acc, item) => acc + Number(item?.itemPrice.value),
            0,
        );
        const calculatedSalesTax =
            Number(editSalesTaxForm.values['sales-tax'].value) || 0;
        setTotalSum(calculatedTotalSum + calculatedSalesTax);
    }, [editUploadedItemsForm.values, editSalesTaxForm.values]);

    // function to add the names of the items and categories to the current shopping list if the shopping list is not empty
    useEffect(() => {
        if (itemsFromSL && itemsFromSL?.length > 0) {
            const list = itemsFromSL?.map((item) => {
                const itemName =
                    itemsFromItems.find((i) => i._id === item?.itemId)?.name || '';
                const itemCategoryName =
                    categories.find((c) => c._id === item?.categoryId)?.category || '';
                return {
                    ...item,
                    itemName,
                    itemCategoryName,
                };
            });
            // @ts-ignore
            setItemsFromSLWithNames(list);
        }
    }, [itemsFromSL, itemsFromItems, categories]);

    // function to set values to the forms
    useEffect(() => {
        editSalesTaxForm.setValues({'sales-tax': {value: uploadedSalesTax || 0, required: true}});
        uploadedItems?.forEach((item) => {
            if (editUploadedItemsForm.values.find((i) => i.itemName.value === item?.itemName)) return;
            editUploadedItemsForm.setValues((prev) => [
                ...prev,
                {
                    itemName: {
                        value: item?.itemName || '',
                        required: true,
                    },
                    itemUnits: {
                        value: item?.itemUnits || '',
                        required: true,
                    },
                    itemQuantity: {
                        value: Number(item?.itemQuantity) || 0,
                        required: true,
                    },
                    itemPrice: {
                        value: Number(item?.itemPrice) || 0,
                        required: true,
                    },
                    itemPricePerUnit: {
                        value: Number(item?.itemPricePerUnit) || 0,
                        required: true,
                    },
                    databaseItemName: {
                        value: item?.databaseItemName || "Noname",
                        required: true,
                    },
                },
            ]);
            setErrorsForUploadedItems((prev) => [
                ...prev,
                {
                    itemName: {
                        error: '',
                    },
                    itemUnits: {
                        error: '',
                    },
                    itemQuantity: {
                        error: '',
                    },
                    itemPrice: {
                        error: '',
                    },
                    itemPricePerUnit: {
                        error: '',
                    },
                    databaseItemName: {
                        error: '',
                    },
                },
            ]);
        });
    }, [uploadedItems, uploadedSalesTax]);

    // Function to set values of the list of items to upload it to the server (without active shopping list)
    useEffect(() => {
        const items = uploadedItems && uploadedItems.map((item) => {
            const itemInStore = itemsFromItems?.find((i) => {
                const whereToSearch = item?.databaseItemName.toLowerCase() || '';
                const wordToSearch = i?.name?.toLowerCase().trim() || '';
                const regexToSearchPluralFormWord = new RegExp(
                    `\\b${wordToSearch}s?\\b`,
                    'gi',
                );
                const regexToSearchSingularFormWord = new RegExp(
                    `\\b${wordToSearch.slice(0, -1)}s?\\b`,
                    'gi',
                );
                const match =
                    regexToSearchPluralFormWord.test(whereToSearch) ||
                    regexToSearchSingularFormWord.test(whereToSearch);
                return match;
            });
            return {
                itemId: itemInStore?._id || '',
                itemName: item?.databaseItemName || '',
                categoryId: itemInStore?.categoryId || '',
                quantity: Number(item?.itemQuantity) || 0,
                status: 'completed',
                units: item?.itemUnits || '',
                pricePerUnit: Number(item?.itemPricePerUnit) || 0,
                price: Number(item?.itemPrice) || 0,
            };
        });
        setUploadedBill(items);
    }, [uploadedItems]);

// function to set the list of items to be merged with the current shopping list
    useEffect(() => {
        if (uploadedItems !== undefined && uploadedItems.length > 0) {
            const items: IFullShoppingItem[] = uploadedItems.reduce(function (prev: IFullShoppingItem[], item): IFullShoppingItem[] {
                const itemFromSL = itemsFromSLWithNames?.find((i) => {
                    const wordToSearch = i?.itemName?.toLowerCase() || '';
                    const whereToSearch = item?.itemName?.toLowerCase()?.trim() || '';
                    const regexToSearchPluralFormWord = new RegExp(
                        `\\b${wordToSearch}s?\\b`,
                        'gi',
                    );
                    const regexToSearchSingularFormWord = new RegExp(
                        `\\b${wordToSearch.slice(0, -1)}s?\\b`,
                        'gi',
                    );
                    const match =
                        regexToSearchPluralFormWord.test(whereToSearch) ||
                        regexToSearchSingularFormWord.test(whereToSearch);
                    return match;
                });
                return [
                    ...prev,
                    {
                        _id: itemFromSL?._id || "",
                        itemId: itemFromSL?.itemId || '',
                        itemName: (item?.databaseItemName !== "Noname" ? item?.databaseItemName : item.itemName) || "",
                        itemCategoryName: itemFromSL?.itemCategoryName || '',
                        categoryId: itemFromSL?.categoryId || '',
                        quantity: Number(item?.itemQuantity) || 0,
                        units: item?.itemUnits || '',
                        status: 'completed',
                        pricePerUnit: Number(item?.itemPricePerUnit) || 0,
                        price: Number(item?.itemPrice) || 0,
                    },
                ];
            }, []);
            setMergedSL(items);
        }
    }, [uploadedItems]);

// function to identify if the form is valid or not
    useEffect(() => {
        const isValid = errorsForUploadedItems.some((item) =>
            Object.values(item).some((value) => value.error !== ''),
        );
        setIsUploadedItemsValid(!isValid);
    }, [errorsForUploadedItems, editUploadedItemsForm.values]);

// function to identify if the active shopping list is empty or not
    useEffect(() => {
        if (itemsFromSL && itemsFromSL?.length > 0) {
            setIsActiveSL(true);
        } else {
            setIsActiveSL(false);
        }
    }, [itemsFromSL]);

// handler to close the popup
    const handleUploadBillPopupCloseBtnClick = () => {
        dispatch(closeUploadBillPopup());
        dispatch(clearUploadedItems());
        editUploadedItemsForm.resetForm();
        editSalesTaxForm.resetForm();
        setErrorsForUploadedItems([]);
        setIsUploadedItemsValid(false);
        setUploadedBill([]);
        dispatch(closeUploadBillForm());
    };

// handler to merge the bill with the active shopping list:
// 1. it checks if the length of the items from the shopping list is equal to the length of the items from the uploaded bill
// 2. it checks if the items from the shopping list and the items from the uploaded bill have the same names
// 3. it merges the items from the shopping list with the items from the uploaded bill
// 4. it merges the shopping list with the uploaded bill
    const handleMergeListPopupMergeBtnClick = () => {
        if (itemsFromSL && itemsFromSL.length === 0) {
            dispatch(
                setShowErrorTrue(
                    'Please add items to the shopping list before merging',
                ),
            );
        } else if (
            mergedSL.length === 0 ||
            mergedSL.some((item) => item.itemId === '')
        ) {
            dispatch(
                setShowErrorTrue(
                    'Please add all the items to the shopping list before merging the bill',
                ),
            );
        } else {
            dispatch(setIsLoadingTrue());
            dispatch(
                mergeList({
                    items: mergedSL,
                    salesTax: uploadedSalesTax,
                    date: uploadedDateOfPurchase,
                    _id: activeShoppingList || '',
                }),
            )
                .unwrap()
                .then((data) => {
                    dispatch(onUpdateActiveShoppingList(data));
                    if (data.updatedShoppingList.status === "active") {
                        dispatch(getActiveShoppingList(data.updatedShoppingList));
                    }
                })
                .catch((err) => {
                    dispatch(setShowErrorTrue(err.error.message));
                })
                .finally(() => {
                    dispatch(setIsLoadingFalse());
                    dispatch(closeUploadBillPopup());
                    setMergedSL([]);
                    setTotalSum(0);
                    editUploadedItemsForm.resetForm();
                    editSalesTaxForm.resetForm();
                    setErrorsForUploadedItems([]);
                    setIsUploadedItemsValid(false);
                    dispatch(clearUploadedItems());
                    dispatch(closeUploadBillForm());
                });
        }
    };

// function to upload the bill:
// 1. it checks if there is no active shopping list
// 2. it iterates over the list of uploaded items and finds the corresponding item in the store
// 3. it creates a new array of items with the fields from the uploaded items
// 4. it sets the merged bill to the state
// 5. it checks if all the items have been found in the store
// 6. it dispatches the mergeList thunk
    const handleUploadBillWithoutActiveSLClickButton = () => {
        if (activeShoppingList) {
            dispatch(
                setShowErrorTrue(
                    'You already have an active shopping list. Please use "Merge" button to merge the bill with the active shopping list',
                ),
            );
        } else if (uploadedBill.some((item) => item.itemId === '')) {
            dispatch(
                setShowErrorTrue(
                    'Please add all the items to the store before merging the bill',
                ),
            );
        } else {
            dispatch(setIsLoadingTrue());
            dispatch(
                createSLFromBill({
                    items: uploadedBill,
                    salesTax: uploadedSalesTax,
                    date: uploadedDateOfPurchase || Date.now().toLocaleString(),
                }),
            )
                .unwrap()
                .then((data) => {
                    dispatch(onAddNewShoppingList(data));
                    if (data.addedShoppingList.status === 'active') {
                        dispatch(getActiveShoppingList(data.addedShoppingList));
                    }
                })
                .catch((err) => {
                    dispatch(setShowErrorTrue(err.message));
                })
                .finally(() => {
                    dispatch(setIsLoadingFalse());
                    dispatch(closeUploadBillPopup());
                    setUploadedBill([]);
                    editUploadedItemsForm.resetForm();
                    editSalesTaxForm.resetForm();
                    setErrorsForUploadedItems([]);
                    setIsUploadedItemsValid(false);
                    setTotalSum(0);
                    dispatch(clearUploadedItems());
                    dispatch(closeUploadBillForm());
                });
        }
    };

// function to handle the change of the input fields in the edit form
    const handleEditFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let index: string | number | null | undefined =
            e?.target?.parentElement?.getAttribute('data-index');
        index = index ? Number(index) : null;
        if (index !== undefined && index !== null) {
            editUploadedItemsForm.setValues((prev) => {
                const prevValues = [...prev];
                if (e.target.name === 'itemQuantity') {
                    // @ts-ignore
                    prevValues[index][e.target.name].value = e.target.value;
                    // @ts-ignore
                    prevValues[index].itemPrice.value =
                        Number(e.target.value) *
                        // @ts-ignore
                        Number(prevValues[index].itemPricePerUnit.value);
                    return prevValues;
                }
                if (e.target.name === 'itemPricePerUnit') {
                    // @ts-ignore
                    prevValues[index][e.target.name].value = e.target.value;
                    // @ts-ignore
                    prevValues[index].itemPrice.value =
                        Number(e.target.value) *
                        // @ts-ignore
                        Number(prevValues[index].itemQuantity.value);
                    return prevValues;
                }
                // @ts-ignore
                prevValues[index][e.target.name].value = e.target.value;
                return prevValues;
            });
            setErrorsForUploadedItems((prev) => {
                const prevErrors = [...prev];
                // @ts-ignore
                prevErrors[index][e.target.name].error = e.target.validationMessage;
                return prevErrors;
            });
        }
    };

// function to handle the change of the input fields in the edit form by clicking "Change" button
    const handleEditUploadedItemsClick: MouseEventHandler = (e) => {
        const updatedItems: IUploadedShoppingItem[] =
            editUploadedItemsForm.values.map((item) => ({
                itemName: item.itemName.value,
                itemUnits: item.itemUnits.value,
                itemQuantity: String(item.itemQuantity.value),
                itemPrice: String(item.itemPrice.value),
                itemPricePerUnit: String(item.itemPricePerUnit.value),
                databaseItemName: item.databaseItemName.value === "Noname" ? item.itemName.value : item.databaseItemName.value,
            }));
        const updatedSalesTax: number = editSalesTaxForm.values["sales-tax"].value;

        dispatch(clearUploadedItems());
        editUploadedItemsForm.resetForm();
        editSalesTaxForm.resetForm();
        dispatch(updateUploadedItems({
            items: updatedItems,
            salesTax: updatedSalesTax,
            dateOfPurchase: uploadedDateOfPurchase,
        }));
        dispatch(setInfoMessage(true));
        dispatch(setShowErrorTrue('Bill updated successfully!'));
    };

// function to highlight items that are not found in the items database
    const highLightItem = (item: IUploadedShoppingItemInitialState): string => {
        if (item) {
            return item.databaseItemName.value !== "Noname" ? "" : 'upload-bill-popup__list-item_notfound';
        } else {
            return 'upload-bill-popup__list-item_notfound';
        }
    };

    return (
        <div
            className={`upload-bill-popup ${
                !showUploadBillPopup && 'upload-bill-popup_inactive'
            }`}
        >
            <div className="upload-bill-popup__inner-container">
                <button
                    type="button"
                    onClick={handleUploadBillPopupCloseBtnClick}
                    className="upload-bill-popup__close-btn"
                >
                    {}
                </button>
                <h2 className="upload-bill-popup__heading">Uploaded Items</h2>
                <span className="upload-bill-popup__warning">
            Items with this color are neither in the shopping list nor in the list
            of the items.{' '}
          </span>
                <form
                    className="upload-bill-popup__list"
                    noValidate
                    name="upload-bill-popup-form"
                >
                    <ul className="upload-bill-popup__list-header">
                        <li className="upload-bill-popup__item-name">Item Name</li>
                        <li className="upload-bill-popup__item-small-cell">Units</li>
                        <li className="upload-bill-popup__item-small-cell">Qty</li>
                        <li className="upload-bill-popup__item-small-cell">
                            Price per unit
                        </li>
                        <li className="upload-bill-popup__item-small-cell">Total</li>
                    </ul>

                    {/* Items from the uploaded bill*/}
                    {editUploadedItemsForm.values.map((item, index) => (
                        <li
                            key={index}
                            data-index={index}
                            className={`${highLightItem(item)} upload-bill-popup__list-item`}
                        >
                            <input
                                required
                                minLength={2}
                                name="itemName"
                                value={item.databaseItemName.value === "Noname" ? item.itemName.value : item.databaseItemName.value}
                                onChange={handleEditFormChange}
                                className="upload-bill-popup__item-name upload-bill-popup__item-input"
                            />
                            {errorsForUploadedItems[index].itemName.error && (
                                <span className="upload-bill-popup__item-error">
                    {errorsForUploadedItems[index].itemName.error}
                  </span>
                            )}
                            <input
                                minLength={1}
                                required
                                name="itemUnits"
                                value={item.itemUnits.value}
                                onChange={handleEditFormChange}
                                className="upload-bill-popup__item-small-cell upload-bill-popup__item-input upload-bill-popup__item-small-cell_units"
                            />
                            {errorsForUploadedItems[index].itemUnits.error && (
                                <span className="upload-bill-popup__item-error">
                    {errorsForUploadedItems[index].itemUnits.error}
                  </span>
                            )}
                            <input
                                required
                                type="number"
                                step="0.01"
                                name="itemQuantity"
                                value={item.itemQuantity.value}
                                onChange={handleEditFormChange}
                                className="upload-bill-popup__item-small-cell upload-bill-popup__item-input upload-bill-popup__item-small-cell_quantity"
                            />
                            {errorsForUploadedItems[index].itemQuantity.error && (
                                <span className="upload-bill-popup__item-error">
                    {errorsForUploadedItems[index].itemQuantity.error}
                  </span>
                            )}
                            <input
                                required
                                type="number"
                                step="0.01"
                                name="itemPricePerUnit"
                                value={item.itemPricePerUnit.value}
                                onChange={handleEditFormChange}
                                className="upload-bill-popup__item-small-cell upload-bill-popup__item-input upload-bill-popup__item-small-cell_pricePerUnit"
                            />
                            {errorsForUploadedItems[index].itemPricePerUnit.error && (
                                <span className="upload-bill-popup__item-error">
                    {errorsForUploadedItems[index].itemPricePerUnit.error}
                  </span>
                            )}
                            <input
                                required
                                type="number"
                                step="0.01"
                                name="itemPrice"
                                value={item.itemPrice.value}
                                onChange={handleEditFormChange}
                                className="upload-bill-popup__item-small-cell  upload-bill-popup__item-input upload-bill-popup__item-small-cell_price"
                            />
                            {errorsForUploadedItems[index].itemPrice.error && (
                                <span className="upload-bill-popup__item-error">
                    {errorsForUploadedItems[index].itemPrice.error}
                  </span>
                            )}
                        </li>
                    ))}
                    <li className="upload-bill-popup__list-footer">
                        <div className="upload-bill-popup__list-footer-section">
                            <div className="upload-bill-popup__item-name">Sales Tax</div>
                            <input
                                type="number"
                                step="0.01"
                                name="sales-tax"
                                value={editSalesTaxForm.values['sales-tax'].value}
                                onChange={editSalesTaxForm.handleChange}
                                className="upload-bill-popup__item-small-cell upload-bill-popup__item-input"
                            />
                        </div>
                        <div className="upload-bill-popup__list-footer-section">
                            <div className="upload-bill-popup__item-name">Total</div>
                            <div className="upload-bill-popup__item-small-cell">
                                {totalSum?.toFixed(2)}
                            </div>
                        </div>
                    </li>
                </form>
                {/*Buttons    */}
                <div className="upload-bill-popup__actions-section">
                    <button
                        className={`${
                            !isUploadedItemsValid && 'upload-bill-popup__action-btn_disabled'
                        } upload-bill-popup__action-btn upload-bill-popup__action-btn_change`}
                        type="button"
                        disabled={!isUploadedItemsValid}
                        onClick={handleEditUploadedItemsClick}
                    >
                        Change List
                    </button>
                    <button
                        disabled={
                            uploadedItems?.length === 0 ||
                            !isUploadedItemsValid ||
                            !isActiveSL
                        }
                        type="button"
                        onClick={handleMergeListPopupMergeBtnClick}
                        className={`${
                            (!isUploadedItemsValid ||
                                uploadedItems?.length === 0 ||
                                !isActiveSL) &&
                            'upload-bill-popup__action-btn_disabled'
                        } upload-bill-popup__action-btn upload-bill-popup__action-btn_merge`}
                    >
                        Merge List
                    </button>
                    <button
                        type="button"
                        disabled={
                            uploadedItems?.length === 0 || !isUploadedItemsValid || isActiveSL
                        }
                        onClick={handleUploadBillWithoutActiveSLClickButton}
                        className={`${
                            (!isUploadedItemsValid ||
                                uploadedItems?.length === 0 ||
                                isActiveSL) &&
                            'upload-bill-popup__action-btn_disabled'
                        } upload-bill-popup__action-btn upload-bill-popup__action-btn_upload-list`}
                    >
                        Upload list
                    </button>
                    <button
                        type="button"
                        onClick={handleUploadBillPopupCloseBtnClick}
                        className="upload-bill-popup__action-btn upload-bill-popup__action-btn_cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadBillPopup;
