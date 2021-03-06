import React, { useEffect, useState } from 'react';
import Card from 'components/Card';
import Header from 'components/Header';
import { CarType } from 'models/car.interface';
import { CarsApi } from 'api/api';
import sortBy from 'lodash/sortBy';

function App() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    CarsApi.getCars()
      .then((data) => {
        setCars(sortBy(data, 'remainingTime'));
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
    return () => undefined;
  }, []);

  return (
    <>
      <Header />
      <div className="app">
        <div className="container">
          <div className="grid-cards">
            {isError ? (
              <>
                <div className="isError">Erro!!!</div>
              </>
            ) : (
              cars.map((car) => <Card key={car.id} car={car} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
