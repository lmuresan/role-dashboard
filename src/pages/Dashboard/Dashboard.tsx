import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import Button, { ButtonType } from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import Roles from "../../components/Roles/Roles";
import { Permission } from "../../types/Permission";
import { Role } from "../../types/Role";
import { MockRoleService } from "./../../service/mockRoleService";

type DashboardProps = {};

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const mockService = new MockRoleService();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<boolean>(false);
  const [updatePermissionError, setUpdatePermissionError] = useState<boolean>(false);

  const fetchFromApi = async () => {
    const roles = await mockService.getRoles();
    const permissions = await mockService.getPermissions();

    return { roles, permissions };
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setRequestError(false);

    fetchFromApi()
      .then((data) => {
        setRoles(data.roles);
        setPermissions(data.permissions);
        setIsLoading(false);
        setRequestError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequestError(true);
      });
  }, [setRoles, setPermissions, setIsLoading, setRequestError]);

  useEffect(() => {
    fetchData();
  }, []);

  const updatePermissionsForARole = useCallback(
    (roleId: string, permissions: Permission[]) => {
      setUpdatePermissionError(false);
      mockService
        .setPermissionsForRole(roleId, permissions)
        .then((newRole) => {
          const newRoles: Role[] = [];

          roles.forEach((role) => {
            let newPermissions = role.permissions;

            if (role.id === newRole.id) {
              newPermissions = newRole.permissions;
            }
            newRoles.push({ ...role, permissions: newPermissions });
          });

          setRoles(newRoles);
          setUpdatePermissionError(false);
        })
        .catch((err) => {
          setUpdatePermissionError(true);
        });
    },
    [roles, setRoles, setUpdatePermissionError]
  );

  return (
    <div className="container-fluid">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {requestError ? (
            <div>
              An error has ocurred, try again by clicking this button{" "}
              <Button label="Get new data" type={ButtonType.SECONDARY} onClick={fetchData} />
            </div>
          ) : (
            <div>
              {updatePermissionError ? (
                <p className="text-danger">There was an error updating your permission, try again</p>
              ) : (
                false
              )}
              <Roles
                listOfRoles={roles}
                listOfPermissions={permissions}
                updatePermissions={updatePermissionsForARole}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
