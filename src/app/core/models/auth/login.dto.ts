export interface LoginDto {
    username: string;
    password: string;
}

export interface LoginResponseDto {
    user: LoginDto;
    token: string;
    message: string
}