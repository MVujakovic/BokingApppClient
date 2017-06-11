import { AppUser } from '../appUser/appUser.model';
import { Accomodation } from '../accomodation/accomodation.model';

export class Comment {
    Id: number;
    Grade: number;
    Text: string;
    Accomodation: Accomodation;
    AccomodationId: number;
    AppUser: AppUser;
    AppUserId: number;
}