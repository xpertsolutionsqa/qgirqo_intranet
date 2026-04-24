# Changelog

## [Pending Tasks]

- [x] Upcoming Company Events (Renamed from Upcoming Events)
- [x] Increase font size across the intranet for better readability
- [x] Digital Voices Forum: Carousel for the latest three items
- [x] Gallery: Organized by categories and year (Public & Admin)
- [x] Employee of the Quarter: Full category support & Public Archive
- [x] Employee Directory: Modernized searchable directory for all staff
- [x] Footer Consistency: Updated all links and fixed behavior

### UI/UX Cleanup & Finalization

- [x] Commented out all placeholder links (#) in Footer and QuickLinks for a production-ready feel.
- [x] Fixed QuickLinks icon hover behavior and removed invalid CSS classes.
- [x] Updated Footer with working links to Employee Directory and Winners Archive.
- [x] Increased global base font size to 16px for improved readability.
- [x] Simplified the Employee of the Quarter admin modal (hidden unused month selection).

## [2026-04-23]

### Upcoming Company Events

- [COMPLETED] Renamed "Upcoming Events" to "Upcoming Company Events" in `UpcomingEvents.tsx`.
- [COMPLETED] Updated empty state message to "No Upcoming Company Events".

### Video/Announcement Section

- [COMPLETED] Made `video_url` optional in `GceoMessageController` to support image-only announcements.
- [COMPLETED] Updated `CreateGceoMessageModal` to include Title, Cover Image, and Content fields.
- [COMPLETED] Fixed `EditGceoMessageModal` to use file upload for videos (consistency).
- [COMPLETED] Updated `GCEOMessage` component to handle image-only mode (hide play button, disable click).

### Digital Voices Forum

- [COMPLETED] Consolidated all latest items into the main carousel (Slider).
- [COMPLETED] Removed the separate "Recent Ideas" list to create a cleaner, slider-focused UI.

### Readability Optimization

- [COMPLETED] Increased root font size to 106.25% (17px) to scale all UI elements.
- [COMPLETED] Increased global line-height to 1.6 for better text readability.

### Gallery Management

- [COMPLETED] Created `GalleryCategory` model and full management UI in dashboard.
- [COMPLETED] Implemented `Album` system (Creation with Category, Date, and Cover Image).
- [COMPLETED] Developed Admin Album index with photo counts and quick Edit/Delete actions.
- [COMPLETED] Refactored `GalleryController` to support multi-album media uploads.
- [COMPLETED] Redesigned Public Gallery with Category Tabs and Year-based grouping.
- [COMPLETED] Integrated Lightbox/Media Viewer for a premium public browsing experience.
- [COMPLETED] Updated Sidebar navigation for streamlined Gallery management.
