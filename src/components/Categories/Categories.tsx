import './Categories.css';
import Category from '../Category/Category';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import { useAppSelector } from '../../store/hooks';

function Categories() {
  const categories = useAppSelector((state) => state.categories.categories);
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  return (
    <div className="categories" style={{ minHeight: `${innerHeight}px` }}>
      <AddNewCategory />
      {categories.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
}

export default Categories;
