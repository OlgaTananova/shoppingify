import './ItemInfo.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {MouseEventHandler} from "react";
import {deleteExistingItem} from "../../store/itemInfoSlice";
import {deleteItemFromCategory} from "../../store/categoriesSlice";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue} from "../../store/appSlice";

const ItemInfo = () => {
    const {itemId} = useParams<string>();
    const item = useAppSelector(state => state.items.items.find((item) => item._id === itemId));
    const category = useAppSelector(state=> state.categories.categories.find((category)=>{
        return item&& item.categoryId === category._id;
    }));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    const handleDeleteClick: MouseEventHandler = (event) => {
        dispatch(setIsLoadingTrue());
        if (itemId != null) {
            dispatch(deleteExistingItem(itemId)).unwrap()
                .then((data)=>{
                    dispatch(deleteItemFromCategory(data.category));
                    navigate('/items');
                })
                .catch((err)=> {
                    dispatch(setShowErrorTrue(err.message));
                })
                .finally(()=>{
                    dispatch(setIsLoadingFalse());
                })
        }
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
                {item.image !== ''&& <img className={'item-info__img'}
                     src={item.image}
                     alt={item.name}/>}
                <span className={'item-info__label item-info__label_type_name'}>name</span>
                <p className={'item-info__name'}>{item.name}</p>
                <span className={'item-info__label item-info__label_type_category'}>category</span>
                <p className={'item-info__category'}>{category&& category.category}</p>
                <span className={'item-info__label item-info__label_type_note'}>note</span>
                <p className={'item-info__note'}>{item.note}</p>
                <div className={'item-info__buttons'}>
                    <button type={'button'} onClick={handleDeleteClick}
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
