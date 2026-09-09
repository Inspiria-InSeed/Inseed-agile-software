"""
Script to generate a test JWT token for Supabase authentication testing.
This simulates what Supabase would return after a user logs in.
"""

import os
from dotenv import load_dotenv
from jose import jwt
from datetime import datetime, timedelta, timezone
import uuid

# Load environment variables
load_dotenv()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

if not SUPABASE_JWT_SECRET or SUPABASE_JWT_SECRET == "placeholder_jwt_secret_here":
    print("❌ Error: SUPABASE_JWT_SECRET not set in .env file")
    print("Please update your .env file with the real JWT secret from Supabase Dashboard")
    exit(1)

# Test user data
test_user_id = str(uuid.uuid4())
test_email = "test@inseed.com"

# Create JWT payload similar to what Supabase creates
now = datetime.now(timezone.utc)
payload = {
    "aud": "authenticated",
    "exp": int((now + timedelta(hours=24)).timestamp()),
    "sub": test_user_id,
    "email": test_email,
    "phone": "",
    "app_metadata": {
        "provider": "email",
        "providers": ["email"]
    },
    "user_metadata": {
        "name": "Test User"
    },
    "role": "authenticated",
    "aal": "aal1",
    "amr": [
        {
            "method": "password",
            "timestamp": int(now.timestamp())
        }
    ],
    "session_id": str(uuid.uuid4()),
    "iat": int(now.timestamp())
}

# Generate token
token = jwt.encode(payload, SUPABASE_JWT_SECRET, algorithm="HS256")

print("="*80)
print("✅ TEST JWT TOKEN GENERATED")
print("="*80)
print("\nTest User Info:")
print(f"  User ID: {test_user_id}")
print(f"  Email: {test_email}")
print(f"  Name: Test User")
print(f"  Expires: {datetime.fromtimestamp(payload['exp']).strftime('%Y-%m-%d %H:%M:%S UTC')}")
print("\n" + "-"*80)
print("\nYour JWT Token:")
print("-"*80)
print(token)
print("-"*80)
print("\n📋 Copy the token above and use it in your requests!")
print("\nTo test:")
print("1. Go to http://localhost:8000/docs")
print("2. Click 'Authorize' button")
print("3. Paste the token")
print("4. Test /api/auth/me endpoint")
print("\nOr use curl:")
print(f'curl -X GET http://localhost:8000/api/auth/me -H "Authorization: Bearer {token[:50]}..."')
print("\n" + "="*80)
