import './Login.css';
import AuthForm from "../AuthForm/AuthForm";
import AuthInput from "../AuthInput/AuthInput";


const Login = () => {
    return(
        <div className={'login'}>
            <AuthForm name={'login'} heading={'It\'s great to see you again!'} submitButtonName={'Login'} linkToPagePhrase={'Not a member yet? '} linkToPage={'Signup'} >
                <AuthInput name={'email'} type={'email'} placeholder={'Email'} required={true}/>
                <AuthInput name={'password'} type={'password'} placeholder={'Password'} required={true}/>
            </AuthForm>
        </div>
    )
}

export default Login;
