import { Accomodation } from '../accomodation/accomodation.model';
import { Comment } from '../comment/comment.model';
import { RoomReservations } from '../roomReservations/roomReservations.model';

export class AppUser {
    Id: number;
    FullName: string;
    Comments: Comment[];
    Accomodations: Accomodation[];
    RoomReservations: RoomReservations[];

}