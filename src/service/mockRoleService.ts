import { Role } from "./../types/Role";
import { Permission } from "./../types/Permission";
import { RoleService } from "./../types/RoleService";
import { delayedRandomlyRejectingPromise } from "./../utils/timeout";
import { demoRoles } from "../mocks/roles";
import { demoPermissions } from "../mocks/permissions";

export class MockRoleService implements RoleService {
  private readonly roleState: Role[] = [...demoRoles];
  private readonly permissionState: Permission[] = [...demoPermissions];

  getRoles(): Promise<Role[]> {
    return delayedRandomlyRejectingPromise(() => [...this.roleState]);
  }

  getPermissions(): Promise<Permission[]> {
    return delayedRandomlyRejectingPromise(() => [...this.permissionState]);
  }

  setPermissionsForRole(roleId: string, permissions: Permission[]): Promise<Role> {
    return delayedRandomlyRejectingPromise(() => {
      const toUpdateRoleIndex = this.roleState.findIndex((r) => r.id === roleId);
      if (toUpdateRoleIndex < 0) {
        throw new Error("role not found");
      }
      const permissionIdsAreValid = permissions.every(
        (permission) => this.permissionState.findIndex((p) => p.id === permission.id) > -1
      );
      if (!permissionIdsAreValid) {
        throw new Error("invalid permissions");
      }
      this.roleState[toUpdateRoleIndex] = {
        ...this.roleState[toUpdateRoleIndex],
        permissions,
      };
      return this.roleState[toUpdateRoleIndex];
    });
  }
}
