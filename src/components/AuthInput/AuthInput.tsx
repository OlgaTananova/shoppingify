import './AuthInput.css';
import {AuthInputProps} from "../../types";

const AuthInput = ({name, type, placeholder, required, error, ...rest}: AuthInputProps) => {
    return (
        <label className={'auth-form__label'}>{placeholder}
            <input className={'auth-form__input'}
                   name={name}
                   type={type}
                   placeholder={placeholder}
                   required={required}
                   {...rest}/>
            <span className={'auth-form__input-error'}>{error}</span>
        </label>
    )
}

export default AuthInput;
