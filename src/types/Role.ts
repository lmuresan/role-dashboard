import { Permission } from "./Permission";

export type RoleId = string;

export type Role = {
  id: RoleId;
  name: string;
  permissions: Permission[];
};
