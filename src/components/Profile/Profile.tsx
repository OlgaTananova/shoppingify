import './Profile.css';
import EditProfileButton from "../EditProfileButton/EditProfileButton";
import AuthInput from "../AuthInput/AuthInput";
import {FormEventHandler, useEffect, useMemo} from "react";
import useForm from "../../utils/useForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setEditProfileFalse, setEditProfileTrue, updateUserProfile} from "../../store/profileSlice";

const Profile = () => {
    const user = useAppSelector((state) => state.profile.user);
    const isEditProfile = useAppSelector(state => state.profile.isEditProfile);
    const dispatch = useAppDispatch();
    const initialValues = useMemo(()=>{
        return {
            name: {
                value: '',
                required: true
            },
            email: {
                value: '',
                required: true
            }
        }
    },[]);
    const form = useForm(initialValues);

    useEffect(()=> {
     form.setValues(
     (prev) => ({...prev,
         name: {value: user.name, required: true},
        email: {value: user.email, required: true}}))
    }, [user])


    const handleEditProfileSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({name: form.values.name.value, email: form.values.email.value}));
    }

    return (
        <div className={'profile'}>
            <form className='profile-form'
                  onSubmit={handleEditProfileSubmit}
                  name='profile-form'
                  noValidate={true}>
                <h2 className='profile-form__heading'>Hi <span className={'profile-form__user-name'}>{user.name}!</span>
                </h2>
                <div className={'profile-form__fieldset'}>
                    <AuthInput name={'name'}
                               value={form.values.name.value}
                               onChange={form.handleChange}
                               error={form.errors.name}
                               type={'text'}
                               placeholder={'Name'}
                               disabled={!isEditProfile}
                               required={true}
                               minLength={2}
                               maxLength={30}/>
                    <AuthInput type={'text'}
                               value={form.values.email.value}
                               onChange={form.handleChange}
                               error={form.errors.email}
                               disabled={!isEditProfile}
                               name='email'
                               pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                               placeholder='Email'
                               required={true}/>
                </div>
                <EditProfileButton onSaveClick={handleEditProfileSubmit} isFormValid={form.isValid}/>
            </form>
        </div>
    )
}

export default Profile;
