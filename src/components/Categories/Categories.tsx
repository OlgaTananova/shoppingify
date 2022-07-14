import './Categories.css';
import Category from "../Category/Category";
import AddNewCategory from "../AddNewCategory/AddNewCategory";
import {useAppSelector} from "../../store/hooks";

const Categories = () => {
    const categories = useAppSelector(state => state.categories);

    return (
        <div className={'categories'}>
            <AddNewCategory />
            {categories.map((category, index)=> {
                return (
                    <Category key={index} category={category}/>
                )
            })}
        </div>
    )
}

export default Categories;

