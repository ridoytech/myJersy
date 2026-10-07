# Private File Storage
Files stored in this directory are private, located outside any public web root.
They must only be served or downloaded through authorized backend API endpoints (e.g. `/api/files/:id/download`) which verify permissions before streaming.
Never expose this directory directly to web servers (such as Nginx or Next.js static asset roots).
