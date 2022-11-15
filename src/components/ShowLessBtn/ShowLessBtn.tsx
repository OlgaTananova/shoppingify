import '../ShowMoreBtn/ShowMoreBtn.css';
import { MouseEventHandler } from 'react';

function ShowLessBtn({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="category__show-moreorless-btn"
    >
      Show Less
    </button>
  );
}

export default ShowLessBtn;
