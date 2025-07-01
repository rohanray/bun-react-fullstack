// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __jsonParse = (a) => JSON.parse(a);

// src/server.ts
var {serve } = globalThis.Bun;

// src/index.html
var src_default = __jsonParse("{\"index\":\"./index.html\",\"files\":[{\"input\":\"index.html\",\"path\":\"./index-a7jywwxq.js\",\"loader\":\"js\",\"isEntry\":true,\"headers\":{\"etag\":\"CZT7h_qBhZc\",\"content-type\":\"text/javascript;charset=utf-8\"}},{\"input\":\"index.html\",\"path\":\"./index.html\",\"loader\":\"html\",\"isEntry\":true,\"headers\":{\"etag\":\"9COociv4QgI\",\"content-type\":\"text/html;charset=utf-8\"}},{\"input\":\"index.html\",\"path\":\"./index-x4wsvmxw.css\",\"loader\":\"css\",\"isEntry\":true,\"headers\":{\"etag\":\"7u8RajW9ON4\",\"content-type\":\"text/css;charset=utf-8\"}},{\"input\":\"logo.svg\",\"path\":\"./logo-kygw735p.svg\",\"loader\":\"file\",\"isEntry\":false,\"headers\":{\"etag\":\"M17Q_OfjpZY\",\"content-type\":\"image/svg+xml\"}},{\"input\":\"react.svg\",\"path\":\"./react-c5c0zhye.svg\",\"loader\":\"file\",\"isEntry\":false,\"headers\":{\"etag\":\"rMWMAB-xvk4\",\"content-type\":\"image/svg+xml\"}}]}");

// src/svc/albumSvc.ts
var getAlbumById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
    const json = await response.json();
    const album = {
      userId: json.userId,
      id: json.id,
      title: json.title
    };
    return album;
  } catch (error) {
    return;
  }
};
var listAlbums = async (page, limit) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_start=${(page - 1) * limit}&_limit=${limit}`);
    const json = await response.json();
    return json.map((item) => ({
      userId: item.userId,
      id: item.id,
      title: item.title
    }));
  } catch (error) {
    return [];
  }
};
var getPhotosByAlbumId = async (albumId, page, limit) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_start=${(page - 1) * limit}&_limit=${limit}`);
    const json = await response.json();
    return json.map((item) => ({
      albumId: item.albumId,
      id: item.id,
      title: item.title,
      url: item.url,
      thumbnailUrl: item.thumbnailUrl
    }));
  } catch (error) {
    return [];
  }
};
var AlbumCmds = {
  GetAlbumById: getAlbumById,
  ListAlbums: listAlbums,
  GetPhotosByAlbumId: getPhotosByAlbumId
};
// src/svc/userSvc.ts
var listUsers = async (page, limit) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_start=${(page - 1) * limit}&_limit=${limit}`);
    const json = await response.json();
    return json.map((item) => ({ ...item }));
  } catch (error) {
    return [];
  }
};
var getUserById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const json = await response.json();
    const user = { ...json };
    return user;
  } catch (error) {
    return;
  }
};
var getUserAlbumsByUserId = async (userId, page, limit) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums?_start=${(page - 1) * limit}&_limit=${limit}`);
    const json = await response.json();
    return json.map((item) => ({ ...item }));
  } catch (error) {
    return [];
  }
};
var UserCmds = {
  ListUsers: listUsers,
  GetUserById: getUserById,
  GetUserAlbumsByUserId: getUserAlbumsByUserId
};
// src/svc/postSvc.ts
var listPosts = async (page, limit) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * limit}&_limit=${limit}`);
    const json = await response.json();
    return json.map((item) => ({ ...item }));
  } catch (error) {
    return [];
  }
};
var getPostById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const json = await response.json();
    const post = { ...json };
    return post;
  } catch (error) {
    return;
  }
};
var getPostCommentsByPostId = async (postId, page, limit) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments?_start=${(page - 1) * limit}&_limit=${limit}`);
    const json = await response.json();
    return json.map((item) => ({ ...item }));
  } catch (error) {
    return [];
  }
};
var PostCmds = {
  ListPosts: listPosts,
  GetPostById: getPostById,
  GetPostCommentsByPostId: getPostCommentsByPostId
};
// src/lib/handlers/albumHttpHandler.ts
var getAlbumByIdHttpHandler = async (req) => {
  const url = new URL(req.url);
  const _id = url.pathname.split("/").pop();
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
  const album = await AlbumCmds.GetAlbumById(id);
  if (!album) {
    return Response.json({ error: "Album not found" }, { status: 404 });
  }
  return Response.json(album);
};
var listAlbumsHttpHandler = async (req) => {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "", 10);
  const limit = parseInt(url.searchParams.get("limit") || "", 10);
  if (isNaN(page) || isNaN(limit)) {
    return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
  }
  const albums = await AlbumCmds.ListAlbums(page, limit);
  return Response.json(albums);
};
var listPhotosByAlbumIdHttpHandler = async (req) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/");
  const _id = pathParts[pathParts.length - 2];
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
  const photos = await AlbumCmds.GetPhotosByAlbumId(id, page, limit);
  return Response.json(photos);
};
var AlbumHttpHandler = {
  getAlbumByIdHandler: getAlbumByIdHttpHandler,
  listAlbumsHandler: listAlbumsHttpHandler,
  listPhotosByAlbumIdHandler: listPhotosByAlbumIdHttpHandler
};
// src/lib/handlers/userHttpHandler.ts
var getUserByIdHttpHandler = async (req) => {
  const url = new URL(req.url);
  const _id = url.pathname.split("/").pop();
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
  const user = await UserCmds.GetUserById(id);
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  return Response.json(user);
};
var listUsersHttpHandler = async (req) => {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "", 10);
  const limit = parseInt(url.searchParams.get("limit") || "", 10);
  if (isNaN(page) || isNaN(limit)) {
    return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
  }
  const users = await UserCmds.ListUsers(page, limit);
  return Response.json(users);
};
var getUserAlbumsByUserIdHttpHandler = async (req) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/");
  const _id = pathParts[pathParts.length - 2];
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
  const albums = await UserCmds.GetUserAlbumsByUserId(id, page, limit);
  return Response.json(albums);
};
var UserHttpHandler = {
  getUserByIdHandler: getUserByIdHttpHandler,
  listUsersHandler: listUsersHttpHandler,
  getUserAlbumsByUserIdHandler: getUserAlbumsByUserIdHttpHandler
};

// src/lib/handlers/postHttpHandler.ts
var getPostByIdHttpHandler = async (req) => {
  const url = new URL(req.url);
  const _id = url.pathname.split("/").pop();
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
};
var listPostsHttpHandler = async (req) => {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "", 10);
  const limit = parseInt(url.searchParams.get("limit") || "", 10);
  if (isNaN(page) || isNaN(limit)) {
    return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
  }
  const posts = await PostCmds.ListPosts(page, limit);
  return Response.json(posts);
};
var getPostCommentsByPostIdHttpHandler = async (req) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/");
  const _id = pathParts[pathParts.length - 2];
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
var PostHttpHandler = {
  getPostByIdHandler: getPostByIdHttpHandler,
  listPostsHandler: listPostsHttpHandler,
  getPostCommentsByPostIdHandler: getPostCommentsByPostIdHttpHandler
};

// src/routes.ts
var routes_default = {
  "/*": src_default,
  "/api/albums/:id": AlbumHttpHandler.getAlbumByIdHandler,
  "/api/albums": AlbumHttpHandler.listAlbumsHandler,
  "/api/albums/:id/photos": AlbumHttpHandler.listPhotosByAlbumIdHandler,
  "/api/users": UserHttpHandler.listUsersHandler,
  "/api/users/:id": UserHttpHandler.getUserByIdHandler,
  "/api/users/:id/albums": UserHttpHandler.getUserAlbumsByUserIdHandler,
  "/api/posts": PostHttpHandler.listPostsHandler,
  "/api/posts/:id": PostHttpHandler.getPostByIdHandler,
  "/api/posts/:id/comments": PostHttpHandler.getPostCommentsByPostIdHandler
};

// src/server.ts
var server = serve({
  routes: routes_default,
  development: {
    hmr: true,
    console: true
  }
});
console.log(`\uD83D\uDE80 Server running at ${server.url}`);
