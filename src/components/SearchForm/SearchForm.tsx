import './SearchForm.css';

const SearchForm = () => {
    return (
        <input className={'search-form'}
               type={'text'}
               required={true}
               name={'search-input'}
               placeholder={'search item'}/>
    )
}

export default SearchForm;
