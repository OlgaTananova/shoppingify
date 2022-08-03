import {baseUrl} from "../constants";
import {checkResponse} from "./utils";
import {ICreateUserPayload, ILoginPayload, IUpdateUserPayload} from "../types";

export const createUser = async (values: ICreateUserPayload)=> {
    let newUser;
        newUser = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(values)
        });
        return checkResponse(newUser);
}

export const login = async (values: ILoginPayload) => {
    let authorized;
        authorized = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(values)
        });
        return checkResponse(authorized);
}


export const verifyUser = async () => {
    let user;
        user = await fetch (`${baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        });
        return checkResponse(user);
}

export const logout = async () => {
    let response;
        response = await fetch(`${baseUrl}/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        return checkResponse(response);
}

export const updateUser = async (values: IUpdateUserPayload) => {
    let updatedUser;
        updatedUser = await fetch (`${baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(values),
        });
        return checkResponse(updatedUser);
}
