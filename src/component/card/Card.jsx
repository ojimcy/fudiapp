import React, { useState } from 'react';
import Button from '../button/Button';

import './card.css';

function Card({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };

  return (
    <div className="card">
      <span className={`${count !== 0 ? 'card_badge' : 'card_badge_hidden'}`}>
        {count}
      </span>
      <div className="image_container">
        <img src={food?.Image} alt={food?.title} />
      </div>
      <h4 className="card_title">
        {food?.title}. <span className="card_price">${food?.price}</span>
      </h4>

      <div className="btn_container">
        <Button title={'+'} type={'add'} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button type={'remove'} title={'-'} onClick={handleDecrement} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Card;
