import { PostCmds } from "@/svc/postSvc";

const getPostByIdHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const _id = url.pathname.split('/').pop();
    const id = parseInt(_id || "", 10);
    if (isNaN(id)) {
        return Response.json({ error: "Invalid post ID" }, { status: 400 });
    }
    if (!id) {
        return Response.json({ error: "Post ID is required" }, { status: 400 });
    }
    if (id <= 0) {
        return Response.json({ error: "Post ID must be a positive integer" }, { status: 400 });
    }
    const post = await PostCmds.GetPostById(id);
    if (!post) {
        return Response.json({ error: "Post not found" }, { status: 404 });
    }
    return Response.json(post);
}

const listPostsHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "", 10);
    const limit = parseInt(url.searchParams.get("limit") || "", 10);
    if (isNaN(page) || isNaN(limit)) {
        return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
    }
    const posts = await PostCmds.ListPosts(page, limit);
    return Response.json(posts);
};

const getPostCommentsByPostIdHttpHandler = async (req: Bun.BunRequest) => {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const _id = pathParts[pathParts.length - 2]; // Get the post ID
    const page = parseInt(url.searchParams.get("page") || "", 10);
    const limit = parseInt(url.searchParams.get("limit") || "", 10);
    if (isNaN(page) || isNaN(limit)) {
        return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
    }
    const id = parseInt(_id || "", 10);
    if (isNaN(id)) {
        return Response.json({ error: "Invalid post ID" }, { status: 400 });
    }
    if (!id) {
        return Response.json({ error: "Post ID is required" }, { status: 400 });
    }
    if (id <= 0) {
        return Response.json({ error: "Post ID must be a positive integer" }, { status: 400 });
    }
    const comments = await PostCmds.GetPostCommentsByPostId(id, page, limit);
    return Response.json(comments);
};

export const PostHttpHandler = {
    getPostByIdHandler: getPostByIdHttpHandler,
    listPostsHandler: listPostsHttpHandler,
    getPostCommentsByPostIdHandler: getPostCommentsByPostIdHttpHandler
};