import { ProfileDto } from "./profile.dto";

export interface UserDto {
    id: number;
    username?: string;
    provider: string;
    providerId: string | null;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
    profile: ProfileDto;
}
