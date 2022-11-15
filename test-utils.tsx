import {render, RenderOptions} from '@testing-library/react';
import { BrowserRouter, Routes } from 'react-router-dom';
import {ReactElement, ReactNode} from "react";
import { Provider } from 'react-redux';
import { store } from './src/store/store';
interface WrapperProps {
    children?: ReactNode;
}
const AllTheProviders = ({children}: WrapperProps)=> {
    return (
    <Provider store={store}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </Provider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
