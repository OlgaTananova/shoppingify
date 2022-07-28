import './Signup.css';
import AuthForm from "../AuthForm/AuthForm";
import AuthInput from "../AuthInput/AuthInput";

const Signup = () => {
    return (
        <div className='signup'>
            <AuthForm name={'signup'}
                      heading={'Welcome!'}
                      submitButtonName={'Sign up'}
                      linkToPagePhrase={'Already a member? '}
                      linkToPageButton={'Log in'}
                      linkToPage={'login'}>
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
