import React, { FC } from 'react';
import Countdown from 'react-countdown';
import { CarType, BidsObject } from 'models/car.interface';

interface CardProps {
  car: CarType;
}

const Card: FC<CardProps> = ({ car }) => {
  const allCarBid = car.bids;

  function currentBid(allBids: string | any[] | BidsObject | undefined) {
    if (!Array.isArray(allBids) || !allBids.length) {
      return (
        <>
          <div>R$ 0</div>
        </>
      );
    }
    return (
      <>
        <div>
          {allBids[allBids.length - 1].amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
      </>
    );
  }

  function handleClickOffer(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  const Completionist = () => <span>Leilão Encerrado</span>;

  const rendererRemainingTime = ({
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
          renderer={rendererRemainingTime}
        />

        <div>{currentBid(allCarBid)}</div>
        <div>
          <button type="button" onClick={handleClickOffer}>
            Focus the input
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
