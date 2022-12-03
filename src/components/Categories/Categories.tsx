import './Categories.css';
import Category from '../Category/Category';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import { useAppSelector } from '../../store/hooks';

function Categories() {
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className="categories">
      <AddNewCategory />
      {categories.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
}

export default Categories;
