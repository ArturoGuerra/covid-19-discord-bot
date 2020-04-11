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
        return this.data.Countries.find(item => item.Country.toLowerCase() == name.toLowerCase());
    }

    async getGlobal(): Promise<Global> {
        return this.data.Global;
    }
}

export { Data, Global, Country, CovidAPI }
export default CovidAPI