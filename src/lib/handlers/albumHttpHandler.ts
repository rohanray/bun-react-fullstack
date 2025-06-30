import { AlbumSvc } from "@/svc";

const getAlbumByIdHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const _id = url.pathname.split('/').pop();
    const id = parseInt(_id || "", 10);
    if (isNaN(id)) {
        return Response.json({ error: "Invalid album ID" }, { status: 400 });
    }
    if (!id) {
        return Response.json({ error: "Album ID is required" }, { status: 400 });
    }
    if (id <= 0) {
        return Response.json({ error: "Album ID must be a positive integer" }, { status: 400 });
    }
    const album = await AlbumSvc.GetAlbumById(id);
    if (!album) {
        return Response.json({ error: "Album not found" }, { status: 404 });
    }
    return Response.json(album);
};

const listAlbumsHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "", 10);
    const limit = parseInt(url.searchParams.get("limit") || "", 10);
    if (isNaN(page) || isNaN(limit)) {
        return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
    }
    const albums = await AlbumSvc.ListAlbums(page, limit);
    return Response.json(albums);
};

const listPhotosByAlbumIdHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const _id = pathParts[pathParts.length - 2]; // Get the album ID before 'photos'
    const page = parseInt(url.searchParams.get("page") || "", 10);
    const limit = parseInt(url.searchParams.get("limit") || "", 10);
    if (isNaN(page) || isNaN(limit)) {
        return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
    }
    const id = parseInt(_id || "", 10);
    if (isNaN(id)) {
        return Response.json({ error: "Invalid album ID" }, { status: 400 });
    }
    if (!id) {
        return Response.json({ error: "Album ID is required" }, { status: 400 });
    }
    if (id <= 0) {
        return Response.json({ error: "Album ID must be a positive integer" }, { status: 400 });
    }
    const photos = await AlbumSvc.GetPhotosByAlbumId(id, page, limit);
    return Response.json(photos);
};

export const AlbumHttpHandler = {
    getAlbumByIdHandler: getAlbumByIdHttpHandler,
    listAlbumsHandler: listAlbumsHttpHandler,
    listPhotosByAlbumIdHandler: listPhotosByAlbumIdHttpHandler
};