# Changelog

## [2026-04-19]

### DashboardController.php

- [COMPLETED] Updated `getWelcomeData` method to filter `events` so only today's and future events are displayed.
- [COMPLETED] Fixed event sorting: Closest upcoming events (ascending order) now appear first.

### UpcomingEvents.tsx

- [COMPLETED] Added an empty state (No Upcoming Events) UI when the events array is empty.

### AuthController.php (Azure SSO)

- [COMPLETED] Implemented JIT (Just-In-Time) Provisioning.
- [COMPLETED] Users logging in via SSO who don't exist in the DB are now automatically created as 'employee'.
- [COMPLETED] Automatic creation of EmployeeProfile with default Department/Designation and unique Employee ID.

## [21st April 2026]

### Layout & UI Balance (Row 3)

- [COMPLETED] Standardized card heights for "Employees of the Quarter", "Humans of QGIRCO", and "Employee Offers".
- [COMPLETED] Enlarged images in all Row 3 cards to reduce white space and improve balance.
- [COMPLETED] Added hover zoom effects and fixed footer heights to 52px for perfect alignment.

### Employees of the Quarter

- [COMPLETED] Added "Award Title" display below the user position.
- [COMPLETED] Updated `AddWinnerModal.tsx` to include Category dropdown (mapped to reason) while keeping Award Title text input.
- [COMPLETED] Hid "Achievement Reason" textarea to simplify the modal.

### Admin Modules (Others Section)

- [COMPLETED] Added "Others" section to Sidebar in `AuthenticatedLayout.tsx`.
- [COMPLETED] Commented out "Manage Users" (Moved/Hidden as per request).
- [COMPLETED] Added "Departments", "Designations", and "Roles" management links.
- [COMPLETED] Created `DepartmentController`, `DesignationController`, and `RoleController`.
- [COMPLETED] Implemented full CRUD for **Departments**, **Designations**, and **Roles** using Modals (Create/Edit) and modern table design.

### Employee of the Quarter Enhancements

- [COMPLETED] Added `quarter` column to `employee_of_the_months` database table.
- [COMPLETED] Updated `AddWinnerModal.tsx` to include "Select Quarter" dropdown with auto-detection of current quarter.
- [COMPLETED] Added `quarter` field supporting in `EmployeeOfTheMonth` Model and `EmployeeOfTheMonthController`.

### Dashboard Design Implementation (Staged)

- [COMPLETED] Developed new premium card design for "Humans of QGIRCO", "Employees of the Month", and "Employee Offers" featuring:
    - Unified Top Image / Bottom Info structure.
    - Glassmorphism-inspired hover effects (zoom + darkening).
    - Soft gray/blue gradients for visual depth.
    - Standardized rounded-full button styles.
    - Autoplay/Loop motion for carousels.
- [STAGED] Commented out the new design in all three components to maintain consistency until client final sign-off; reverted UI to previous production state while preserving the new code for quick activation.
