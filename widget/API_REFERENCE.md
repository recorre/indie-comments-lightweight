# API Reference for Indie Comments Widget

## Base URL
The API endpoints are accessible through the backend proxy at `http://localhost:3001/api/`.

## Endpoints

### Widget Endpoints (Public)

#### GET `/api/comments`
Fetch comments for a specific thread.

**Parameters:**
- `thread_id` (integer, required): The ID of the thread to fetch comments for
- `status` (string, optional): Filter by status ('approved' by default, or 'pending')

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "thread_id": 123,
      "parent_id": null,
      "author_name": "John Doe",
      "author_email": "john@example.com",
      "author_website": "http://johndoe.com",
      "message": "This is a sample comment",
      "status": "approved",
      "spam_score": 0.1,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### POST `/api/comments`
Submit a new comment to a thread.

**Body:**
```json
{
  "thread_id": 123,
  "author_name": "John Doe",
  "author_email": "john@example.com",
  "author_website": "http://johndoe.com",
  "message": "This is my comment",
  "parent_id": null
}
```

**Validation:**
- `thread_id` must be an integer
- `author_name` required, 1-100 characters
- `message` required, 1-10000 characters
- `author_email` optional, must be valid email
- `author_website` optional, must be valid URL
- `parent_id` optional, must be integer

**Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "id": 123
}
```

#### POST `/api/threads`
Create a new comment thread for a page.

**Body:**
```json
{
  "site_id": 1,
  "page_url": "https://example.com/article",
  "page_title": "My Article"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "id": 456
}
```

### Admin Endpoints (Protected)

#### GET `/api/admin/comments`
Fetch comments for admin review.

**Parameters:**
- `status` (string, optional): Filter by status ('pending' by default)
- `limit` (integer, optional): Number of records (1-100, default 50)

#### PUT `/api/admin/comments/{id}`
Update comment status.

**Body:**
```json
{
  "status": "approved"  // 'approved', 'rejected', or 'spam'
}
```

## Error Responses

Standard error response format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Backend Proxy Configuration

The backend proxy handles all external API communications securely, protecting API keys by keeping them server-side only.