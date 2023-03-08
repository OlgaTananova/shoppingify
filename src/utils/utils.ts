export const checkResponse = ((response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return response.text().then((text:any) => {
    const error = JSON.parse(text);
    throw new Error(error.message);
  });
});

export const throttle = (cb: EventListener, delay = 100) => {
  let shouldWait: boolean = false;
  return (...arg: any) => {
    if (shouldWait) {
      return;
    }
    // @ts-ignore
    cb(...arg);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
};
