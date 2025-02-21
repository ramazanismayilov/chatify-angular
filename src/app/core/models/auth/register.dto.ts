export interface RegisterDto {
    email?: string;
    phone?: string;
    password: string;
    username: string;
    fullName?: string;
}

export interface RegisterResponseDto {
    user: RegisterDto;
    token: string;
    message: string
}