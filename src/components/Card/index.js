import './styles.css';

import heartFilled from '../../svgs/heartFilled.svg';
import heartOutlined from '../../svgs/heartOutlined.svg';
import { useDispatch } from 'react-redux';
import { toggleFavored } from '../../store';


export const Card = ({ name, phone, email, image, favored, id }) => {
  const dispatch = useDispatch();

  return (
    <article className="card">
      <div className="card-header">
        <img className='card-img' src={image.url} alt={image.alt} />
        <button onClick={() => dispatch(toggleFavored(id))} className='heart'> 
          {favored ? <img src={heartFilled} alt='filled heart' /> : <img src={heartOutlined} alt='outlined heart' />} 
        </button>
      </div>
      <div className="card-content"> 
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  )
}