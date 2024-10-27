import { EnumRoleOfUser } from '@prisma/client';

export const roles = {
  user: EnumRoleOfUser.DEFAULT_USER,
  admin: EnumRoleOfUser.ADMIN,
  company: EnumRoleOfUser.COMPANY,
  courier: EnumRoleOfUser.COURIER,
  manager: EnumRoleOfUser.MANAGER,
};
