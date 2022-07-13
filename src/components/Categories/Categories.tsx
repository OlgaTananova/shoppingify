import './Categories.css';
import data from '../../data';
import Category from "../Category/Category";
import AddNewCategory from "../AddNewCategory/AddNewCategory";

const Categories = () => {
    return (
        <div className={'categories'}>
            <AddNewCategory />
            {data.map((category, index)=> {
                return (
                    <Category key={index} category={category}/>
                )
            })}
        </div>
    )
}

export default Categories;

