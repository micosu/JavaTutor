# Import necessary libraries
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

# === MongoDB Setup ===
mongo_uri = 'mongodb+srv://dmondhe:FOW25Java@cluster0.i7tisuz.mongodb.net/FOW?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(mongo_uri)
db = client['FOW']
collection = db["students"]


# === Google Sheets Setup ===
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("fow-data-analysis.json", scope)
gc = gspread.authorize(creds)

# Open the Google Sheet
spreadsheet = gc.open("Data Analysis - Java Tutor")

try:
    sheet = spreadsheet.worksheet("Sheet5")
except gspread.exceptions.WorksheetNotFound:
    sheet = spreadsheet.add_worksheet(title="Sheet5", rows="1000", cols="30")

# === Only check for students in the study ===
allowed_roll_numbers = ["CleverMongoose77", "CharmingKoala13", "PeppyRaven91", "WittyHedgehog8", "HappyRaven12", "DaringHawk70", "FriendlyRabbit11", "BrightOtter98" , "LuckyRaven51" , "JollyFox19", "LuckyBeaver67", "SunnyFalcon55", "JollyCheetah32" ,"ZestyOwl65", "QuickFox39", "ZippyBluejay6", "VibrantRaven19", "CleverHedgehog12", "dhruvi2"]  # <-- your list here

# === Get students from MongoDB ===
students = collection.find({"rollNumber": {"$in": allowed_roll_numbers}})

# === All headers for the Google Sheet ===
headers = ["Name", "Roll Number", "Total Number of Completed Questions", "Module 1", "Module 2", "Module 3"]

# === Clear the sheet and add headers ===
sheet.append_row(headers)

# === Write data to Google Sheet ===
for student in students:
    completed_questions = student.get("completedQuestions", [])
    completed_questions_count = 0 if len(completed_questions) <= 1 else len(completed_questions)

    # Count completed questions per module
    module_counts = {1: 0, 2: 0, 3: 0}
    for i in range(1, len(completed_questions)):
        item = completed_questions[i]
        print(item)
        module_id = int(item.get("moduleId", ""))
        print(module_id)
        if module_id in module_counts:
            module_counts[module_id] += 1

    # Prepare the row data
    row = [
        student.get("name", ""),
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
