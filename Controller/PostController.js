import prisma from "../DB/db.config.js";

// CreatePost Api
export const Postcreated = async (req, resp) => {

    try {

        const {
            title,
            content,
            userId
        } = req.body;

        const finduser = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        });
        if (!finduser) {
            return resp.json({
                status: 404,
                message: "User Not Found."
            });
        }
        const createnewPost = await prisma.post.create({
            data: {
                title,
                content,
                userId: Number(userId)
            }
        });

        return resp.json({
            status: 200,
            message: "Post Created Successfully",
            data: createnewPost.id
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

        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            return resp.status(404).json({ message: "Post not found" });
        }
        const updated = await prisma.post.update({
            where: { id },
            data: {
                title: req.body.title,
                content: req.body.content
            }
        });

        return resp.json({ status: 200, message: "Post updated successfully", data: updated.id });

    } catch (error) {
        return resp.json({
            status: 500,
            message: error.message
        });
    }
};

// Get Post Api
export const getPostById = async (req, resp) => {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
        where: { id }
    });

    return resp.json({
        status: 200,
        message: "Post Details",
        data: post
    });

};

// Get PostList Api
export const getPostList = async (req, resp) => {
    const [posts, totalCount] = await Promise.all([
        prisma.post.findMany(
            {
                where: {
                    is_hide: false
                }
            }
        ),
        prisma.post.count({
            where: {
                is_hide: false
            }
        })
    ]);

    return resp.json({
        status: 200,
        message: "Post List",
        data: posts,
        total: totalCount
    });
};

// Delete Post Api
export const deletePost = async (req, resp) => {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
        where: { id }
    });
    if (!post) {
        return resp.status(404).json({ message: "Post not found" });
    }
    await prisma.post.delete({
        where: { id }
    });
    return resp.json({
        status: 200,
        message: "Post deleted successfully"
    });

};

// Get PostUserList Api
export const getUserPostList = async (req, resp) => {

    const alluserposts = await prisma.user.findMany({
        where: {
            posts: {
                some: { is_active: false }
            }
        },
        select: {
            id: true,
            name: true,
            posts: {
                select: {
                    id: true,
                    title: true,
                }
            }
        }
    });

    const totalCount = await prisma.post.count({ where: { is_active: false } });

    return resp.json({
        status: 200,
        message: "User Post List",
        data: alluserposts,
        total: totalCount
    });
};

//  Soft Delete Api
export const PostSoftDelete = async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            return resp.status(404).json({ message: "Post not found" });
        }
        const updated = await prisma.post.update({
            where: { id },
            data: {
                is_hide: true
            }
        });

        return resp.json({ status: 200, message: "Post updated successfully", data: updated.id });

    } catch (error) {
        return resp.json({
            status: 500,
            message: error.message
        });
    }
};

//  Soft Active Api
export const PostSoftActive = async (req, resp) => {
    try {
        const id = Number(req.query.id);
        const Isactive = req.query.Isactive === 'true' ? true : false;

        const post = await prisma.post.findUnique({
            where: { id: id }
        });

        if (!post) {
            return resp.status(404).json({ message: "Post not found" });
        }
        const updated = await prisma.post.update({
            where: { id: id },
            data: {
                is_active: Isactive
            }
        });

        return resp.json({ status: 200, message: "Post updated successfully", data: updated.id });

    } catch (error) {
        return resp.json({
            status: 500,
            message: error.message
        });
    }
};
