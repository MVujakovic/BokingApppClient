import { AppUser } from '../appUser/appUser.model';
import {Room} from '../room/room.model';

export class RoomReservations {
    Id: number;
    StartDate: Date;
    EndDate: Date;
    Timestamp: Date;
    AppUser: AppUser;
    AppUserId: number;
    Room: Room;
    RoomId: number;
}