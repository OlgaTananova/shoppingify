import './Signup.css';
import AuthForm from "../AuthForm/AuthForm";
import AuthInput from "../AuthInput/AuthInput";
import {FormEventHandler, useMemo} from "react";
import useForm from "../../utils/useForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {createNewUser, logIn} from "../../store/profileSlice";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const initialValues = useMemo(()=>{
        return {
            name: {
                value: '',
                required: true,
            },
            email: {
                value: '',
                required: true,
            },
            password: {
                value: '',
                required: true,
            }
        }
    },[]);

    const form = useForm(initialValues);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logoHeight = useAppSelector(state => state.app.logoHeight);

    const handleSignupFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(createNewUser({
            name: form.values.name.value,
            email: form.values.email.value,
            password: form.values.password.value
        })).then(()=> {
            dispatch(logIn({email: form.values.email.value,
                password: form.values.password.value}))
                .then(()=>{
                    form.resetForm();
                    navigate('/items');
                })
        })
    }

    return (
        <div className={'signup'} style={{height: `calc(100vh - ${logoHeight}px)`}}>
            <AuthForm name={'signup'}
                      isValid={form.isValid}
                      heading={'Welcome!'}
                      submitButtonName={'Sign up'}
                      linkToPagePhrase={'Already a member? '}
                      linkToPageButton={'Log in'}
                      onSubmit={handleSignupFormSubmit}
                      linkToPage={'login'}>
                <AuthInput name={'name'}
                           value = {form.values.name.value}
                           onChange={form.handleChange}
                           type={'text'}
                           placeholder={'Name'}
                           required={initialValues.name.required}
                           minLength={2}
                           maxLength={30}
                           error={form.errors.name}/>
                <AuthInput name={'email'}
                           value={form.values.email.value}
                           onChange={form.handleChange}
                           error={form.errors.email}
                           type={'text'}
                           pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                           placeholder={'Email'}
                           required={initialValues.email.required}/>
                <AuthInput name={'password'}
                           value={form.values.password.value}
                           onChange={form.handleChange}
                           error={form.errors.password}
                           type={'password'}
                           placeholder={'Password'}
                           required={initialValues.password.required}/>
            </AuthForm>
        </div>
    )
}

export default Signup;
