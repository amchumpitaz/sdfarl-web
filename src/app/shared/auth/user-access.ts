import {Permit} from './permit';

export class UserAccess {
  name: string;
  email: string;
  alta: string;
  profileId: string;
  permits: Array<Permit>;
}
