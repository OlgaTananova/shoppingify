import './ShowMoreBtn.css';
import {MouseEventHandler} from "react";

const ShowMoreBtn = ({onClick}: {onClick: MouseEventHandler}) => {
    return (
        <button type={'button'} onClick={onClick} className={'category__show-moreorless-btn'}>Show More</button>
    )
}

export default ShowMoreBtn;
