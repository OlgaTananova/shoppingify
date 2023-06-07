import './SearchForm.css';
import {
  ChangeEventHandler, FormEventHandler, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../utils/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function SearchForm() {
  const initialValues = useMemo(() => ({
    'search-input': {
      value: '',
      required: true,
    },
  }), []);
  const searchForm = useForm(initialValues);
  const items = useAppSelector((state) => state.items.items);
  const [autoCompleteItems, setAutoCompleteItems] = useState<[string, string][]>(items.map((i) => [i.name.toLowerCase(), i._id]));
  const [autoCompleteItemsNames, setAutoCompleteItemsNames] = useState<string[]>(autoCompleteItems.map((item) => item[0]));
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAutoCompleteItemsNames(autoCompleteItems.map((item) => item[0]));
  }, [autoCompleteItems]);

  const handleItemsSearch: ChangeEventHandler = (e) => {
    searchForm.handleChange(e);
    !autoCompleteItemsNames.includes(searchForm.values['search-input'].value) && items
        && setAutoCompleteItems(
          items.map((item) => [item.name.toLowerCase(), item._id]),
        );
  };

  useEffect(() => {
    !autoCompleteItemsNames.includes(searchForm.values['search-input'].value)
            && searchForm.values['search-input'].value !== ''
      ? setError('There is not such item.')
      : setError('');
  }, [searchForm.values, autoCompleteItemsNames]);

  const handleItemSearchFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const item = autoCompleteItems.find((v) => v[0] === searchForm.values['search-input'].value);
    item && navigate(`/items/${item[1]}`);
    searchForm.resetForm();
  };

  return (
    <form className="search-items-form" onBlur={handleItemSearchFormSubmit} onSubmit={handleItemSearchFormSubmit} name="search-items-form" noValidate>
      <input
        className="search-items-input"
        type="text"
        required
        list="items"
        id="item"
        value={searchForm.values['search-input'].value}
        onChange={handleItemsSearch}
        pattern={autoCompleteItems.map((item) => item[0]).join('|')}
        autoComplete="off"
        name="search-input"
        placeholder="search item"
      />
      <datalist id="items">
        { autoCompleteItems.map((item) => <option id={item[1]} key={item[1]}>{item[0]}</option>)}
      </datalist>
      <span className="search-items-form__error">{error}</span>
    </form>
  );
}

export default SearchForm;
