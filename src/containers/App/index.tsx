import { useEffect, useState } from 'react';
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
        setCars(sortBy(data.data, 'remaing_time'));
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Error: ${err}`);
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
              <div className="isError">Erro!!!</div>
            ) : (
              cars.map((car: CarType) => (
                <Card
                  key={car.id}
                  id={car.id}
                  image_url={car.image_url}
                  make={car.make}
                  model={car.model}
                  remaing_time={car.remaing_time}
                  version={car.version}
                  year={car.year}
                  km={car.km}
                  bids={car.bids}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
