import './Profile.css';
import { FormEventHandler, useEffect, useMemo } from 'react';
import EditProfileButton from '../EditProfileButton/EditProfileButton';
import AuthInput from '../AuthInput/AuthInput';
import useForm from '../../utils/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEditProfileFalse, updateUserProfile } from '../../store/profileSlice';
import { setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue } from '../../store/appSlice';

function Profile() {
  const user = useAppSelector((state) => state.profile.user);
  const isEditProfile = useAppSelector((state) => state.profile.isEditProfile);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const dispatch = useAppDispatch();
  const initialValues = useMemo(() => ({
    name: {
      value: '',
      required: true,
    },
    email: {
      value: '',
      required: true,
    },
  }), []);
  const form = useForm(initialValues);

  useEffect(() => {
    form.setValues(
      (prev) => ({
        ...prev,
        name: { value: user.name, required: true },
        email: { value: user.email, required: true },
      }),
    );
  }, [user]);

  const handleEditProfileSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(updateUserProfile({
      name: form.values.name.value,
      email: form.values.email.value,
    })).unwrap()
      .then(() => {
        dispatch(setEditProfileFalse());
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  return (
    <div
      className="profile"
      style={{ minHeight: `${innerHeight}px` }}
    >
      <form
        className="profile-form"
        onSubmit={handleEditProfileSubmit}
        name="profile-form"
        noValidate
      >
        <h2 className="profile-form__heading">
          {'Hi  '}
          <span className="profile-form__user-name">
            {user.name}
            !
          </span>
        </h2>
        <div className="profile-form__fieldset">
          <AuthInput
            name="name"
            value={form.values.name.value}
            onChange={form.handleChange}
            error={form.errors.name}
            type="text"
            placeholder="Name"
            disabled={!isEditProfile}
            required
            minLength={2}
            maxLength={30}
          />
          <AuthInput
            type="text"
            value={form.values.email.value}
            onChange={form.handleChange}
            error={form.errors.email}
            disabled={!isEditProfile}
            name="email"
            pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
            placeholder="Email"
            required
          />
        </div>
        <EditProfileButton onSaveClick={handleEditProfileSubmit} isFormValid={form.isValid} />
      </form>
    </div>
  );
}

export default Profile;
