# Import necessary libraries
import certifi
import gspread
import os

from bson.objectid import ObjectId
from datetime import datetime
from dotenv import load_dotenv
from oauth2client.service_account import ServiceAccountCredentials
from pymongo import MongoClient

load_dotenv()

# Initialize Variables
MONGODB_URI = os.getenv("MONGODB_URI")
ROLL_NUMBERS = os.getenv("ROLL_NUMBERS", "").split(",")
SHEET_NAME = "Data Analysis - Java Tutor"

# === MongoDB Setup ===
mongo_client = MongoClient(MONGODB_URI, tlsCAFile=certifi.where())
db = mongo_client["FOW"]
collection = db["students"]


# === Google Sheets Setup ===
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("fow-data-analysis.json", scope)
gc = gspread.authorize(creds)

# Open the Google Sheet
spreadsheet = gc.open(SHEET_NAME)

try:
    sheet = spreadsheet.worksheet("Summary")
except gspread.exceptions.WorksheetNotFound:
    sheet = spreadsheet.add_worksheet(title="Summary", rows="1000", cols="30")

# === Get students from MongoDB ===
students = collection.find({"rollNumber": {"$in": ROLL_NUMBERS}})

# === All headers for the Google Sheet ===
headers = ["Roll Number", "Total Number of Completed Questions", "Module 1", "Module 2", "Module 3"]

# === Clear the sheet and add headers ===
sheet.clear()
sheet.append_row(headers)

# === Write data to Google Sheet ===
for student in students:
    completed_questions = student.get("completedQuestions", [])
    completed_questions_count = 0 if len(completed_questions) <= 1 else len(completed_questions) - 1

    # Count completed questions per module
    module_counts = {1: 0, 2: 0, 3: 0}
    for i in range(1, len(completed_questions)):
        item = completed_questions[i]
        # print(item)
        module_id = int(item.get("moduleId", ""))
        # print(module_id)
        if module_id in module_counts:
            module_counts[module_id] += 1

    # Prepare the row data
    row = [
        student.get("rollNumber", ""),
        completed_questions_count,
        module_counts[1],
        module_counts[2],
        module_counts[3]
    ]

    # Append the row to the Google Sheet
    sheet.append_row(row)


# === Confirmation message ===
print("✅ Data transfer complete!")
