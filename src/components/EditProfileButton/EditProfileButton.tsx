import './EditProfileButton.css';
import { MouseEventHandler } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setEditProfileTrue, logOut } from '../../store/profileSlice';
import {
  onLogout,
  setIsLoadingFalse,
  setIsLoadingTrue,
  setShowErrorTrue,
} from '../../store/appSlice';
import { onLogoutCategoriesSlice } from '../../store/categoriesSlice';
import { onLogoutItemsSlice } from '../../store/itemInfoSlice';
import { IUpdateUserProfileProps } from '../../types';

function EditProfileButton({
  isFormValid,
  onSaveClick,
}: IUpdateUserProfileProps) {
  const dispatch = useAppDispatch();
  const isEditProfile = useAppSelector((state) => state.profile.isEditProfile);

  const handleEditClick: MouseEventHandler = () => {
    dispatch(setEditProfileTrue());
  };

  const handleLogout: MouseEventHandler = () => {
    dispatch(setIsLoadingTrue());
    dispatch(logOut())
      .unwrap()
      .then(() => {
        dispatch(onLogout());
        dispatch(onLogoutCategoriesSlice());
        dispatch(onLogoutItemsSlice());
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  return (
    <>
      {isEditProfile && (
        <button
          className={`profile-form__button
        profile-form__button_type_submit ${
          !isFormValid && 'profile-form__button_type_submit_inactive'
        }`}
          type="submit"
          disabled={!isFormValid}
          onClick={onSaveClick}
        >
          Save
        </button>
      )}
      {!isEditProfile && (
        <>
          <button
            className="profile-form__button profile-form__button_type_edit"
            type="button"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="profile-form__button profile-form__button_type_logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      )}
    </>
  );
}
export default EditProfileButton;
