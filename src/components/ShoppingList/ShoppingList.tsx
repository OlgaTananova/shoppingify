import './ShoppingList.css';

const ShoppingList = () => {
    return (
        <div className={'shopping-list'}>
            <div className={'shopping-list__upper-section'}>
                <h3 className={'shopping-list__heading'} contentEditable={true}>{}</h3>
                <button className={'shopping-list__edit-btn'} type={'button'}>{}</button>
            </div>

        </div>
    )
}

export default ShoppingList;
