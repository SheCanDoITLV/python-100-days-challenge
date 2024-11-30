# Day 98: Automate! Automate! 🚀

Automation can save time, reduce repetitive tasks, and even make life more fun! Let’s explore how to schedule tasks using Python in **VSCode**. 💻✨

---

## Getting Started 🌟

### Install `schedule` module

✅ Step 1: Install the schedule Module:
1. Open your terminal or the integrated terminal in VSCode.
2. Run the following command:

```python
pip3 install schedule
```

✅ Step 2: Verify Installation
After installation, ensure the module is properly installed by running:

```python
pip3 show schedule
```

You should see details about the installed module.

---

### Let's start coding!

Here’s a quick example: a simple program that prints a clock emoji ⏰ every couple of seconds.

1. **Import the `schedule` library**  
2. **Write a subroutine** to print the emoji  
3. **Schedule the subroutine** to run every 2 seconds  
4. **Create an infinite loop** to run the scheduled tasks  

```python
import schedule

def printMe():
    print("⏰")

schedule.every(2).seconds.do(printMe)

while True:
    schedule.run_pending()
```

💡 **Pro Tip:** In VSCode, use the terminal to run your script (`python3 python_files/day98.py`).

---

### ⚠️ Resource Hog Alert!  
The `while True` loop is a bit greedy—it runs thousands of times per second, wasting CPU power. Let’s fix it with a quick hack using `time.sleep()`:

```python
import schedule, time

def printMe():
    print("⏰")

schedule.every(2).seconds.do(printMe)

while True:
    schedule.run_pending()
    time.sleep(1)  # Pause for 1 second
```

---

### Going Bigger: Time Intervals ⏳

Want to run something every few minutes or hours? Easy peasy! 🍋

- **Every 2 minutes:**  
  ```python
  schedule.every(2).minutes.do(printMe)
  ```
- **Every 2 hours:**  
  ```python
  schedule.every(2).hours.do(printMe)
  ```

---

## Let’s Make It Useful: Email Reminders 💌  

Why not remind yourself to take a break? 🧘‍♀️  
Here’s how you can automate sending emails using Gmail.

---

### Setting Up Your Environment ⚙️

### How to Generate a One-Time Password for Gmail 🔐

Follow these steps to generate a one-time **App Password** for Gmail to use in your Python scripts:

---

### Step 1: Enable Two-Factor Authentication 🔒
1. Go to your [Google Account Security Page](https://myaccount.google.com/security).
2. Scroll down to **"Signing in to Google"** and ensure **2-Step Verification** is **ON**.  
   - If it’s not enabled, follow the prompts to set it up.

---

### Step 2: Generate an App Password 🔑
1. While still on the [Google Account Security Page](https://myaccount.google.com/security), find the **App Passwords** section under **"Signing in to Google"**.
   - You may need to re-enter your Google account password.
2. In the **App Passwords** page:
   - Under **Select app**, choose **Mail**.
   - Under **Select device**, choose **Other (Custom name)** and type a name like `Python Email Bot`.
3. Click **Generate**.

<img id="image" src="assets/day98_1.png" alt="day98 image" width="690">

---

### Step 3: Copy and Save the App Password ✨
1. Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`). **Copy it** immediately.
   - You won’t see this password again, so make sure to save it securely (e.g., in a password manager).

---

### Step 4: Use the App Password in Your Script 🧑‍💻
- Use this password in your Python script as your `mailPassword`.
- Example in `.env` file:
  ```python
  mailPassword=abcd efgh ijkl mnop
  mailUsername=your-email@gmail.com
  ```

---

### Tips & Troubleshooting 🛠️
- If the **App Passwords** option is not visible:
  - Ensure **2-Step Verification** is enabled.
  - App Passwords are not available for accounts with advanced security settings, like **Google Workspace** accounts.
- If you encounter issues, check Google’s [support page for App Passwords](https://support.google.com/accounts/answer/185833).

---

## Sending Emails 📤

### Set up the mail

There is a LOT going on here, so I've commented all of the new code.

***TLDR: New imports. New subroutine to set all the mail parameters. Create the mail & send it. Call the subroutine to test it.***

**Install Required Libraries**  
   Run the following in the terminal:  
   ```python
   pip3 install secure-smtplib
   ```

Here’s the updated code to send a reminder email:

```python
import schedule, time, os, smtplib  # Import required libraries
from email.mime.multipart import MIMEMultipart  # For creating multipart email messages
from email.mime.text import MIMEText  # For adding text to the email
from dotenv import load_dotenv  # Load environment variables from .env file

# Load environment variables from the .env file
load_dotenv(dotenv_path='python-dotenv/.env')

# Retrieve email credentials from environment variables
password = os.getenv('mailPassword')
username = os.getenv('mailUsername')

# Function to send an email
def sendMail():
    email_content = "🌟 Don't forget to take a break and stay awesome!"
    server = "smtp.gmail.com"  # Gmail SMTP server
    port = 587  # SMTP port for Gmail

    # Establish connection with the mail server
    with smtplib.SMTP(host=server, port=port) as s:
        s.starttls()  # Enable encryption
        s.login(username, password)  # Log in to the server

        # Create the email
        msg = MIMEMultipart()
        msg['To'] = "recipient@example.com"  # Replace with recipient's email
        msg['From'] = username
        msg['Subject'] = "Take a Break! 💌"
        msg.attach(MIMEText(email_content, 'html'))  # Attach the email content as HTML

        # Send the email
        s.send_message(msg)
        print("✅ Email sent successfully!")

# Function to print and send email (for scheduling)
def printMe():
    print("⏰ Reminder: Sending Email")
    sendMail()

# Schedule the task to run every 1 hour
schedule.every(1).hours.do(printMe)

# Run the scheduled tasks
while True:
    schedule.run_pending()
    time.sleep(1)  # Sleep to reduce resource usage
```

---

## Final Thoughts 🌟

With this script, you’ve automated your first email reminder and learned about scheduling tasks efficiently in **VSCode**! 💼✨

Keep experimenting, and don’t forget to take those breaks! 🌼

### This is the result 🚀

<img id="image" src="assets/day98_2.png" alt="day98 image" width="690">

<img id="image" src="assets/day98_3.png" alt="day98 image" width="690">

---

## Common Errors
 
 First, delete any other code in your `day98` files. Copy each code snippet below into `day98` files by clicking the copy icon in the top right of each code box. Then, hit `run` and see what errors occur. Fix the errors and press `run` again until you are error free. Click on the `👀 Answer` to compare your code to the correct code.

 ### There's SOOOO Much

 ALL of the imports have to be there!

The email settings have to be precise. Check it's the correct port & server. Check the spelling of the 'To' & 'From'.

Check that the username & password haven't been revoked. If they have, then update your secrets with the new ones.

Here's one code error though:

```python
schedule.every(1).hour.do(printMe)
```

<details>
<summary>👀 Answer</summary>

Time intervals must be plural - `hours`, not `hour`. Even if there's only one of them.

```python
schedule.every(1).hours.do(printMe)
```

</details>

---

## Fix My Code
 
 First, delete any other code in your `day98` files. Copy each code snippet below into `day98` files by clicking the copy icon in the top right of each code box. Then, hit `run` and see what errors occur. Fix the errors and press `run` again until you are error free. Click on the `👀 Answer` to compare your code to the correct code.

```python
import schedule, time, os, smtplib 

def sendMail():
  email = "Don't forget to take a break!" 
  server = "smtp.gmail.com" 
  port = 587 
  s = smtplib.SMTP(host = server, port = port) 
  s.starttls() 
  s.login(username, password) 

  msg = MIMEMultipart() 
  msg['To'] = "recipient@email.com" 
  msg['From'] = username 
  msg['Subject'] = "Take a BREAK" 
  msg.attach(MIMEText(email, 'html'))

  s.send_message(msg) 
  del msg 



def printMe():
  print("⏰ Sending Reminder")
  sendMail()

schedule.every(1).hour.do(printMe) 

while True:
  schedule.run_pending()
  time.sleep(1)
```

<details>
<summary>👀 Answer</summary>

```python
import schedule, time, os, smtplib 
from email.mime.multipart import MIMEMultipart # Missing imports
from email.mime.text import MIMEText 
from dotenv import load_dotenv  # Load environment variables from .env file

# Load environment variables from the .env file
load_dotenv(dotenv_path='python-dotenv/.env')

password = os.environ['mailPassword'] # Missing secrets, you need to add these yourself or you will still get an error 
username = os.environ['mailUsername']

def sendMail():
  email = "Don't forget to take a break!" 
  server = "smtp.gmail.com" 
  port = 587 
  s = smtplib.SMTP(host = server, port = port) 
  s.starttls() 
  s.login(username, password) 

  msg = MIMEMultipart() 
  msg['To'] = "recipient@email.com" 
  msg['From'] = username 
  msg['Subject'] = "Take a BREAK" 
  msg.attach(MIMEText(email, 'html'))

  s.send_message(msg) 
  del msg 



def printMe():
  print("⏰ Sending Reminder")
  sendMail()

schedule.every(1).hours.do(printMe) # Singular interval

while True:
  schedule.run_pending()
  time.sleep(1)
```

</details>

---

# Day 98 Challenge: Motivational Quotes ✨

Today’s challenge is to create a Python script that sends you a daily dose of motivation. You’ve got this! 💪 I believe in you!

---

## **Goals** 🎯
1. Import motivational quotes from a provided text file.
2. Pick one quote randomly each day.
3. Email yourself a random motivational quote.

---

## **Steps to Complete the Challenge** 🛠

1. **Prepare the Quotes File**  
   - Create a text file named `quotes.txt`.
   - Add multiple motivational quotes, each on a new line:
     ```python
     "Believe you can and you're halfway there." – Theodore Roosevelt
     "The only way to do great work is to love what you do." – Steve Jobs
     "Success is not the key to happiness. Happiness is the key to success." – Albert Schweitzer
     "Don't watch the clock; do what it does. Keep going." – Sam Levenson
     ```

2. **Write the Python Script**  

---

## **How It Works** ⚙️
1. **Quotes File**: `quotes.txt` contains all your motivational quotes.
2. **Random Selection**: Each day, the script picks a random quote.
3. **Email Delivery**: Sends the quote to your email address at 9:00 AM (or your preferred time).

---

## **Example Output** 📧

**Subject**: 🌟 Daily Motivational Quote 🌟  
**Content**:
```python
🌟 Your Daily Motivation 🌟

"Believe you can and you're halfway there." – Theodore Roosevelt

Stay positive and keep moving forward!
```

---

## **Tips** 💡
- Test the script with different times using `schedule.every(1).minutes.do(send_daily_quote)` for faster testing.
- Add as many quotes as you like to `quotes.txt` for variety.
- Ensure your `.env` file contains your correct credentials.

---

Start each day inspired and energized! 🌟 Let me know if you need more help. 😊

<img id="image" src="assets/day98_4.png" alt="day98 image" width="690">

---

## Solution (No Peeking!)

<details>
<summary>👀 Answer</summary>

```python
import schedule, time, os, smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import random
import os.path

load_dotenv(dotenv_path='python-dotenv/.env')

password = os.getenv('mailPassword')
username = os.getenv('mailUsername')

script_dir = os.path.dirname(os.path.abspath(__file__))
quotes_file_path = os.path.join(script_dir, 'files/quotes.txt')

def load_quotes(file_path):
    with open(file_path, 'r') as file:
        quotes = file.readlines()
    return [quote.strip() for quote in quotes]

def send_daily_quote():
    quotes = load_quotes(quotes_file_path)
    quote = random.choice(quotes)
    email_content = f"🌟 Your Daily Motivation 🌟\n\n{quote}\n\nStay positive and keep moving forward!"
    server = "smtp.gmail.com"
    port = 587
    try:
        with smtplib.SMTP(host=server, port=port) as s:
            s.starttls()
            s.login(username, password)
            msg = MIMEText(email_content)
            msg['To'] = username
            msg['From'] = username
            msg['Subject'] = "🌟 Daily Motivational Quote 🌟"
            s.send_message(msg)
            print(f"✅ Motivational quote sent: {quote}")
    except smtplib.SMTPAuthenticationError as e:
        print("❌ Authentication error! Check your email credentials or App Password.")
        print(f"Error: {e}")
    except Exception as e:
        print("❌ An error occurred while sending the email.")
        print(f"Error: {e}")

schedule.every().day.at("09:00").do(send_daily_quote)

while True:
    schedule.run_pending()
    time.sleep(1)
```

</details>


