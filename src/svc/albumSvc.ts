import type { Album, Photo } from "@/lib/types";

const getAlbumById = async (id: number): Promise<Album | undefined> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const json = await response.json();
        const album: Album = {
            userId: json.userId,
            id: json.id,
            title: json.title
        };
        return album;
    } catch (error) {
        return undefined;
    }
}

const listAlbums = async (page: number, limit: number): Promise<Album[]> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_start=${(page - 1) * limit}&_limit=${limit}`);
        const json = await response.json();
        return json.map((item: any) => ({
            userId: item.userId,
            id: item.id,
            title: item.title
        }));
    } catch (error) {
        return [];
    }
}

const getPhotosByAlbumId = async (albumId: number, page: number, limit: number): Promise<Photo[]> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_start=${(page - 1) * limit}&_limit=${limit}`);
        const json = await response.json();
        return json.map((item: any) => ({
            albumId: item.albumId,
            id: item.id,
            title: item.title,
            url: item.url,
            thumbnailUrl: item.thumbnailUrl
        }));
    } catch (error) {
        return [];
    }
}

export const AlbumCmds = {
    GetAlbumById: getAlbumById,
    ListAlbums: listAlbums,
    GetPhotosByAlbumId: getPhotosByAlbumId
};