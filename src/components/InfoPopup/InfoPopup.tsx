import './InfoPopup.css';
import { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setInfoMessage, setShowErrorFalse } from '../../store/appSlice';

function InfoPopup() {
  const errors = useAppSelector((state) => state.app);
  const infoMessage = useAppSelector((state) => state.app.infoMessage);
  const dispatch = useAppDispatch();

  const handleClose: MouseEventHandler = () => {
    dispatch(setShowErrorFalse());
    dispatch(setInfoMessage(false));
  };

  return (
    <div className={`infopopup ${errors.showError && 'infopopup_opened'}`}>
      <div className="infopopup__container">
        <button
          type="button"
          aria-label="Close button"
          onClick={handleClose}
          className="infopopup__close-button"
        >
          {}
        </button>
        <p className="infopopup__message">{errors.error}</p>
        <div
          className={`infopopup__icon ${infoMessage && 'infopopup__icon_type_success'}`}
          aria-label="Icon"
        >
          {}
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
