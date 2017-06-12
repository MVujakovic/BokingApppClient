import {Region} from '../region/region.model';
import { Accomodation } from '../accomodation/accomodation.model';

export class Place {
    Id: number;
    Name: string;
    Region: Region;
    RegionId: number;
    Accomodations: Accomodation[];

}