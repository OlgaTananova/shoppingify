import './ItemInfo.css';
import {Dispatch, SetStateAction} from "react";

const ItemInfo = ({setIsItemInfoOpen}: {setIsItemInfoOpen: Dispatch<SetStateAction<boolean>>}) => {

    const handleClick = () => {
        setIsItemInfoOpen(false)
    }

    return (
        <div className={'item-info'}>
            <button onClick={handleClick}
                    className={'item-info__return-btn'}
                    type={'button'}>back
            </button>
            <img className={'item-info__img'}
                 src={'https://images.immediate.co.uk/production/volatile/sites/30/2017/01/avocado-45bccf2-scaled.jpg'}
                 alt={'Avocado'}/>
            <span className={'item-info__label item-info__label_type_name'}>name</span>
            <p className={'item-info__name'}>Avocado</p>
            <span className={'item-info__label item-info__label_type_category'}>category</span>
            <p className={'item-info__category'}>Fruits and veggies</p>
            <span className={'item-info__label item-info__label_type_note'}>note</span>
            <p className={'item-info__note'}>Nutrient-dense foods are those that provide substantial amounts of
                                             vitamins, minerals and other nutrients with relatively few calories.
                                             One-third of a medium avocado (50 g) has 80 calories and contributes nearly
                                             20 vitamins and minerals, making it a great nutrient-dense food
                                             choice. </p>
            <div className={'item-info__buttons'}>
                <button type={'button'}
                        className={'item-info__btn item-info__btn_delete'}>delete
                </button>
                <button type={'submit'}
                        className={'item-info__btn item-info__btn_submit'}>Add to list
                </button>
            </div>
        </div>
    )
}

export default ItemInfo;
