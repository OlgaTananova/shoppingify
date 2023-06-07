/*
  This component is responsible for uploading the bill to the server.
*/
import './BillLoader.css';
import {
  ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setIsLoadingFalse, setIsLoadingTrue, setShowErrorTrue, showUploadBillPopup,
} from '../../store/appSlice';
import {
  clearUploadedBillCache,
  closeUploadBillForm,
  openUploadBillForm,
  retrieveUploadedBillFromCache,
  uploadBillAndSL,
} from '../../store/shoppingSlice';

export default function BillLoader() {
  const [file, setFile] = useState<File | null>(null);
  const isUploadBillFormOpened = useAppSelector((state) => state.shopping.isUploadBillFormOpened);
  const dispatch = useAppDispatch();
  const [cachedBill, setCachedBill] = useState<string | null>(null);

  // effect to check if there is a cached bill in the local storage
  useEffect(() => {
    const cachedBillString = localStorage.getItem('uploadedBill');
    if (cachedBillString) {
      setCachedBill(cachedBillString);
    }
  }, [localStorage.getItem('uploadedBill')]);

  // handler to store the file in the state in the component
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);
  };

  // handler to open/close the upload bill form
  const handleUploadBillButtonClick = () => {
    if (!isUploadBillFormOpened) {
      dispatch(openUploadBillForm());
    } else {
      dispatch(closeUploadBillForm());
    }
  };

  // handler to submit the form to the server
  // the file is sent as a form data
  // after the file is uploaded, UploadBillPopup is shown
  // TODO: add validation to check if the file is a pdf
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      dispatch(setShowErrorTrue('Please select a file to upload'));
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    dispatch(setIsLoadingTrue());
    dispatch(uploadBillAndSL(formData)).unwrap()
      .then((data) => {
        localStorage.setItem('uploadedBill', JSON.stringify(data));
        dispatch(showUploadBillPopup());
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
        dispatch(closeUploadBillForm());
      });
  };

  const handleCachedBillClick: MouseEventHandler = () => {
    if (cachedBill) {
      const parsedCachedBill = JSON.parse(cachedBill);
      dispatch(retrieveUploadedBillFromCache(parsedCachedBill));
      dispatch(showUploadBillPopup());
    }
  };
  // handler to clear the cached bill
  const handleClearUploadedBillCache: MouseEventHandler = () => {
    localStorage.removeItem('uploadedBill');
    setCachedBill(null);
    dispatch(clearUploadedBillCache());
  };

  return (
    <>
      <div className="upload-bill-sector">
        <button type="button" onClick={handleUploadBillButtonClick} aria-label="Upload bill button" className="upload-bill-button">{}</button>
        <h3 className="upload-bill-heading">Upload your bill</h3>
      </div>
      {(() => {
        // eslint-disable-next-line no-lone-blocks
        {
          if (isUploadBillFormOpened && !cachedBill) {
            return (
              <form
                name="upload-bill-form"
                className="upload-bill-form"
                onSubmit={handleSubmit}
              >
                <input
                  className="upload-bill-form__input"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <button
                  type="submit"
                  className="upload-bill-form__submit-btn"
                >
                  Upload
                </button>
              </form>
            );
          } if (isUploadBillFormOpened && cachedBill) {
            return (
              <div className="upload-bill-chooseSection">
                <button onClick={handleCachedBillClick} className="upload-bill-chooseSection__button" type="button">Retrieve your cached bill</button>
                <button onClick={handleClearUploadedBillCache} className="upload-bill-chooseSection__button" type="button">Upload a new bill</button>
              </div>
            );
          }
          return null;
        }
      })()}
    </>
  );
}
