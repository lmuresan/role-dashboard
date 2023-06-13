import React, { FunctionComponent } from "react";
import { Permission } from "../../types/Permission";
import { Role } from "../../types/Role";
// import Button, { ButtonType } from "../Button/Button";
import RoleCard from "../RoleCard/RoleCard";

import "./Roles.scss";

type UpdateRoleAndPermissionsCallback = (roleId: string, permissions: Permission[]) => void;

type RolesProps = {
  listOfRoles: Role[];
  listOfPermissions: Permission[];
  updatePermissions: UpdateRoleAndPermissionsCallback;
};

const Roles: FunctionComponent<RolesProps> = ({ listOfRoles, listOfPermissions, updatePermissions }) => {
  return (
    <>
      <div className="roles">
        <div>
          <p>Roles</p>
          {listOfRoles.map((role, index) => (
            <RoleCard
              key={index}
              role={role}
              listOfPermissions={listOfPermissions}
              updatePermissions={updatePermissions}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Roles;
