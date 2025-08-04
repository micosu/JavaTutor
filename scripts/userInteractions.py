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
user_collection = db['userInteractions']
test_collection = db['testInteractions']

# === Google Sheets Setup ===
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("fow-data-analysis.json", scope)
gc = gspread.authorize(creds)

spreadsheet = gc.open("Data Analysis - Java Tutor")
try:
    sheet = spreadsheet.worksheet("Sheet4")
except gspread.exceptions.WorksheetNotFound:
    sheet = spreadsheet.add_worksheet(title="Sheet2", rows="1000", cols="30")

# === Combined header fields ===
all_fields = [
    'Transaction ID', 'sessionID', 'studentID', 'studentGroup', 'timestamp', 'moduleID',
    'questionID','problemName',  'eventType', 'isCorrect', 'userAnswers', 'correctAnswers',
    'userAnswerIndex', 'userAnswerText', 'correctAnswerIndex', 'correctAnswerText','answer', 
    'message', 'testType', 'reflectionResponse', 'score', 
]

# === Read existing transaction IDs ===
existing_ids = set(sheet.col_values(1)[1:])  # skip header

# === Helper function ===
def format_doc(doc):
    row = {}
    row['Transaction ID'] = str(doc.get('_id', ''))
    row['sessionID'] = doc.get('sessionId', '')
    row['studentID'] = doc.get('studentId', '')
    row['studentGroup'] = doc.get('studentGroup', '')
    ts = doc.get('timestamp', '')
    if isinstance(ts, datetime):
        row['timestamp'] = ts.isoformat()
    else:
        row['timestamp'] = str(ts)
    row['moduleID'] = doc.get('moduleId', '')
    row['questionID'] = doc.get('questionId', '')
    moduleId = doc.get('moduleId', '')
    questionId = doc.get('questionId', '')
    testType = doc.get('testType', '')
    result = ""
    if testType:
        result += testType
    else:
        result += "intervention"

    if moduleId:
        result += "-Module" + str(moduleId)
    if questionId:
        result += "-Question" + str(questionId)
    row['problemName'] = result

    row['eventType'] = doc.get('eventType', '')
    row['isCorrect'] = doc.get('isCorrect', '')
    ua = doc.get('userAnswers', '')

    if isinstance(ua, list):
        row['userAnswers'] = ', '.join(str(v) for v in ua)
    elif isinstance(ua, dict):
        row['userAnswers'] = ', '.join(f"{k}: {v}" for k, v in ua.items())
    else:  
        row['userAnswers'] = str(ua)

    ca = doc.get('correctAnswers', '')

    if isinstance(ca, dict):
        row['correctAnswers'] = ', '.join(f"{k}: {v}" for k, v in ca.items())
    elif isinstance(ca, list):
        row['correctAnswers'] = ', '.join(str(v) for v in ca)
    else:
        row['correctAnswers'] = str(ca)

    row['userAnswerIndex'] = doc.get('userAnswerIndex', '')
    row['userAnswerText'] = doc.get('userAnswerText', '')
    row['correctAnswerIndex'] = doc.get('correctAnswerIndex', '')
    row['correctAnswerText'] = doc.get('correctAnswerText', '')

    ans = doc.get('answer', '')
    if isinstance(ans, dict):
        row['answer'] = ', '.join(f"{k}: {v}" for k, v in ans.items())
    elif isinstance(ans, list):
        row['answer'] = ', '.join(str(v) for v in ans)
    else:
        row['answer'] = str(ans)


    row['message'] = doc.get('message', '')
    row['testType'] = doc.get('testType', '')
    row['reflectionResponse'] = doc.get('reflectionResponse', '')
    row['score'] = doc.get('score', '')
    
    return [row.get(col, '') for col in all_fields]

# === Add header if empty ===
if not sheet.row_values(1):
    sheet.insert_row(all_fields, 1)

# === Collect and append new rows from userInteractions ===
new_rows = []
for doc in user_collection.find():
    transaction_id = str(doc['_id'])
    if transaction_id not in existing_ids:
        new_rows.append(format_doc(doc))
        existing_ids.add(transaction_id)

# === Collect and append new rows from testInteractions ===
for doc in test_collection.find():
    transaction_id = str(doc['_id'])
    if transaction_id not in existing_ids:
        new_rows.append(format_doc(doc))
        existing_ids.add(transaction_id)

# === Append to sheet ===
if new_rows:
    sheet.append_rows(new_rows, value_input_option="RAW")
