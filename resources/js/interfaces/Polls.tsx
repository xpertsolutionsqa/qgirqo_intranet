import { User } from './EmployeeProfile';

export interface PollOption {
    id: number;
    poll_id: number;
    option_text: string;
    votes: any[];
    created_at: string;
    updated_at: string;
}

export interface Poll {
    id: number;
    user_id: number;
    question: string;
    starts_at: string;
    ends_at: string | null;
    is_active: number;
    created_at: string;
    updated_at: string;
    options: PollOption[];
    votes: any[];
    creator: User;
}
