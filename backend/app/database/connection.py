from pymongo import MongoClient
from dotenv import load_dotenv
import os
import sys

# Load environment variables
load_dotenv()

# Read values from .env
MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGODB_URI:
    print("[WARNING] MONGODB_URI not found in environment variables", file=sys.stderr)
if not DATABASE_NAME:
    print("[WARNING] DATABASE_NAME not found in environment variables", file=sys.stderr)

# Create MongoDB client
client = MongoClient(MONGODB_URI)

# Connect to database
db = client[DATABASE_NAME]