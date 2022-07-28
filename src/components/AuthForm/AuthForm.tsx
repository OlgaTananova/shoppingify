import './AuthForm.css';
import {Link} from "react-router-dom";
import {AuthFormProps} from "../../types";

const AuthForm = ({children, name, heading, submitButtonName, linkToPagePhrase, linkToPageButton, linkToPage}: AuthFormProps) => {
    return (<form className={`auth-form`} name={`${name}-form`} noValidate={true}>
        <h3 className={`auth-form__heading`}>{heading}</h3>
        {children}
        <button className={`auth-form__submit-btn`}
                type={'submit'}>{submitButtonName}</button>
        <p className={`auth-form__link`}>{linkToPagePhrase}<Link className={`auth-form__link-auth`} to={`/${linkToPage}`}>{linkToPageButton}</Link></p>
    </form>)
}

export default AuthForm;
