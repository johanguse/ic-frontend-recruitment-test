import React, { FC } from 'react';
import { CarType } from 'models/car.interface';

interface CardProps {
  car: CarType;
}

const Card: FC<CardProps> = ({ car }) => {
  return <div className="card">{car.model}</div>;
};

export default Card;
