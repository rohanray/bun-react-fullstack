import type { Post, Comment } from "@/lib/types";

const listPosts = async (page: number, limit: number): Promise<any[]> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * limit}&_limit=${limit}`);
        const json = await response.json();
        return json.map((item: Post) => ({ ...item }));
    } catch (error) {
        return [];
    }
}

const getPostById = async (id: number): Promise<Post | undefined> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const json = await response.json();
        const post: Post = { ...json };
        return post;
    } catch (error) {
        return undefined;
    }
}

const getPostCommentsByPostId = async (postId: number, page: number, limit: number): Promise<any[]> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments?_start=${(page - 1) * limit}&_limit=${limit}`);
        const json = await response.json();
        return json.map((item: Comment) => ({ ...item }));
    } catch (error) {
        return [];
    }
}

export const PostCmds = {
    ListPosts: listPosts,
    GetPostById: getPostById,
    GetPostCommentsByPostId: getPostCommentsByPostId
};