import './CancelShoppingListPopup.css';

const CancelShoppingListPopup = () => {
    return (
        <div className={'cancel-shopping-list-popup cancel-shopping-list-popup_inactive'}>
            <div className={'cancel-shopping-list-popup__container'}>
                <button className={'cancel-shopping-list-popup__close-btn'}>{}</button>
                <h2 className={'cancel-shopping-list-popup__heading'}>Are you sure that you want to cancel this list?</h2>
                 <div className={'cancel-shopping-list-popup__buttons'}>
                     <button type={'button'} className={'cancel-shopping-list-popup__button cancel-shopping-list-popup__button_cancel'}>cancel</button>
                       <button type={'submit'} className={'cancel-shopping-list-popup__button cancel-shopping-list-popup__button_confirm'}>Yes</button>
                 </div>
            </div>
        </div>
    )
}

export default CancelShoppingListPopup;
