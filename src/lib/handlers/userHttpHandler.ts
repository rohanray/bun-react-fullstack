import { UserSvc } from "@/svc";

const getUserByIdHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const _id = url.pathname.split('/').pop();
    const id = parseInt(_id || "", 10);
    if (isNaN(id)) {
        return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }
    if (!id) {
        return Response.json({ error: "User ID is required" }, { status: 400 });
    }
    if (id <= 0) {
        return Response.json({ error: "User ID must be a positive integer" }, { status: 400 });
    }
    const user = await UserSvc.GetUserById(id);
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json(user);
};

const listUsersHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "", 10);
    const limit = parseInt(url.searchParams.get("limit") || "", 10);
    if (isNaN(page) || isNaN(limit)) {
        return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
    }
    const users = await UserSvc.ListUsers(page, limit);
    return Response.json(users);
};

const getUserAlbumsByUserIdHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const _id = pathParts[pathParts.length - 2]; // Get the user ID
    const page = parseInt(url.searchParams.get("page") || "", 10);
    const limit = parseInt(url.searchParams.get("limit") || "", 10);
    if (isNaN(page) || isNaN(limit)) {
        return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
    }
    const id = parseInt(_id || "", 10);
    if (isNaN(id)) {
        return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }
    if (!id) {
        return Response.json({ error: "User ID is required" }, { status: 400 });
    }
    if (id <= 0) {
        return Response.json({ error: "User ID must be a positive integer" }, { status: 400 });
    }
    const albums = await UserSvc.GetUserAlbumsByUserId(id, page, limit);
    return Response.json(albums);
};

export const UserHttpHandler = {
    getUserByIdHandler: getUserByIdHttpHandler,
    listUsersHandler: listUsersHttpHandler,
    getUserAlbumsByUserIdHandler: getUserAlbumsByUserIdHttpHandler
};