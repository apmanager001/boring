# Google OAuth Setup Guide

## 🔧 Environment Variables Required

Add these environment variables to your `.env.local` file and your production environment:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=https://api.boringsquirrel.com/google/callback

# Frontend URL (for redirects after OAuth)
NEXT_PUBLIC_FRONTEND_URL=https://boringsquirrel.com

# API URL
NEXT_PUBLIC_API_URL=https://api.boringsquirrel.com
```

## 🚀 Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `https://api.boringsquirrel.com/google/callback`
   - Copy the Client ID and Client Secret

## 🔍 Common Issues & Solutions

### 500 Internal Server Error

- **Missing Environment Variables**: Ensure all required env vars are set
- **Incorrect Redirect URI**: Must match exactly what's configured in Google Console
- **Missing Google+ API**: Enable the API in Google Cloud Console

### CORS Errors

- **Frontend/Backend Mismatch**: Ensure frontend and backend URLs are correctly configured
- **Missing CORS Headers**: Backend should allow requests from frontend domain

### Authorization Code Issues

- **Invalid Client ID/Secret**: Double-check your Google OAuth credentials
- **Redirect URI Mismatch**: Must be exactly the same in code and Google Console

## 📋 Testing Checklist

- [ ] Environment variables are set
- [ ] Google Cloud Console is configured
- [ ] Redirect URI matches exactly
- [ ] Google+ API is enabled
- [ ] Frontend can reach backend
- [ ] Backend can reach Google APIs

## 🐛 Debugging Steps

1. **Check Server Logs**: Look for specific error messages
2. **Verify Environment Variables**: Ensure they're loaded correctly
3. **Test Redirect URI**: Make sure it's accessible
4. **Check Google Console**: Verify OAuth configuration
5. **Monitor Network Requests**: Use browser dev tools to see the flow

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Keep Google Client Secret secure
- Use HTTPS in production
- Set appropriate cookie security flags
