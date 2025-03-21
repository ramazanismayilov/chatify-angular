export interface ImageDto {
    id: string
    url?: string;
    createdAt: string
    updatedAt: string
}

export interface ProfileDto {
    id: number;
    fullName: string;
    bio: string | null;
    follower: number;
    following: number;
    postCount: number;
    imageId: string | null;
    userId: number;
    image?: ImageDto;
}

export interface ProfileUpdateDto {
    fullName?: string;
    bio?: string;
    imageId?: string;
    isPrivate?: boolean;
}

export interface ProfileUpdateResponseDto {
    message: string
}