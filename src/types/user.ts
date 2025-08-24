interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    birth_date: string;
    phone_number: string | null;
    profile_picture: string | null;
    is_active: boolean;
    is_banned: boolean;
    joined_at: string;
    last_login_time: string | null;
    deleted_at: string | null
}

export default User