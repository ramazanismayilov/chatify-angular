export interface ProfileDto {
    id: number;
    fullName: string;
    image: string | null;
}

export interface UserDto {
    id: number;
    username: string;
    profile: ProfileDto;
}

export interface FollowerDto {
    id: number;
    from: UserDto;
}

export interface FollowingDto {
    id: number;
    to: UserDto;
}