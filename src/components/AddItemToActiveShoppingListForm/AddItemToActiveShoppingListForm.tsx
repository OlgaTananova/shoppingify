import {
    ChangeEventHandler,
    FormEventHandler,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import useForm from '../../utils/useForm';
import {
    setIsLoadingFalse,
    setIsLoadingTrue,
    setShowErrorTrue,
} from '../../store/appSlice';
import {addNewItemToShoppingList, clearShoppingList, getActiveShoppingList} from '../../store/shoppingSlice';
import {IAddItemToShoppingListPayload} from "../../types";
import {onUpdateActiveShoppingList} from "../../store/shoppingHistorySlice";

function AddItemToActiveShoppingListForm() {
    const activeShoppingList = useAppSelector((state) => state.shopping);
    const items = useAppSelector((state) => state.items.items);
    const [autoCompleteItems, setAutoCompleteItems] = useState<[string, string][]>([]);
    const [autoCompleteItemsNames, setAutoCompleteItemsNames] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const initialValues = useMemo(
        () => ({
            'add-item-input': {
                value: '',
                required: true,
            },
        }),
        [],
    );

    const addItemForm = useForm(initialValues);

    useEffect(() => {
        setAutoCompleteItemsNames(autoCompleteItems.map((item) => item[0]));
    }, [autoCompleteItems]);

    useEffect(() => {
        if (
            !autoCompleteItemsNames.includes(
                addItemForm.values['add-item-input'].value,
            ) &&
            addItemForm.values['add-item-input'].value !== ''
        ) {
            setError('There is not such item.');
        } else {
            setError('');
        }
    }, [addItemForm.values, autoCompleteItemsNames]);

    const handleItemsSearch: ChangeEventHandler = (e) => {
        addItemForm.handleChange(e);
        if (
            !autoCompleteItemsNames.includes(
                addItemForm.values['add-item-input'].value,
            ) &&
            items
        ) {
            setAutoCompleteItems(
                items.map((item) => [item.name.toLowerCase(), item._id]),
            );
        }
    };

    const addItemToActiveShoppingListHandleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        const clearedInput = addItemForm.values['add-item-input'].value
            .toLowerCase()
            .trim();
        const addedItem = items.find(
            (item) => item.name.toLowerCase().trim() === clearedInput,
        );
        let newShoppingListItem: IAddItemToShoppingListPayload;
        if (addedItem && activeShoppingList) {
            newShoppingListItem = {
                shoppingListId: activeShoppingList._id || "",
                categoryId: addedItem.categoryId,
                itemId: addedItem._id,
            };
        } else {
            dispatch(setShowErrorTrue('Item or category is not found.'));
            return;
        }
        try {
            dispatch(setIsLoadingTrue());
            const data = await dispatch(
                addNewItemToShoppingList(newShoppingListItem)).unwrap();
            dispatch(onUpdateActiveShoppingList(data));
            if (data.updatedShoppingList.status === "active") {
                dispatch(clearShoppingList());
                dispatch(getActiveShoppingList(data.updatedShoppingList));
            }
            addItemForm.resetForm();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            dispatch(setShowErrorTrue(errorMessage));
        } finally {
            dispatch(setIsLoadingFalse());
        }
    };

    return (
        <div className="shopping-list__add-item-form-container">
            <form
                className="shopping-list__add-item-form"
                noValidate
                onSubmit={addItemToActiveShoppingListHandleSubmit}
                name="add-item-form"
            >
                <input
                    className="shopping-list__add-item-input"
                    name="add-item-input"
                    list="items"
                    value={addItemForm.values['add-item-input'].value}
                    pattern={autoCompleteItems.map((item) => item[0]).join('|')}
                    onChange={handleItemsSearch}
                    required
                    placeholder="Enter a name"
                />
                <datalist id="items">
                    {autoCompleteItems.map((item) => (
                        <option id={item[1]} key={item[1]}>
                            {item[0]}
                        </option>
                    ))}
                </datalist>
                <button
                    type="submit"
                    disabled={!addItemForm.isValid}
                    className="shopping-list__add-item-submit-btn"
                >
                    Save
                </button>
            </form>
            <span className="shopping-list__add-item-error">{error}</span>
        </div>
    );
}

export default AddItemToActiveShoppingListForm;
