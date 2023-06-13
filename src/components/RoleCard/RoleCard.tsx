import React, { FunctionComponent, useCallback, useState } from "react";
import { Permission } from "../../types/Permission";
import { Role } from "../../types/Role";
import Button, { ButtonType } from "../Button/Button";

import "./RoleCard.scss";

type UpdateRoleAndPermissionsCallback = (roleId: string, permissions: Permission[]) => void;

type RoleCardProps = {
  role: Role;
  listOfPermissions: Permission[];
  updatePermissions: UpdateRoleAndPermissionsCallback;
};

const RoleCard: FunctionComponent<RoleCardProps> = ({ role, listOfPermissions, updatePermissions }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const expandCallback = () => {
    setExpanded(!expanded);
  };

  const addPermission = useCallback(
    (permission: Permission) => {
      updatePermissions(role.id, [...role.permissions, permission]);
    },
    [role]
  );

  const removePermission = useCallback(
    (permission: Permission) => {
      const newPermissions = role.permissions.filter((rolePermission) => rolePermission.id !== permission.id);
      updatePermissions(role.id, newPermissions);
    },
    [role]
  );

  const hasPermission = (permission: Permission) => {
    const permissionIndex = role.permissions.findIndex((rolePermission) => rolePermission.id === permission.id);

    if (permissionIndex !== -1) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="role-card">
        <h5 onClick={expandCallback}>{role.name}</h5>
        {expanded ? (
          <div className="role-permission-card">
            Permissions for {role.name}
            <div>
              {listOfPermissions.map((permission, index) => (
                <div key={index} className="role-permission-card__item">
                  {permission.name}{" "}
                  {hasPermission(permission) ? (
                    <Button label="Remove" type={ButtonType.SECONDARY} onClick={() => removePermission(permission)} />
                  ) : (
                    <Button label="Add" type={ButtonType.PRIMARY} onClick={() => addPermission(permission)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </>
  );
};

export default RoleCard;
