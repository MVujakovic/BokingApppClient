import { RoomReservations } from '../roomReservations/roomReservations.model';
import { Accomodation } from '../accomodation/accomodation.model';
export class Room {
    Id: number;
    RoomNumber: number;
    BedCount: number;
    Description: string;
    PricePerNight: number;
    RoomReservations: RoomReservations[];
    Accomodation: Accomodation;
    AccomodationId: number;
}