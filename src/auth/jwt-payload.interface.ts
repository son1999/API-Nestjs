import { RoleType } from '../role/roletype.enum';

export interface JwtPayloadInterface {
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
  iat?: Date;
}
