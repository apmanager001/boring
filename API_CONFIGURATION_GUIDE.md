# API Configuration Guide

## 🐛 Problem Fixed

The 404 errors were caused by:

1. **Missing API Routes**: No `/profile` and `/logout` endpoints existed
2. **Incorrect Base URL**: Axios was trying to call external API that doesn't exist
3. **Infinite Loop**: Store was making repeated API calls without proper state management

## ✅ Solutions Implemented

### 1. **Created Missing API Routes**

- `/api/profile` - Handles user profile requests
- `/api/logout` - Handles user logout requests

### 2. **Fixed Axios Configuration**

- Updated to use relative URLs (`/api`) instead of external API
- Added request/response interceptors for debugging
- Better error handling

### 3. **Improved Store Logic**

- Added `initialized` flag to prevent multiple API calls
- Better error handling for different HTTP status codes
- Proper state management to prevent infinite loops

## 🔧 Environment Configuration

Create a `.env.local` file in your project root:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=/api

# If you have an external API, use:
# NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 📁 API Routes Created

### `/api/profile` (GET)

- Returns user profile data if authenticated
- Returns 401 if not authenticated
- Handles session validation

### `/api/profile` (POST)

- Updates user profile data
- Returns success/error messages

### `/api/logout` (POST)

- Clears session cookies
- Returns logout confirmation

## 🔄 Store Improvements

### Before (Problematic)

```javascript
// Infinite loop - kept calling API
validateSession: async () => {
  const response = await axiosInstance.get("/profile");
  // No proper state management
};
```

### After (Fixed)

```javascript
// Proper state management
validateSession: async () => {
  const { user, initialized } = get();

  // Prevent multiple calls
  if (get().loading) return;

  // Don't validate if already done
  if (initialized && user) return;

  // Proper error handling
  try {
    const response = await axiosInstance.get("/profile");
    // Handle success
  } catch (error) {
    // Handle different error types properly
  }
};
```

## 🧪 Testing the Fix

1. **Check Console**: You should see proper API request/response logs
2. **No More 404s**: Profile API calls should return 401 (not authenticated) instead of 404
3. **No Infinite Loops**: Store should only validate session once
4. **Proper Loading States**: Loading spinner should work correctly

## 🚀 Next Steps

### 1. **Implement Real Authentication**

Replace the mock API routes with real authentication:

```javascript
// In /api/profile/route.js
export async function GET(request) {
  // Add your authentication logic here
  // Check JWT tokens, session cookies, etc.

  // Return real user data from database
  const user = await getUserFromDatabase(userId);
  return NextResponse.json(user);
}
```

### 2. **Add Database Integration**

- Connect to your database (MongoDB, PostgreSQL, etc.)
- Implement user CRUD operations
- Add session management

### 3. **Add Authentication Providers**

- Google OAuth
- Email/Password authentication
- JWT token management

### 4. **Security Improvements**

- Add rate limiting
- Input validation
- CORS configuration
- CSRF protection

## 📊 Expected Results

After implementing these fixes:

- ✅ No more 404 errors
- ✅ No infinite API call loops
- ✅ Proper loading states
- ✅ Better error handling
- ✅ Improved user experience

## 🔍 Debugging

If you still see issues:

1. **Check Console Logs**: Look for API request/response logs
2. **Verify API Routes**: Ensure `/api/profile` and `/api/logout` exist
3. **Check Environment**: Verify `NEXT_PUBLIC_API_URL` is set correctly
4. **Clear Browser Cache**: Hard refresh the page
5. **Check Network Tab**: Verify API calls are going to correct endpoints

The 404 errors should now be resolved and your authentication flow should work smoothly!
