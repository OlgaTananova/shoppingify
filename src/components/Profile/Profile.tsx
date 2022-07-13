import './Profile.css';
import EditProfileButton from "../EditProfileButton/EditProfileButton";

const Profile = () => {
    return (
        <div className={'profile'}>
                    <form className='profile-form'
                          name='profile-form'
                          noValidate={true}>
                        <h2 className='profile-form__heading'>Hi <span className={'profile-form__user-name'}>{`User!`}</span></h2>
                        <div className={'profile-form__fieldset'}>
                            <label className='profile-form__label'>Name
                                <input className='profile-form__input'
                                       type={'text'}
                                       name='name'
                                       placeholder='Name'
                                       minLength={2}
                                       maxLength={30}
                                       required={true}/>
                            </label>
                            <span className='profile-form__error profile-form__error_underlined'>{}</span>
                            <label className='profile-form__label'>Email
                                <input className='profile-form__input'
                                       type={'text'}
                                       name='email'
                                       pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                                       placeholder='example@gmail.com'
                                       required={true}/>
                            </label>
                        </div>
                        <EditProfileButton />
                    </form>

                </div>
    )
}

export default Profile;
