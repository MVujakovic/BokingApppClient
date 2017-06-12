import { AppUser } from '../appUser/appUser.model';
import { Country } from '../country/country.model';
import {Place} from '../place/place.model';

export class Region{
    Id:number;
    Name:string;
    Country:Country;
    CountryId:number;
    Places: Place[];

    constructor(Id:number,Name:string,CountryId:number){
        this.Id=Id;
        this.Name=Name;
        this.CountryId=CountryId;
    }
}