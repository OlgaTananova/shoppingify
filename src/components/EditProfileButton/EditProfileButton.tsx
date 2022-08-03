import './EditProfileButton.css';
import {useNavigate} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {MouseEventHandler} from "react";
import {setEditProfileTrue, setEditProfileFalse, logOut} from "../../store/profileSlice";
import {IUpdateUserProfileProps} from "../../types";

const EditProfileButton = ({isFormValid, onSaveClick}: IUpdateUserProfileProps) => {
    const dispatch = useAppDispatch();
    const isEditProfile = useAppSelector(state => state.editProfile.isEditProfile);

    const handleEditClick: MouseEventHandler = () => {
        dispatch(setEditProfileTrue())
    }

    const handleLogout: MouseEventHandler = () => {
        dispatch(logOut());
    }

        return (
            <>
                {isEditProfile&& (<button className={`profile-form__button
        profile-form__button_type_submit ${!isFormValid&& 'profile-form__button_type_submit_inactive'}`}
                                          type={'submit'} disabled={!isFormValid} onClick={onSaveClick}>Save</button>)}
            {!isEditProfile&& <>
              <button className='profile-form__button profile-form__button_type_edit'
                   type={'button'}
                   onClick={handleEditClick}>Edit
        </button>
            <button className='profile-form__button profile-form__button_type_logout'
                 onClick={handleLogout}>Log out</button>
        </>}
    </>
    )
}

export default EditProfileButton;
