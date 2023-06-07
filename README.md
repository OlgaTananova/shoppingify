# Shoppingify &mdash; Your Essential Shopping Companion On-the-Go

[Try it out!](https://olgatananova.github.io/shoppingify)

[Demo](https://scribehow.com/shared/How_to_use_Shoppingify_to_Manage_Shopping_Lists_and_Expenses__mXdmP1zCRomx_SX0_ys_CQ)

## Overview
Shoppingify is a dynamic shopping list application designed to seamlessly integrate into your daily routine. It enables you to build your own database of shopping items, devise and manage lists from these items, track expenditure, and access an extensive record of your shopping history along with statistics.
## Key Features
* **Personal Account Creation**: Shoppingify allows you to establish your personal account and securely log into the system.

* **Customizable Shopping Database**: With the app, you can construct, modify, and delete your own database of shopping items, tailoring it to your preferences and needs.

* **Flexible Shopping Lists**: Utilizing your shopping items database, Shoppingify enables you to create adaptable shopping lists. You can edit the quantity, measurement units, prices, and sales taxes of your items, or remove them entirely to ensure your list stays up-to-date.

* **Bill Upload & Integration**: Shoppingify allows you to upload your bills in PDF format, integrating them with your current shopping list or uploading them separately. Chat GPT will analyse the content of your uploaded bills. You can manually edit these bills prior to integration or upload to ensure optimal accuracy and precision in your data.

* **Archivable Shopping Lists**: You can archive your shopping lists to maintain a thorough history of your shopping, keeping track of past purchases and trends.

* **Insightful Shopping Analytics**: With Shoppingify, you can access detailed statistics related to your shopping history. This includes a total of purchased items grouped by month, year, and category, as well as your top-purchased items and categories, giving you an understanding of your shopping habits and expenditure.

## Technologies (front-end part)
* **React**: The code follows a structured approach by organizing it into functional components. To manage the state and lifecycle of components, various hooks are employed. Custom hooks are utilized to extend the functionality of the application, such as form validation.
* **TypeScript**: The codebase incorporates TypeScript to ensure type safety and enhance code readability.
* **Redux (Redux Toolkit)** Redux is employed to manage the global state of the application. By utilizing Redux Toolkit, the development experience is streamlined and made more efficient.
* **React Router** The application benefits from the routing functionality provided by React Router. It enables navigation between different components and ensures a seamless user experience. Furthermore, certain routes are secured using the ProtectedRoute component, ensuring access control and enhancing security.
* **User authentication** The application implements user authentication using JWT tokens. These tokens are securely stored and transmitted via http-only cookies. This approach enhances security by preventing client-side tampering and provides a secure mechanism for user identification and access control.
* **CSS** The application layout is fully responsive thanks to  CSS resizable features and media queries.
* **EsLint** is used to maintain high code quality and consistency.

## Technologies (back-end part)
NodeJS, TypeScript, Express.js, MongoDB, Mongoose, JWT, Jest, EsLint, Celebrate, Winston, Pdf-parse, OpenAI API, AWS Cloud.

[Please, refer to the back-end part repository for more details](https://github.com/OlgaTananova/shoppingify-api)

The application is deployed on GitHub Pages: [Link to the app](https://olgatananova.github.io/shoppingify)

If you want to get to know more about the application features, please refer to the demo [Link to the demo](https://scribehow.com/shared/How_to_use_Shoppingify_to_Manage_Shopping_Lists_and_Expenses__mXdmP1zCRomx_SX0_ys_CQ)
