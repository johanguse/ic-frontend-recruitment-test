import React, { FC, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
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
    setDisable(true);
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
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  return (
    <>
      <div className="card">
        <div className="image">
          <figure>
            <img
              src={car.imageUrl}
              alt={`${car.make} - ${car.model}`}
              width="300px"
              className="image"
            />
            <figcaption>ver detalhes</figcaption>
          </figure>
        </div>
        <div>{car.model}</div>
        <div>{car.make}</div>
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
            Fazer Oferta
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
