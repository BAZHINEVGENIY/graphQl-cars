/*
  безусловно,
  нужно использовать codegen (генерацию интерфейсов),
  здесь упрощено:
*/

export interface CarInterface {
  id: string;
  naming: {
    make: string;
    model: string;
    version: string;
  };
}

export interface ExtendedCarInterface {
  naming: {
    make: string;
    model: string;
    chargetrip_version: string;
  };
  acceleration: string;
  range: {
    best: {
      highway: string;
      city: string;
      combined: string;
    };
  };
  connectors: [
    {
      standard: string;
      power: string;
      time: string;
      speed: string;
      max_electric_power: string;
    }
  ];
}

export interface CarsListInterface {
  carList: CarInterface[];
}

export interface CarListInterface {
  car: ExtendedCarInterface;
}
