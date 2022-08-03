
export const checkResponse = ((response: Response) => {
    if (response.ok) {
        return response.json();
    }
    return response.text().then((text:any) => {
        const error = JSON.parse(text)
        console.log(error.message);
        throw new Error(error.message)
    })
});
