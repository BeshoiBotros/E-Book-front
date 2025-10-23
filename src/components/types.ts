export interface User {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: Boolean,
    is_active: Boolean,
    date_joined: Date
  }
  
  export interface UserFormData {
    username?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    is_staff?: boolean,
    is_active?: boolean,
    // date_joined: Date | null,
    password?: string
  }