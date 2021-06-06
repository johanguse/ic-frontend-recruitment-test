import React, { FC, memo, useCallback, useState } from 'react';

import Timer from 'react-compound-timer';
import { CarType } from 'models/car.interface';
import findLast from 'lodash/findLast';

interface CardProps {
  car: CarType;
}

const Card: FC<CardProps> = ({ car }) => {
  const lastBid = findLast(car.bids) as string | any | undefined;
  const [initialBid, setBid] = useState(lastBid?.amount);
  const [disable, setDisable] = useState(false);

  const handleClickOffer = useCallback(() => {
    setBid((prevCount: number) => prevCount + 250);
  }, []);

  const handleCountdownEnd = useCallback(() => {
    setDisable(true);
    console.log('handle count');
  }, []);

  const Completionist = () => <span>Leilão Encerrado</span>;

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
          <Timer
            initialTime={car.remainingTime}
            formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
            direction="backward"
            checkpoints={[
              {
                time: 0,
                callback: () => handleCountdownEnd(),
              },
            ]}
          >
            <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
          </Timer>
        </div>
        <div>
          <button
            disabled={disable}
            type="button"
            className="btn-makeOffer"
            onClick={() => handleClickOffer()}
          >
            Fazer Oferta
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
