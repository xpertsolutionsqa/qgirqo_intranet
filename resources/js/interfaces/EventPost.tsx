export interface EventPost {
    id: number;
    title: string;
    content: string;
    event_date: string;
    event_time: string;
    event_end_time: string;
    event_venue: string;
    category_id: number;
    is_published: boolean;
    created_at: string;
    author?: { name: string };
    category?: { title: string; color: string };
}
