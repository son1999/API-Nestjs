import { EntityRepository, getConnection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { SignupDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { RoleEntity } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    const roleRepository: RoleRepository = await getConnection().getRepository(RoleEntity);
    const defaultRole: RoleEntity = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });
    user.roles = [defaultRole];

    const detailts = new UserDetails();
    user.details = detailts;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
  }
}
