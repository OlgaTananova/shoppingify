import './EditProfileButton.css';
import {Link} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {MouseEventHandler} from "react";
import {setEditProfileTrue, setEditProfileFalse} from "../../store/profileSlice";

const EditProfileButton = () => {
    const dispatch = useAppDispatch();
    const isEditProfile = useAppSelector(state => state.editProfile.isEditProfile);

    const handleEditClick: MouseEventHandler = () => {
        dispatch(setEditProfileTrue())
    }

    const handleSaveClick: MouseEventHandler = () => {
        dispatch(setEditProfileFalse())
    }
        return (
            <>
                {isEditProfile&& (<button className={`profile-form__button
        profile-form__button_type_submit ${'profile-form__button_type_submit_inactive'}`}
                                          type={'submit'} onClick={handleSaveClick}>Save</button>)}
            {!isEditProfile&& <>
              <button className='profile-form__button profile-form__button_type_edit'
                   type={'button'}
                   onClick={handleEditClick}>Edit
        </button>
            <Link className='profile-form__button profile-form__button_type_logout'
                  to={'/'}>Log out</Link>
        </>}
    </>
    )
}

export default EditProfileButton;
