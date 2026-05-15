import prisma from "../DB/db.config.js";
export const getUserPermissions = async (roleId) => {
    const rolePermissions = await prisma.roleBasePermission.findMany({
        where: {
            roleId: roleId
        },
        include: {
            permissionMap: {
                include: {
                    entity: true,
                    action: true
                }
            }
        }
    });

    const permissions = {};

    rolePermissions.forEach((rp) => {
        const entity = rp.permissionMap?.entity?.name;
        const action = rp.permissionMap?.action?.name;

        if (!entity || !action) return;

        if (!permissions[entity]) {
            permissions[entity] = {};
        }

        permissions[entity][action] = rp.status ?? true;
    });

    return permissions;
};