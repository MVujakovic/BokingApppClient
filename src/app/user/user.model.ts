import { Accomodation } from '../accomodation/accomodation.model';
import { Comment } from '../comment/comment.model';
import { RoomReservations } from '../roomReservations/roomReservations.model';

export class User {
    Name: string;
    Lastname: string;
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword:string;
    Role:string;
}