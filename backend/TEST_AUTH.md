# Testing Supabase Authentication

## Overview
The backend now has JWT authentication integrated with Supabase.

## Available Endpoints

### 1. GET /api/auth/me
Get current authenticated user information.

**Requires**: Valid Supabase JWT token

**Headers**:
```
Authorization: Bearer <your-supabase-jwt-token>
```

**Response** (200 OK):
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "account_status": "pending",
  "created_at": "2026-09-09T10:00:00Z",
  "approved_by": null,
  "approved_at": null
}
```

**Errors**:
- `401 Unauthorized`: Invalid/expired token
- `404 Not Found`: User not in database

---

### 2. GET /api/auth/me/active
Get current user info (active accounts only).

**Requires**: Valid JWT token + active account status

**Response** (200 OK): Same as `/me`

**Errors**:
- `401 Unauthorized`: Invalid/expired token
- `403 Forbidden`: Account not active (pending/suspended)

---

### 3. GET /api/auth/status
Quick token validation check.

**Response** (200 OK):
```json
{
  "authenticated": true,
  "user_id": "uuid",
  "email": "user@example.com",
  "account_status": "active"
}
```

---

## How It Works

### 1. User Authentication Flow
1. User logs in via Supabase (frontend)
2. Supabase returns JWT access token
3. Frontend includes token in requests: `Authorization: Bearer <token>`
4. Backend verifies token with Supabase JWT secret
5. Backend extracts user_id from token
6. Backend fetches/creates user in database
7. Backend returns user data

### 2. First-Time User
When a user logs in for the first time:
- Token is verified
- User doesn't exist in `users` table
- Backend automatically creates user with:
  - `user_id` from Supabase auth
  - `email` from token
  - `account_status = "pending"`
  - `created_at = now()`

### 3. Account Status
- **pending**: New users (default)
- **active**: Approved users (can access system)
- **suspended**: Blocked users

Admins can change status in the `users` table.

---

## Testing with cURL

### Test 1: Without Token (Should Fail)
```bash
curl -X GET http://localhost:8000/api/auth/me
```
**Expected**: 403 Forbidden

### Test 2: With Invalid Token (Should Fail)
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer invalid-token-here"
```
**Expected**: 401 Unauthorized

### Test 3: With Valid Token (Should Success)
```bash
# Get token from Supabase login first, then:
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer <your-real-supabase-token>"
```
**Expected**: 200 OK with user data

---

## Getting a Test Token

### Option 1: Use Supabase Dashboard
1. Go to Supabase Dashboard → Authentication → Users
2. Click on a user
3. Copy the "Access Token" (if visible)

### Option 2: Via Frontend Login (Coming in Task 3)
Once Task 3 is complete, you can:
1. Login via frontend
2. Token is stored in frontend state
3. Use browser DevTools to copy token from:
   - localStorage/sessionStorage
   - Network tab → Headers

### Option 3: Using Supabase CLI
```bash
supabase gen types typescript --local > types.ts
```

---

## API Documentation

Auto-generated API docs available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

You can test endpoints directly from Swagger UI using the "Authorize" button.

---

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "User account is pending. Please contact an administrator."
}
```

### 404 Not Found
```json
{
  "detail": "User not found"
}
```

---

## Next Steps

**Task 3** will implement:
- Supabase client in frontend
- Login page with email/password
- OTP verification flow
- Token storage and management
- Protected routes
- Automatic token inclusion in API calls

Once Task 3 is complete, authentication will be seamless!

---

## Database Schema (users table)

For reference, the `users` table structure:

```sql
CREATE TABLE users (
  user_id uuid PRIMARY KEY,
  name text,
  email text UNIQUE NOT NULL,
  account_status text DEFAULT 'pending',
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  rls text
);
```

---

*Last Updated: September 9, 2026*
