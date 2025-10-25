# API Reference for Admin Dashboard

## Base URL
The API endpoints are accessible through the backend proxy at `http://localhost:3001/api/`.

## Admin Endpoints

### GET `/api/admin/comments`
Fetch comments for admin review.

**Parameters:**
- `status` (string, optional): Filter by status ('pending' by default, or 'approved', 'rejected', 'spam')
- `limit` (integer, optional): Number of records (1-100, default 50)

**Headers:**
- `Authorization: Bearer <ADMIN_API_KEY>`

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
      "message": "This is a sample comment",
      "status": "pending",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### PUT `/api/admin/comments/{id}`
Update comment status.

**Headers:**
- `Authorization: Bearer <ADMIN_API_KEY>`
- `Content-Type: application/json`

**Body:**
```json
{
  "status": "approved"  // 'approved', 'rejected', or 'spam'
}
```

**Response:**
```json
{
  "status": "success"
}
```

### POST `/api/admin/moderation-log`
Log moderation action.

**Headers:**
- `Authorization: Bearer <ADMIN_API_KEY>`
- `Content-Type: application/json`

**Body:**
```json
{
  "comment_id": 123,
  "moderator_id": 1,
  "action": "approved",  // 'approve', 'reject', 'spam', 'delete'
  "reason": "approved"
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

## Authentication

All admin endpoints require admin API key in Authorization header.