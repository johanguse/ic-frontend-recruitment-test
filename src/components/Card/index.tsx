import React, { FC, useState } from 'react';
import Countdown from 'react-countdown';
import { CarType } from 'models/car.interface';
import findLast from 'lodash/findLast';

interface CardProps {
  car: CarType;
}

const Card: FC<CardProps> = ({ car }) => {
  const lastBid = findLast(car.bids) as string | any | undefined;
  const [initialBid, setBid] = useState(lastBid?.amount);
  const [disable, setDisable] = useState(false);

  function handleClickOffer(e: { preventDefault: () => void }) {
    e.preventDefault();

    setBid((prevCount: number) => prevCount + 250);
  }

  function handleCountdownEnd() {
    setDisable(false);
    console.log('handle count');
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
          onComplete={handleCountdownEnd}
        />

        <div>
          {initialBid ? (
            <p>
              {initialBid.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          ) : (
            <p>R$ 0</p>
          )}
        </div>
        <div>
          <button
            disabled={disable}
            type="button"
            className="btn-makeOffer"
            onClick={handleClickOffer}
          >
            Focus the input
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
