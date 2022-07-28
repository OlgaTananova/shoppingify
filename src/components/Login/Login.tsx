import './Login.css';
import AuthForm from "../AuthForm/AuthForm";
import AuthInput from "../AuthInput/AuthInput";


const Login = () => {
    return(
        <div className={'login'}>
            <AuthForm name={'login'} heading={'It\'s great to see you again!'} submitButtonName={'Log in'} linkToPagePhrase={'Not a member yet? '} linkToPageButton={'Sign up'} linkToPage={'signup'} >
                <AuthInput name={'email'} type={'email'} placeholder={'Email'} required={true}/>
                <AuthInput name={'password'} type={'password'} placeholder={'Password'} required={true}/>
            </AuthForm>
        </div>
    )
}

export default Login;
