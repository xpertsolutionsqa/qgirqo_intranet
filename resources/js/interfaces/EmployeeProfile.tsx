export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    profile: EmployeeProfile;
    created_at: string;
    updated_at: string;
}

export interface EmployeeProfile {
    id: number;
    user_id: number;
    department_id: number;
    designation_id: number;
    employee_id: string;
    avatar: string | null;
    dob: string;
    joining_date: string;
    phone: string;
    emergency_contact: string;
}
