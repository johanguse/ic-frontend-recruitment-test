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
  const [isAuctionOver, setAuctionOver] = useState(false);

  const handleClickOffer = useCallback(() => {
    setBid((prevCount: number) => prevCount + 250);
  }, []);

  const handleCountdownEnd = useCallback(() => {
    setAuctionOver(!isAuctionOver);
  }, []);

  return (
    <>
      <div className="card">
        <div className="header-image">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2021/202105/20210505/mercedesbenz-glc-250-2.0-cgi-gasolina-highway-4matic-9gtronic-wmimagem09295451379.jpg"
            alt={`${car.make} - ${car.model}`}
            className={`header-image__image ${
              isAuctionOver ? 'grayscale' : ''
            }`}
          />
          <span className="header-image__caption">ver detalhes</span>
        </div>
        <div className="auction-info">
          <div className="auction-info__time-offer">
            <div className="auction-info__time-offer-remaining-time">
              <p className="title">Tempo Restante</p>
              <div className="timer">
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
            </div>
            <div className="auction-info__time-offer-lastbid">
              <p className="title">Última Oferta</p>
              <div className="bid">
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
            </div>
          </div>
          <div className="auction-info__car-title">
            <h1 className="auction-info__car-title-text">
              {car.make} {car.model} {car.version} {car.year}
            </h1>
          </div>
          <div className="auction-info__car-infos">
            <div className="year">{car.year}</div>
            <div className="km">
              {car.km.toLocaleString('pt-BR', {
                style: 'decimal',
              })}{' '}
              KM
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            disabled={isAuctionOver}
            type="button"
            className="btn-makeOffer"
            onClick={() => handleClickOffer()}
          >
            {isAuctionOver ? 'Leilão Encerrado' : 'Fazer Oferta'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
