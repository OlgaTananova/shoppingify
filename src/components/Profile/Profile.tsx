import './Profile.css';
import EditProfileButton from "../EditProfileButton/EditProfileButton";
import AuthInput from "../AuthInput/AuthInput";

const Profile = () => {
    return (
        <div className={'profile'}>
                    <form className='profile-form'
                          name='profile-form'
                          noValidate={true}>
                        <h2 className='profile-form__heading'>Hi <span className={'profile-form__user-name'}>{`User!`}</span></h2>
                        <div className={'profile-form__fieldset'}>
                            <AuthInput name={'name'} type={'text'} placeholder={'Name'} required={true} minLength={2} maxLength={30}/>
                            <AuthInput
                                       type={'text'}
                                       name='email'
                                       pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                                       placeholder='Email'
                                       required={true}/>
                        </div>
                        <EditProfileButton />
                    </form>

                </div>
    )
}

export default Profile;
