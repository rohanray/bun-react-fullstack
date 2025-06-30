import index from "@/index.html"
import { AlbumHttpHandler } from "@/lib/handlers";
import { UserHttpHandler } from "./lib/handlers/userHttpHandler";
import { PostHttpHandler } from "./lib/handlers/postHttpHandler";

export default {
    // Serve index.html for all frontend routes
    "/*": index,

    // Album API routes
    // Get Album by album id
    "/api/albums/:id": AlbumHttpHandler.getAlbumByIdHandler,
    // List Albums with pagination
    "/api/albums": AlbumHttpHandler.listAlbumsHandler,
    //List Photos by album id
    "/api/albums/:id/photos": AlbumHttpHandler.listPhotosByAlbumIdHandler,

    // User API routes
    //List users with pagination
    "/api/users": UserHttpHandler.listUsersHandler,
    // Get User by user id
    "/api/users/:id": UserHttpHandler.getUserByIdHandler,
    // Get User Albums by user id
    "/api/users/:id/albums": UserHttpHandler.getUserAlbumsByUserIdHandler,

    // Post API routes
    // List Posts with pagination
    "/api/posts": PostHttpHandler.listPostsHandler,
    // Get Post by post id
    "/api/posts/:id": PostHttpHandler.getPostByIdHandler,
    // Get Post Comments by post id
    "/api/posts/:id/comments": PostHttpHandler.getPostCommentsByPostIdHandler
};