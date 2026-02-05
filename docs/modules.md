# QGIRCO Intranet - Backend Modules & Database Schema

Status Indicators: ✅ Done | 🏗️ In Progress | 📋 Pending

## 1. User & Role Management (RBAC) ✅

- **Status:** Core logic and tables are ready.
- **Implemented:**
    - `spatie/laravel-permission` installed.
    - Roles: `admin`, `hr`, `employee`.
    - Permissions: `manage-users`, `approve-leaves`, `view-announcements`.
- **Tables:** `users`, `roles`, `permissions`, `model_has_roles`, `role_has_permissions`.

## 2. Employee Management (HR Module) ✅

- **Status:** Profiles, Depts, and Designations are ready.
- **Implemented:**
    - `EmployeeScopes` trait for Birthday & Anniversary logic.
    - Foreign keys linked to User, Department, and Designation.
- **Tables:**
    - `departments`: id, name, slug
    - `designations`: id, title, slug
    - `employee_profiles`: user_id, employee_id, joining_date, **dob**, department_id, designation_id, phone, emergency_contact.

## 3. Internal Communication (News, Events & Announcements) ✅

- **Status:** Unified structure implemented.
- **Implemented:**
    - `Post` model handles all types (News, Event, Announcement) via an Enum.
    - Event-specific fields (`event_date`, `event_venue`).
- **Tables:**
    - `post_categories`: id, title, slug, color
    - `posts`: author_id, category_id, **type (enum)**, title, slug, summary, content, featured_image, **event_date**, **event_venue**, is_published.

## 4. Leave Management System (LMS) 📋

- **Status:** Pending Implementation.
- **Tables (Planned):**
    - `leave_types`: id, name, total_days_per_year
    - `leave_requests`: user_id, leave_type_id, start_date, end_date, reason, status, approved_by_id
    - `leave_balances`: user_id, leave_type_id, year, taken, remaining

## 5. Document Management System (DMS) 📋

- **Status:** Pending Implementation.
- **Tables (Planned)::**
    - `documents`: id, title, description, file_path, category_id, uploaded_by
    - `document_categories`: id, name

## 6. Helpdesk / IT Ticketing 📋

- **Status:** Pending Implementation.

## 7. Employee Recognition & Perks 📋

- **Employee of the Month:** highlight specific users for specific months.
- **Promotions & Offers:** Corporate discounts or internal perks for employees.

## 8. Photo Gallery 📋

- **Albums:** Support for multiple photos per album.
- **Categories:** Corporate events, team building, etc.

## 9. Community & Engagement 📋

- **Discussion Forum:** Threads, categories, and member replies.
- **Polls:** Internal voting for company decisions or feedback.

---

### Implementation Patterns Used:

- **Traits:** `EmployeeScopes` for clean model logic.
- **Relationships:** Proper Eloquent connections (`belongsTo`, `hasMany`, `hasOne`).
- **Seeders:** `RoleSeeder`, `DepartmentSeeder`, `DesignationSeeder`, `AdminUserSeeder`.
