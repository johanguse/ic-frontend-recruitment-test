import React, { FC, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { CarType } from 'models/car.interface';

interface CardProps {
  car: CarType;
}

function msToReadableTime(time: number) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  const hours = Math.floor((time / hour) % 24);
  const minutes = Math.floor((time / minute) % 60);
  const seconds = Math.floor((time / second) % 60);

  return `${hours}:${minutes}:${seconds}`;
}

const Card: FC<CardProps> = ({ car }) => {
  const allBids = car.bids;

  const Completionist = () => <span>Leilão Encerrado</span>;

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    [key: string]: any;
  }) => {
    if (completed) {
      return <Completionist />;
    }
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return (
    <>
      <div className="card">
        <p>{car.model}</p>
        <p>{car.make}</p>
        <Countdown
          date={Date.now() + car.remainingTime}
          zeroPadTime={2}
          renderer={renderer}
        />
      </div>
    </>
  );
};

export default Card;
