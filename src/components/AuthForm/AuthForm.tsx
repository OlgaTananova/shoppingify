import './AuthForm.css';
import { Link } from 'react-router-dom';
import { AuthFormProps } from '../../types';

function AuthForm({
  children,
  name,
  heading,
  submitButtonName,
  linkToPagePhrase,
  linkToPageButton,
  linkToPage,
  onSubmit,
  isValid,
}: AuthFormProps) {
  return (
    <form
      className="auth-form"
      name={`${name}-form`}
      onSubmit={onSubmit}
      noValidate
    >
      <h3 className="auth-form__heading">{heading}</h3>
      {children}
      <button
        className={`auth-form__submit-btn ${
          !isValid && 'auth-form__submit-btn_inactive'
        }`}
        disabled={!isValid}
        type="submit"
      >
        {submitButtonName}
      </button>
      <p className="auth-form__link">
        {linkToPagePhrase}
        <Link className="auth-form__link-auth" to={`/${linkToPage}`}>
          {linkToPageButton}
        </Link>
      </p>
    </form>
  );
}

export default AuthForm;
