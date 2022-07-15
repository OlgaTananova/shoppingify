import './Signup.css';
import AuthForm from "../AuthForm/AuthForm";
import AuthInput from "../AuthInput/AuthInput";

const Signup = () => {
    return (
        <div className='signup'>
            <AuthForm name={'signup'}
                      heading={'Welcome!'}
                      submitButtonName={'Signup'}
                      linkToPagePhrase={'Already a member? '}
                      linkToPage={'Login'}>
                <AuthInput name={'name'}
                           type={'text'}
                           placeholder={'Name'}
                           required={true}
                           minLength={2}
                           maxLength={30}
                           error={''}/>
                <AuthInput name={'email'}
                           type={'text'}
                           pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                           placeholder={'Email'}
                           required={true}/>
                <AuthInput name={'password'}
                           type={'password'}
                           placeholder={'Password'}
                           required={true}/>
            </AuthForm>
        </div>
    )
}

export default Signup;
