import {Region} from '../region/region.component';
import { Accomodation } from '../accomodation/accomodation.component';

export class Place {
    Id: number;
    Name: string;
    Region: Region;
    RegionId: number;
    Accomodations: Accomodation[];

}