import './Categories.css';
import Category from '../Category/Category';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import { useAppSelector } from '../../store/hooks';

const Categories = () => {
  const categories = useAppSelector(state => state.categories.categories);

  return (
        <div className={'categories'}>
            <AddNewCategory />
            {categories.map((category)=> {
              return (
                    <Category key={category._id} category={category}/>
              );
            })}
        </div>
  );
};

export default Categories;

