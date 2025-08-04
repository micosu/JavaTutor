import pymongo
import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials

# ----- Step 1: Set up Google Sheets access -----
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("fow-data-analysis.json", scope)
client = gspread.authorize(creds)

# Open the Google Sheet
sheet = client.open("Data Analysis - Java Tutor").sheet1

# ----- Step 2: Set up MongoDB access -----
mongo_client = pymongo.MongoClient("mongodb+srv://dmondhe:FOW25Java@cluster0.i7tisuz.mongodb.net/FOW?retryWrites=true&w=majority&appName=Cluster0g")
db = mongo_client["FOW"]
collection = db["students"]

# ----- Step 3: List of allowed roll numbers -----
allowed_roll_numbers = ["CleverMongoose77", "CharmingKoala13", "PeppyRaven91", "WittyHedgehog8", "HappyRaven12", "DaringHawk70", "FriendlyRabbit11", "BrightOtter98" , "LuckyRaven51" , "JollyFox19", "LuckyBeaver67", "SunnyFalcon55", "JollyCheetah32" ,"ZestyOwl65", "QuickFox39", "ZippyBluejay6", "VibrantRaven19", "CleverHedgehog12", "dhruvi2"]  # <-- your list here

# ----- Step 4: Fetch and filter data -----
students = collection.find({"rollNumber": {"$in": allowed_roll_numbers}})

sheet.clear()
# Optional: add header row to the Google Sheet
headers = [
    "Name", "Roll Number", "Type", "Consent Form", "Participation",
    "Number of Completed Questions", "Number of AI Conversations",
    "Completed Questions", "Conversations",
    "PreTest1 Score", "PreTest1 Answers",
    "PreTest2 Score", "PreTest2 Answers",
    "PreTest3 Score", "PreTest3 Answers",
    "PostTest1 Score", "PostTest1 Answers",
    "PostTest2 Score", "PostTest2 Answers",
    "PostTest3 Score", "PostTest3 Answers"
]
sheet.append_row(headers)


# ----- Step 5: Write to Google Sheet -----
for student in students:
    completed_questions = student.get("completedQuestions", [])
    conversation_history = student.get("conversationHistory", [])

    str_completed_questions = json.dumps(completed_questions)
    str_conversation_history = json.dumps(conversation_history)

    completed_questions_count = 0 if len(completed_questions) <= 1 else len(completed_questions)
    conversation_history_count = 0 if len(conversation_history) <= 1 else len(conversation_history)

    tests = student.get("tests", {})

    def get_test_info(test_key):
        test = tests.get(test_key, {})
        score = test.get("score", "")
        answers = test.get("answers", {})
        answers_str = json.dumps(answers) if isinstance(answers, dict) else str(answers)
        return score, answers_str

    row = [
        student.get("name", ""),
        student.get("rollNumber", ""),
        student.get("type", ""),
        student.get("consentForm", ""),
        student.get("consentData", {}).get("participate", ""),
        completed_questions_count,
        conversation_history_count,
        str_completed_questions,
        str_conversation_history          # Convert list of dicts to string
    ]

    for test_key in ["pre-test-1", "pre-test-2", "pre-test-3", "post-test-1", "post-test-2", "post-test-3"]:
        score, answers = get_test_info(test_key)
        row.extend([score, answers])
    sheet.append_row(row)

print("✅ Data transfer complete!")
