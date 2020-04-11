import { DeepPartial, getManager } from 'typeorm';

import { Role } from '../../modules/authorization/roles.enum';
import { User } from '../../modules/user/user.entity';

export const createUser = async (data: DeepPartial<User> = {}) => {
  const manager = getManager();

  const rnd = Math.random().toString(32).slice(6);

  const user = manager.create(User, {
    nick: `user_${rnd}`,
    email: `${rnd}@domain.tld`,
    password: 'password',
    emailValidationToken: 'token',
    roles: [Role.USER],
    ...data,
  });

  return manager.save(user);
};
