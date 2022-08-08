import './InfoPopup.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {MouseEventHandler} from "react";
import {setShowErrorFalse} from "../../store/appSlice";

const InfoPopup = () => {
    const errors = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    const handleClose: MouseEventHandler = (e) => {
        dispatch(setShowErrorFalse());
    }

    return (<div className={`infopopup ${errors.showError&& 'infopopup_opened'}`}>
        <div className={'infopopup__container'}>
            <button type={'button'}
                    aria-label={'Close button'}
                    onClick={handleClose}
                    className={'infopopup__close-button'}>{}</button>
            <p className={'infopopup__message'}>{errors.error}</p>
            <div className={`infopopup__icon`}
                 aria-label={'Icon'}>{}</div>
        </div>
    </div>)
}

export default InfoPopup;
