import { Place } from '../place/place.model';
import { Room } from '../room/room.model';
import { AppUser } from '../appUser/appUser.model';
import { AccommodationType } from '../accomodationType/accommodationType.model';

export class Accomodation {
    Id: number;
    Name: String;

    Description: String;
    Address: String;
    AverageGrade: number;
    Latitude: number;
    Longitude: number;
    ImageUrl: String;
    Approved: boolean;
    Place: Place;
    PlaceId: number;
    Comments: Comment[];
    Owner: AppUser;
    OwnerId: number;
    Rooms: Room[];
    AccomodationType: AccommodationType;
    AccomodationTypeId: number;
}