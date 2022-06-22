import './AddItemForm.css';
import data, {Data} from "../../data";

const AddItemForm = () => {
    return (
        <form className={'add-item-form'}
              name={'add-item-form'}>
            <h3 className={'add-item-form__heading'}>Add a new item</h3>
            <label className={'add-item-form__label add-item-form__label_type_name'}> Name
                <input className={'add-item-form__input'}
                       name={'item'}
                       placeholder={'Enter a name'}
                        required={true}
                    type={'text'}/>
            </label >
            <label className={'add-item-form__label add-item-form__label_type_note'}> Note(optional)
                <textarea className={'add-item-form__input'} placeholder={'Enter a note'} name={'note'}>{}</textarea>
            </label>
            <label className={'add-item-form__label add-item-form__label_type_image'}> Image(optional)
                <input className={'add-item-form__input'} type={'text'} placeholder={'Enter a url'} name={'image'}/>
            </label>
            <label className={'add-item-form__label add-item-form__label_type_category'} htmlFor={'category-select'}>Category
                <select id={'category-select'} className={'add-item-form__input'}>
                    <option className={'add-item-form__option'} value="">Enter a category</option>
                    {data.map((item: Data) => {
                        return <option className={'add-item-form__option'} value={`${item.category}`}>{item.category}</option>
                    })}
                </select>
            </label>
            <div className={'add-item-form__buttons'}>
                <button className={'add-item-form__btn add-item-form__btn_type_reset'} type={'reset'}>Cancel</button>
                <button className={'add-item-form__btn add-item-form__btn_type_submit'} type={'submit'}>Save</button>
            </div>

        </form>
    )
}

export default AddItemForm;
