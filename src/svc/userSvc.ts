import type { Album, User } from "@/lib/types";

const listUsers = async (page: number, limit: number): Promise<User[]> => {
        try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_start=${(page - 1) * limit}&_limit=${limit}`);
        const json = await response.json();
        return json.map((item: User) => ({            ...item}));
    } catch (error) {
        return [];
    }
}

const getUserById = async (id: number): Promise<User | undefined> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const json = await response.json();
        const user: User = {...json};
        return user;
    } catch (error) {
        return undefined;
    }
}

const getUserAlbumsByUserId = async (userId: number, page: number, limit: number): Promise<any[]> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums?_start=${(page - 1) * limit}&_limit=${limit}`);
        const json = await response.json();
        return json.map((item: Album) => ({ ...item }));
    } catch (error) {
        return [];
    }
}

export const UserCmds = {
    ListUsers: listUsers,
    GetUserById: getUserById,
    GetUserAlbumsByUserId: getUserAlbumsByUserId
};