import { AppUser } from '../appUser/appUser.component';
import {Room} from './Room';

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