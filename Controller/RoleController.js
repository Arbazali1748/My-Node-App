import prisma from "../DB/db.config.js";

// CreatePost Api
export const PostRole = async (req, resp) => {

    try {

        const { name, permissions } = req.body;

        const createnewRole = await prisma.role.create({
            data: {
                name: name
            }
        });

        const rolePermissions = await Promise.all(
            permissions.map((perm) =>
                prisma.roleBasePermission.create({
                    data: {
                        roleId: createnewRole.id,
                        permissionMapId: perm.permissionMapId,
                        status: perm.status
                    }
                })
            )
        );


        return resp.json({
            status: 200,
            message: "Roles Created Successfully",
            data: createnewRole.id
        });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            message: error.message
        });
    }
};

//  Update Post Api
export const PostUpdate = async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const Role = await prisma.role.findUnique({
            where: { id }
        });

        if (!Role) {
            return resp.status(404).json({
                message: "Role not found"
            });
        }

        // delete old permissions
        await prisma.roleBasePermission.deleteMany({
            where: { roleId: id }
        });

        // update role
        const updated = await prisma.role.update({
            where: { id },
            data: {
                name: req.body.name
            }
        });

        // get permissions from body
        const permissions = req.body.permissions;

        // create new permissions
        await Promise.all(
            permissions.map((perm) =>
                prisma.roleBasePermission.create({
                    data: {
                        roleId: id,
                        permissionMapId: perm.permissionMapId,
                        status: perm.status
                    }
                })
            )
        );

        return resp.json({
            status: 200,
            message: "Role updated successfully",
            data: updated
        });

    } catch (error) {
        return resp.json({
            status: 500,
            message: error.message
        });
    }
};
// Get Post Api
export const getRoleById = async (req, resp) => {
    const id = Number(req.params.id);
    const Role = await prisma.role.findMany({
        where: { id: id },
        include: {
            rolePermissions: {
                select: {
                    permissionMapId: true,
                    status: true
                }
            }
        }
    });

    return resp.json({
        status: 200,
        message: "Role Details",
        data: Role
    });

};

// Get PostList Api
export const getRoleList = async (req, resp) => {

    const Role = await prisma.role.findMany({
        where: {
            is_hide: false
        }
    });

    return resp.json({
        status: 200,
        message: "Role List",
        data: Role,
        //total: totalCount
    });
};

// Delete Post Api
export const deleteRole = async (req, resp) => {
    const id = Number(req.params.id);
    const Role = await prisma.role.findUnique({
        where: { id }
    });
    if (!Role) {
        return resp.json({ status: 404, message: "Role not found" });
    }
    await prisma.Role.delete({
        where: { id }
    });
    return resp.json({
        status: 200,
        message: "Role deleted successfully"
    });

};

//  Soft Delete Api
export const RoleSoftDelete = async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const Role = await prisma.role.findUnique({
            where: { id }
        });

        if (!Role) {
            return resp.json({ status: 404, message: "Role not found" });
        }
        const updated = await prisma.role.update({
            where: { id },
            data: {
                is_hide: true
            }
        });

        return resp.json({ status: 200, message: "Role deleted successfully", data: updated.id });

    } catch (error) {
        return resp.json({
            status: 500,
            message: error.message
        });
    }
};

//  Soft Active Api
export const RoleSoftActive = async (req, resp) => {
    try {
        const id = Number(req.query.id);
        const Isactive = req.query.Isactive === 'true' ? true : false;

        const Role = await prisma.role.findUnique({
            where: { id: id }
        });

        if (!Role) {
            return resp.json({ status: 404, message: "Role not found" });
        }
        const updated = await prisma.role.update({
            where: { id: id },
            data: {
                status: Isactive
            }
        });

        return resp.json({ status: 200, message: "Role status Updated successfully", data: updated.id });

    } catch (error) {
        return resp.json({
            status: 500,
            message: error.message
        });
    }
};
