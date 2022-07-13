import Logo from "../components/Logo/Logo";
import Navbar from "../components/Navbar/Navbar";
import ShoppingHistory from "../components/ShoppingHistory/ShoppingHistory";
import Shopping from "../components/Shopping/Shopping";
import React from "react";
import ShoppingListCard from "../components/ShoppingListCard/ShoppingListCard";

const ShoppingListCardPage = () => {
    return (
        <>
            <Logo/>
            <Navbar/>
            {/*<ShoppingListCard/>*/}
            <Shopping/>
        </>)
}

export default ShoppingListCardPage;
