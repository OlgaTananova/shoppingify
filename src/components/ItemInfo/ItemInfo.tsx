import './ItemInfo.css';
import {useAppSelector} from "../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";

const ItemInfo = () => {
    const {itemId} = useParams<string>();
    const item = useAppSelector(state => state.itemInfo.find((item) => item.itemId === itemId));
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }

    return (
        <div className={'item-info'}>
        <button onClick={handleClick}
                className={'item-info__return-btn'}
                type={'button'}>back
        </button>
            {!item?
                <div className={'item-info__not-found'}>
                Item is not found.
                </div>
                :
                <>
                <img className={'item-info__img'}
                     src={item.image}
                     alt={'Avocado'}/>
                <span className={'item-info__label item-info__label_type_name'}>name</span>
                <p className={'item-info__name'}>{item.name}</p>
                <span className={'item-info__label item-info__label_type_category'}>category</span>
                <p className={'item-info__category'}>{''}</p>
                <span className={'item-info__label item-info__label_type_note'}>note</span>
                <p className={'item-info__note'}>{item.note}</p>
                <div className={'item-info__buttons'}>
                    <button type={'button'}
                            className={'item-info__btn item-info__btn_delete'}>delete
                    </button>
                    <button type={'submit'}
                            className={'item-info__btn item-info__btn_submit'}>Add to list
                    </button>
                </div>
                </>
            }
    </div>)
}
export default ItemInfo;
