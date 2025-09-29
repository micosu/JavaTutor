# Import necessary libraries
import pymongo
import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials
from gspread.exceptions import SpreadsheetNotFound
from pymongo import MongoClient
import certifi
import os
from dotenv import load_dotenv
load_dotenv()

# Initialize Variables
MONGODB_URI = os.getenv("MONGODB_URI")
ROLL_NUMBERS = os.getenv("ROLL_NUMBERS", "").split(",")
SHEET_NAME = "Data Analysis - Java Tutor"

# ----- Step 1: Set up Google Sheets access -----
scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/drive"]

creds = ServiceAccountCredentials.from_json_keyfile_name("fow-data-analysis.json", scope)
client = gspread.authorize(creds)

try:
    # Prefer ID if you have it (more reliable than title):
    # sh = client.open_by_key(SHEET_ID)
    sh = client.open(SHEET_NAME)
    sheet = sh.sheet1
    print("Opened shared sheet.")
except SpreadsheetNotFound:
    raise SystemExit(
        "Sheet not found or not shared with the service account. "
        "Create it in your Drive and share it with the service account (Editor)."
    )

# ----- Step 2: Set up MongoDB access -----

mongo_client = MongoClient(MONGODB_URI, tlsCAFile=certifi.where())
db = mongo_client["FOW"]
collection = db["students"]

# ----- Step 3: List of allowed roll numbers -----
#["msutton2", "msutton1", "msutton3", "Leah2", "BrightHawk33", "LuckyFox88", "BoldTiger21", 
 #                       "QuickRaven47", "HappyWolf09", "MightyBear29", "SlyViper11", "NobleHorse84", "SharpEagle56", "SunnyPanda42"]

# ----- Step 4: Fetch and filter data -----
students = collection.find({"rollNumber": {"$in": ROLL_NUMBERS}})

sheet.clear()
# Optional: add header row to the Google Sheet
headers = [
    "Roll Number", "Type", "Consent Form", "Participation",
    "Number of Completed Questions", "Number of AI Conversations",
    "Completed Questions", "Conversations",
    "PreTest1 Raw Score", "PreTest1 Score", "PreTest1 Answers", "PreTest1 Form",
    "PostTest1 Raw Score", "PostTest1 Score", "PostTest1 Answers", "PostTest1 Form",
    "PreTest2 Raw Score", "PreTest2 Score", "PreTest2 Answers", "PreTest2 Form",
    "PostTest2 Raw Score", "PostTest2 Score", "PostTest2 Answers", "PostTest2 Form",
    "PreTest3 Raw Score", "PreTest3 Score", "PreTest3 Answers", "PreTest3 Form",
    "PostTest3 Raw Score", "PostTest3 Score", "PostTest3 Answers", "PostTest3 Form"
]
sheet.append_row(headers)

# ----- Step 5: Write to Google Sheet -----
for student in students:
    
    completed_questions = student.get("completedQuestions", [])
    conversation_history = student.get("conversationHistory", [])

    # Convert lists to JSON strings for better readability in the sheet
    str_completed_questions = json.dumps(completed_questions)
    str_conversation_history = json.dumps(conversation_history)

    # Count completed questions and conversations
    completed_questions_count = 0 if len(completed_questions) <= 1 else len(completed_questions)
    conversation_history_count = 0 if len(conversation_history) <= 1 else len(conversation_history)

    # Extract test information
    tests = student.get("tests", {})

    # Helper function to get test score and answers
    def get_test_info(test_key):
        test = tests.get(test_key, {})
        score = str(test.get("score", ""))
        answers = test.get("answers", {})
        answers_str = json.dumps(answers) if isinstance(answers, dict) else str(answers)
        if answers:
            form = test.get("balancedTestType", test_key)
            if form[-1] not in "123":
                form += test_key[-2:]
        else:
            form = ""
        return score, eval(score) if score else "", answers_str, form

    # Prepare the row data
    row = [
        # student.get("name", ""), # No name for privacy reasons
        student.get("rollNumber", ""),
        student.get("type", ""),
        student.get("consentForm", ""),
        student.get("consentData", {}).get("participate", ""),
        completed_questions_count,
        conversation_history_count,
        str_completed_questions,
        str_conversation_history          # Convert list of dicts to string
    ]
    # Append test scores and answers
    for test_key in ["pre-test-1", "post-test-1", "pre-test-2",  "post-test-2", "pre-test-3", "post-test-3"]:
        raw_score, score, answers, form = get_test_info(test_key)
        row.extend([raw_score, score, answers, form])
    sheet.append_row(row)

# ----- Step 6: Confirmation message -----
print("✅ Data transfer complete!")
