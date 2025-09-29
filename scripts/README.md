# Running the scripts

## Set-up

In order to run the scripts locally, there is a bit of set-up that needs to be completed both on your laptop and with Google Cloud

### Google Cloud Set-up

1. If you don't already have one, you will need to create an account on Google Cloud Console:
   https://console.cloud.google.com/

2. From there, you will need to create a project. Name it whatever you would like.

3. Create an IAM Service Account (IAM -> Service Accounts -> Create Service Account)
   Feel free to give it limited permissions (Basic -> Viewer)

4. After the Service Account is created successfully, create and download a private key
   Click the Service Account you just created -> Keys -> Add Key -> Create New Key -> JSON
   Move this json file to your "scripts" folder, and rename it "fow-data-analysis.json"

5. Enable Appropriate APIs for the account to access
   Search "Google Drive API" and "Google Sheets API" and enable them both for the project

After this, your Google Cloud Account should be ready!

### Local Set-up

There are a number of packages required to run the scripts, so you should start by creating a virtual environment, downloading the packages, and making sure the rest of your files are set up.

1. Create virtual environment

#### On Mac:

```
python3 -m venv venv OR python -m venv venv
source venv/bin/activate
```

OR

```
python -m venv venv
source venv/bin/activate
```

Depending on your python environemnt

#### On Windows:

```
python -m venv venv
source venv\Scripts\activate
```

2. Install dependencies:

```
pip install -r requirements.txt
```

#### Other File Setup

You should also create a ".env" file for this folder. In this file, you will store your MongoDB URI (check Java Tutor Tech Doc, Setting Up Environment Tab, MongoDB Section if you don't have one already).

Your .env file should look like this:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.i7tisuz.mongodb.net/FOW?retryWrites=true&w=majority&appName=Cluster0
ROLL_NUMBERS=rollnumber1,rollnumber2,etc
```

Where <user> and <password> are from your mongodb account, and rollnumber1,rollnumber2,etc are the Roll Numbers for the accounts of students in the study.

With this, you should be fully ready to run the scripts!

## Google Drive Set-up

In order for the code to work, you need to create a Google Sheets file named "Java Tutor - Data Analysis". You also must share this document with your service account (client_email in your json file).

## Running Scripts

Now, you should be able to run:

```
python fileName.py
```

Where fileName.py is any of the script files.

data-analysis.py ~ general information about each user: Roll Number, Consent Form Status, Number of Questions Completed, Test Scores, etc
summary.py ~ information about number of questions each user completed from each module
userInteractions.py ~ all logged user interactions from the tutor and the test
