import { AuthRedirectModel } from 'src/app/models/auth-redirect.model';
import { AccountModel } from 'src/app/models/account.model';
import { PersonModel } from 'src/app/models/person';
import { PersonGarageModel } from './models/person-garage.model';
import { ClientModel } from 'src/app/models/client/client.model';
import { CarsModel } from 'src/app/models/client/cars.model';
import { VisitRepairModel } from 'src/app/models/visit-repair/visit-repair.model';
import { ServiceListModel } from 'src/app/models/visit-repair/service-list.model';
import { GarageModel } from 'src/app/models/garage.model';

export namespace Urls {
  const baseUrl = 'api/garage';

  export namespace Auth {
    export const signIn = new class {
      type: AuthRedirectModel;
      url = `${baseUrl}/login`;
    }();
    export const checkToken = new class {
      type: PersonModel;
      url = `${baseUrl}/check-token`;
    }();
    export const register = new class {
      type: boolean;
      url = `${baseUrl}/register`;
    }();
  }

  export namespace Garage {
    const garageBaseUlrl = baseUrl + '/garage';

    export const editGarage = new class {
      type: GarageModel;
      url = `${garageBaseUlrl}/edit-garage`;
    }();

    export const createNewEmployee = new class {
      type: boolean;
      url = `${garageBaseUlrl}/create-new-employee`;
    }();

    export const getEmployeesList = new class {
      type: PersonModel[];
      url = `${garageBaseUlrl}/get-employees`;
    }();
  }

  export namespace Person {
    const personBaseUlrl = baseUrl + '/person';

    export const getCurrentPerson = new class {
      type: PersonGarageModel;
      url = (accountId: number) => {
        return `${personBaseUlrl}/get-current-person?accountId=${accountId}`;
      }
    }();

    export const editPersonProfile = new class {
      type: PersonGarageModel;
      url = `${personBaseUlrl}/edit-person`;
    }();

    export const changeEmployeeStatus = new class {
      type: boolean;
      url = `${personBaseUlrl}/change-employee-status`;
    }();
  }

  export namespace Client {
    const clientBaseUrl = `${baseUrl}/client`;

    export const createNewClient = new class {
      type: number;
      url = () => {
        return `${clientBaseUrl}/create-new-client`;
      }
    }();

    export const getClients = new class {
      type: ClientModel[];
      url = () => {
        return `${clientBaseUrl}/get-clients`;
      }
    }();

    export const getClientByID = new class {
      type: ClientModel;
      url = (id: number) => {
        return `${clientBaseUrl}/get-client-by-id?id=${id}`;
      }
    }();

    export const editClient = new class {
      type: boolean;
      url = `${clientBaseUrl}/edit-client`;
    }();

    export const getClientCars = new class {
      type: CarsModel[];
      url = (clientId: number) => {
        return `${clientBaseUrl}/get-client-cars?clientId=${clientId}`;
      }
    }();

    export const addClientCar = new class {
      type: boolean;
      url = `${clientBaseUrl}/add-client-car`;
    }();

    export const editClientCar = new class {
      type: boolean;
      url = `${clientBaseUrl}/edit-client-car`;
    }();
  }

  export namespace VisitRepair {
    const visitRepairBaseUrl = `${baseUrl}/visit-repair`;


    export const addVisitRepair = new class {
      type: number;
      url = (startVisit: boolean) => {
        return `${visitRepairBaseUrl}/add-visit-repair?startVisit=${startVisit}`;
      }
    }();

    export const getRepairHistory = new class {
      type: VisitRepairModel[];
      url = (clientId: number) => {
        return `${visitRepairBaseUrl}/get-repair-history?clientId=${clientId}`;
      }
    }();

    export const getActiveVisitRepair = new class {
      type: VisitRepairModel[];
      url = `${visitRepairBaseUrl}/get-active-visit-repair`;
    }();

    export const getVisitRepair = new class {
      type: VisitRepairModel;
      url = (visitRepairId: number) => {
        return `${visitRepairBaseUrl}/get-visit-repair?visitRepairId=${visitRepairId}`;
      }
    }();

    export const updateVisitRepairDesc = new class {
      type: boolean;
      url = (visitRepairId: number, desc: string) => {
        return `${visitRepairBaseUrl}/update-visit-repair-desc?visitRepairId=${visitRepairId}&desc=${desc}`;
      }
    }();

    export const closeVisitRepair = new class {
      type: boolean;
      url = (visitRepairId: number) => {
        return `${visitRepairBaseUrl}/close-visit-repair?visitRepairId=${visitRepairId}`;
      }
    }();

    export const cancelVisitRepair = new class {
      type: boolean;
      url = (visitRepairId: number) => {
        return `${visitRepairBaseUrl}/cancel-visit-repair?visitRepairId=${visitRepairId}`;
      }
    }();

    export const addVisitRepairService = new class {
      type: boolean;
      url = `${visitRepairBaseUrl}/add-service-to-visit`;
    }();

    export const getServicesList = new class {
      type: ServiceListModel[];
      url = (visitRepairId: number) => {
        return `${visitRepairBaseUrl}/get-services-list?visitRepairId=${visitRepairId}`;
      }
    }();

    export const editVisitRepairService = new class {
      type: boolean;
      url = `${visitRepairBaseUrl}/edit-visit-repair-service`;
    }();

    export const deleteVisitRepairService = new class {
      type: boolean;
      url = (serviceId: number, visitRepairId: number) => {
        return `${visitRepairBaseUrl}/delete-visit-repair-service?serviceId=${serviceId}&visitRepairId=${visitRepairId}`;
      }
    }();



  }
  export namespace Print {
    const basePrintUrl = `${baseUrl}/print`;
    export const getCarCardPdf = new class {
      type: string;
      url = (visitRepairId: number) => {
        return `${basePrintUrl}/get-car-card-pdf?visitRepairId=${visitRepairId}`;
      }
    }();
  }
}
