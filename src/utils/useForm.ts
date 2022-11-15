import {
  ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState,
} from 'react';

function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const initialValuesForErrors = Object.fromEntries(Object.keys(initialValues).map((key) => [key, '']));
  const [errors, setErrors] = useState(initialValuesForErrors);
  const isDirtyInput = Object.values(initialValues).some((entry) => entry.value === '' && entry.required === true);
  const [isValid, setIsValid] = useState(!isDirtyInput);

  const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    handleError(input);
    setValues((prev: T) => ({ ...prev, [e.target.name]: { value: e.target.value, required: e.target.required } }));
  };

  const handleError = (input: HTMLInputElement) => {
    setErrors((prev) => ({ ...prev, [input.name]: input.validationMessage }));
  };

  const resetForm = useCallback(() => {
    setErrors((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, ''])));
    setValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    const areErrorsEmpty = Object.values(errors).every((error) => error === '') || errors === {};
    const isAnyFieldInvalid = Object.values(values).some((entry) => entry.value === '' && entry.required === true) || values === {};
    if (areErrorsEmpty && !isAnyFieldInvalid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [values, errors]);

  return {
    values,
    handleChange,
    handleError,
    errors,
    resetForm,
    isValid,
    setValues,
    setErrors,
  };
}

export default useForm;
