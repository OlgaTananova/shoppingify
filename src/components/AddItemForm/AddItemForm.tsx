import './AddItemForm.css';
import data, {Data} from "../../data";

const AddItemForm = () => {
    return (
        <form className={'add-item-form'}
              name={'add-item-form'}>
            <h3 className={'add-item-form__heading'}>Add a new item</h3>
            <label className={'add-item-form__label'}> Name
                <input className={'add-item-form__input'}
                       name={'item'}
                       placeholder={'Enter a name'}
                        required={true}
                    type={'text'}/>
            </label >
            <label className={'add-item-form__label'}> Note(optional)
                <textarea className={'add-item-form__input'} placeholder={'Enter a note'}
                name={'note'}> </textarea>
            </label>
            <label className={'add-item-form__label'}> Image(optional)
                <input className={'add-item-form__input'} type={'text'} placeholder={'Enter a url'} name={'image'}/>
            </label>
            <label className={'add-item-form__label'} htmlFor={'category-select'}>
                <select id={'category-select'} className={'add-item-form__select'}>
                    <option className={'add-item-form__option'} value="">Enter a category</option>
                    {data.map((item: Data) => {
                        return <option className={'add-item-form__option'} value={`${item.category}`}>{item.category}</option>
                    })}
                </select>
            </label>
            <button className={'add-item-form__btn'} type={'reset'}>cancel</button>
        </form>
    )
}

export default AddItemForm;
