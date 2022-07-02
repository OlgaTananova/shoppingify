import './Categories.css';
import data from '../../data';
import Category from "../Category/Category";
import AddNewCategory from "../AddNewCategory/AddNewCategory";
import {Dispatch, SetStateAction} from "react";
const Categories = ({setIsItemInfoOpen}: {setIsItemInfoOpen: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <div className={'categories'}>
            <AddNewCategory />
            {data.map((category, index)=> {
                return (
                    <Category setIsItemInfoOpen={setIsItemInfoOpen} key={index} category={category}/>
                )
            })}
        </div>
    )
}

export default Categories;

