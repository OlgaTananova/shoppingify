import './Item.css';

const Item = ({item}: {item:string}) => {
    return (
        <li className={'category__item'}>
            <p className={'category__item-name'}>{item}</p>
            <button type={'button'} className={'category__item-button'}>{}</button>
        </li>
    )
}

export default Item;
