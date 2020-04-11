import axios, { AxiosAdapter, AxiosInstance } from 'axios';

interface Global {
    NewConfirmed:   number;
    TotalConfirmed: number;
    NewDeaths:      number;
    TotalDeaths:    number;
    NewRecovered:   number;
    TotalRecovered: number;
}

interface Country {
    Country:        string;
    CountryCode:    string;
    Slug:           string;
    NewConfirmed:   number;
    TotalConfirmed: number;
    NewDeaths:      number;
    TotalDeaths:    number;
    NewRecovered:   number;
    TotalRecovered: number;
    Date:           string;
}

interface Data {
    Global: Global;
    Countries: Country[];
    Date:   string;
}

class NotInitialized extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotInitialized';
    }
}


class CovidAPI {
    rest: AxiosInstance;
    data: Data;
    constructor() {
        this.rest = axios.create({
            baseURL: 'https://api.covid19api.com'
        });
    }

    async populate() {
        try {
            let result = await this.rest.get("/summary");
            this.data = result.data;
        } catch(e) {
            console.error(e);
            process.exit(1);
        }
    }

    async getCountry(name: string): Promise<Country> {
        let result: Country = this.data.Countries.find(item => { return item.Country.toLowerCase() === name.toLowerCase() || item.CountryCode.toLowerCase() === name.toLowerCase() });
        if (result === undefined) {
            throw new NotInitialized('Missing api data');
        }

        return result;
    }

    async getGlobal(): Promise<Global> {
        let result: Global = this.data.Global;
        if (result === undefined) {
            throw new NotInitialized('Missing api data');
        }

        return result;

    }
}

export { Data, Global, Country, CovidAPI, NotInitialized };
export default CovidAPI;