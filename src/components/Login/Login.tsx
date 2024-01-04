import './Login.css';
import { FormEventHandler, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import useForm from '../../utils/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logIn } from '../../store/profileSlice';
import {
  onLogin,
  setIsLoadingFalse,
  setIsLoadingTrue,
  setShowErrorTrue,
} from '../../store/appSlice';

function Login() {
  const initialValues = useMemo(
    () => ({
      email: {
        value: '',
        required: true,
      },
      password: {
        value: '',
        required: true,
      },
    }),
    [],
  );
  const form = useForm(initialValues);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoHeight = useAppSelector((state) => state.app.logoHeight);

  const handleLoginFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(
      logIn({
        email: form.values.email.value,
        password: form.values.password.value,
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(onLogin());
        form.resetForm();
        navigate('/items');
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      });
  };

  return (
    <div className="login" style={{ height: `calc(100vh - ${logoHeight}px)` }}>
      <AuthForm
        name="login"
        isValid={form.isValid}
        onSubmit={handleLoginFormSubmit}
        heading={"It's great to see you again!"}
        submitButtonName="Log in"
        linkToPagePhrase="Not a member yet? "
        linkToPageButton="Sign up"
        linkToPage="signup"
      >
        <AuthInput
          name="email"
          value={form.values.email.value}
          onChange={form.handleChange}
          error={form.errors.email}
          type="email"
          placeholder="Email"
          required={initialValues.email.required}
        />
        <AuthInput
          name="password"
          value={form.values.password.value}
          onChange={form.handleChange}
          error={form.errors.password}
          type="password"
          placeholder="Password"
          required={initialValues.password.required}
        />
      </AuthForm>
    </div>
  );
}

export default Login;
