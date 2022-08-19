import './SearchForm.css';
import useForm from "../../utils/useForm";
import {ChangeEventHandler, FormEventHandler, useEffect, useMemo, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";

const SearchForm = () => {
    const initialValues = useMemo(() => {
        return {
            'search-input': {
                value: '',
                required: true
            }
        }
    }, []);
    const searchForm = useForm(initialValues);
    const items = useAppSelector(state => state.items.items);
    const [autoCompleteItems, setAutoCompleteItems] = useState<[string, string][]>(items.map((item) => {
        return [item.name.toLowerCase(), item._id]
    }));
    const [autoCompleteItemsNames, setAutoCompleteItemsNames] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        setAutoCompleteItemsNames(autoCompleteItems.map((item) => {
            return item[0];
        }));
    }, [autoCompleteItems]);


    const handleItemsSearch: ChangeEventHandler = (e) => {
        searchForm.handleChange(e);
        !autoCompleteItemsNames.includes(searchForm.values['search-input'].value) && items &&
        setAutoCompleteItems(
            items.map((item) => {
                return [item.name.toLowerCase(), item._id]
            }));
    }

    useEffect(() => {
        !autoCompleteItemsNames.includes(searchForm.values['search-input'].value) &&
            searchForm.values['search-input'].value !== '' ?
            setError('There is not such item.')
            : setError('');
    }, [searchForm.values, autoCompleteItemsNames]);


    const handleItemSearchFormSubmit: FormEventHandler = (e)=>{
        e.preventDefault();
        const item = autoCompleteItems.find((item)=>{
            return item[0] === searchForm.values['search-input'].value;
        });
       item&& navigate(`/items/${item[1]}`);
       searchForm.resetForm();
    }

    return (
        <form className={'search-items-form'} onSubmit={handleItemSearchFormSubmit} name={'search-items-form'} noValidate={true}>
        <input className={'search-items-input'}
               type={'text'}
               required={true}
               list={'items'}
               id={'item'}
               value={searchForm.values['search-input'].value}
               onChange={handleItemsSearch}
               pattern={autoCompleteItems.map((item)=>{
                   return item[0]
               }).join('|')}
               autoComplete={'off'}
               name={'search-input'}
               placeholder={'search item'}/>
            <datalist id={'items'}>{
                autoCompleteItems.map((item)=>{
                    return <option id={item[1]} key={item[1]}>{item[0]}</option>
                })
            }</datalist>
            <span className={'search-items-form__error'}>{error}</span>
        </form>
    )
}

export default SearchForm;
