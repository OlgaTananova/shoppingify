import './AddNewCategory.css';

const AddNewCategory = () => {
    return (
        <form name={'add-new-category-form'}
              className={'add-new-category-form'} noValidate={true}>
            <input className={'add-new-category-form__input'}
                   type={'text'}
                   required={true}
                    placeholder={'category'}
                    />
            <button type={'submit'}
                    className={'add-new-category-form__submit-btn'}>Add category
            </button>
        </form>
    )
}

export default AddNewCategory
