import './AddItemToSLForm.css';

const AddItemToSLForm = () => {
    return (

        <div className={'shopping-list__add-item-form-container'}>
        <form className={'shopping-list__add-item-form'} name={'add-item-form'}>
            <input className={'shopping-list__add-item-input'} name={'add-item-input'} placeholder={'Enter a name'}/>
            <button className={'shopping-list__add-item-submit-btn'}>{'Save'}</button>
        </form>
        </div>
    )
}

export default AddItemToSLForm;
