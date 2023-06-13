import { RoleId, Role } from "./Role";
import { Permission } from "./Permission";

export interface RoleService {
  getRoles(): Promise<Role[]>;
  getPermissions(): Promise<Permission[]>;
  setPermissionsForRole(roleId: RoleId, permissions: Permission[]): Promise<Role>;
}
