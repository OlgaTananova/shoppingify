import './CreateShoppingListForm.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ChangeEventHandler, FormEventHandler, useEffect, useMemo, useState } from 'react';
import useForm from '../../utils/useForm';
import { setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue } from '../../store/appSlice';
import { createNewShoppingList } from '../../store/shoppingSlice';

const CreateShoppingListForm = ()=> {
  const items = useAppSelector(state => state.items.items);
  const [autoCompleteItems, setAutoCompleteItems] = useState<[string, string][]>([]);
  const [autoCompleteItemsNames, setAutoCompleteItemsNames] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const initialValues = useMemo(() => {
    return {
      'add-item-input': {
        value: '',
        required: true,
      },
    };
  }, []);
  const createShoppingListForm = useForm(initialValues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAutoCompleteItemsNames(autoCompleteItems.map((item) => {
      return item[0];
    }));
  }, [autoCompleteItems]);

  useEffect(() => {
    !autoCompleteItemsNames.includes(createShoppingListForm.values['add-item-input'].value) &&
        createShoppingListForm.values['add-item-input'].value !== '' ?
      setError('There is not such item.')
      : setError('');
  }, [createShoppingListForm.values, autoCompleteItemsNames]);

  const handleItemsSearch: ChangeEventHandler = (e) => {
    createShoppingListForm.handleChange(e);
    !autoCompleteItemsNames.includes(createShoppingListForm.values['add-item-input'].value) && items &&
        setAutoCompleteItems(
          items.map((item) => {
            return [item.name.toLowerCase(), item._id];
          }));
  };

  const handleCreateShoppingListFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const clearedInput = createShoppingListForm.values['add-item-input'].value.toLowerCase().trim();
    const addedItem = items.find((item) => {
      return item.name.toLowerCase().trim() === clearedInput;
    });
    if (!addedItem) {
      dispatch(setShowErrorTrue('Item or category is not found.'));
    } else {
      dispatch(setIsLoadingTrue());
      dispatch(createNewShoppingList({
        itemId: addedItem._id,
        categoryId: addedItem.categoryId,
      })).unwrap()
        .then(() => {
          createShoppingListForm.resetForm();
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    }

  };
  return (
            <div className={'shopping-list__add-item-form-container'}>
                <form className={'shopping-list__add-item-form shopping-list__add-item-form_empty'}
                      name={'create-shopping-list-form'}
                      onSubmit={handleCreateShoppingListFormSubmit}
                      noValidate={true}>
                    <input className={'shopping-list__add-item-input'}
                           name={'add-item-input'}
                           required={true}
                           list={'items'}
                           value={createShoppingListForm.values['add-item-input'].value}
                           pattern={autoCompleteItems.map((item)=>{
                             return item[0];
                           }).join('|')}
                           onChange={handleItemsSearch}
                           placeholder={'Enter a name'}/>
                    <datalist id={'items'}>{
                        autoCompleteItems.map((item)=>{
                          return <option id={item[1]} key={item[1]}>{item[0]}</option>;
                        })
                    }</datalist>
                    <button type={'submit'}
                            disabled={!createShoppingListForm.isValid}
                            className={'shopping-list__add-item-submit-btn shopping-list__add-item-submit-btn_empty'}>{'Save'}</button>
                </form>
                <span className={'shopping-list__add-item-error'}>{error}</span>
            </div>);
};

export default CreateShoppingListForm;
