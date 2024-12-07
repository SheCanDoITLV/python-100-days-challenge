# Day 99 Challenge: The Ultimate Combo Scraper 🕵️‍♀️✉️🗓️

Today, we’re diving into a real-world automation task that combines **web scraping**, **filtering**, **scheduling**, and **emailing**! 💻✨

Your mission, should you choose to accept it, is to create a **combo scraper** that keeps track of IT professions from a website and notifies you of anything that matches your interests. 🚀

---

## **What You'll Learn** 📚
1. **Web Scraping** 🕸️: How to gather data from websites using Python.
2. **Data Filtering** 🔍: Narrow down the results to match your personal interests.
3. **Task Scheduling** ⏰: Automate the scraping process at regular intervals.
4. **Email Notifications** 📧: Send yourself (or someone else) alerts with links to the scraped content.

---

## **The Challenge** 🎯
Here’s what your program should do:

1. **Scrape IT Professions**  
   Extract a list of IT professions from [SheCanDoIT: Professions and Roles](https://www.shecandoit.lv/profesijas-un-lomas).  
   Each profession should include:
   - Name
   - Hyperlink to the profession’s page.

2. **Filter Results**  
   Narrow down the professions based on topics or keywords that interest you. For example:  
   - **Keywords**: "IT", "speciāliste", "izstrādātāja", etc.

3. **Schedule Scraping**  
   Run the scraping process automatically every **6 hours** using a scheduler.

4. **Send Email Alerts**  
   If any new professions match your interests, email yourself (or a friend) with:
   - The name of the profession.
   - A hyperlink to its page.

---

## **Steps to Build the Program** 🛠️

### 1. **Scrape IT Professions** 🕸️
- Use a web scraping library like `BeautifulSoup` or `requests`.
- Fetch the list of professions and their links from the website.

### 2. **Filter by Interests** 🔍
- Create a list of keywords/topics that interest you.
- Compare the scraped data against these keywords and keep only the matches.

### 3. **Schedule Scraping** ⏰
- Use the `schedule` library to set up the scraping process to run every 6 hours.
- Test the scheduler with shorter intervals (e.g., every minute) during development.

### 4. **Email Notifications** ✉️
- Format the results into a readable email.
- Include hyperlinks to the professions' pages.
- Send the email using SMTP.

---

## **Output Example** 📧

If a matching profession is found, you’ll receive an email like this:

<img id="image" src="assets/day99_1.png" alt="day99 image" width="720">

---

## **Tips for Success** 🌟
- **Selector Testing**: Use browser dev tools (Inspect Element) to identify the correct HTML selectors.
- **Keyword Optimization**: Adjust your `INTERESTS` list to better match the professions.
- **Debugging**: Test each step (scraping, filtering, emailing) separately before combining them.

---

✨ Enjoy the process of creating this powerful and practical automation tool!

---

## Solution (No Peeking!)

<details>
<summary>👀 Answer</summary>

```python
from bs4 import BeautifulSoup
import schedule, os, time, smtplib, requests
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv(dotenv_path='python-dotenv/.env')

password = os.getenv('mailPassword')
username = os.getenv('mailUsername')

INTERESTS = ["IT", "speciāliste", "izstrādātāja"]

def scrape_professions():
    url = "https://www.shecandoit.lv/profesijas-un-lomas"
    response = requests.get(url)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')

    professions = []
    items = soup.select("div", class_ = 'collection-list w-dyn-items')

    for item in items:
        link = item.find('a', class_="link-block-7 w-inline-block")
        name_block = item.find('div', class_='text-block-7')
        if name_block and link:
            name = name_block.text.strip()
            professions.append({"name": name, "link": f"https://www.shecandoit.lv{link['href']}"})

    return professions

def filter_professions(professions):
    unique_professions = []
    seen_names = set()
    
    for profession in professions:
        if any(interest.lower() in profession['name'].lower() for interest in INTERESTS):
            if profession['name'] not in seen_names:
                unique_professions.append(profession)
                seen_names.add(profession['name'])
    
    return unique_professions

def send_email(professions):
    email_content = f"""
    <html>
        <body>
            <h2>🚀 New IT Professions Matching Your Interests 🌟</h2>
            <p>We found the following professions that match your interests:</p>
            <ul style="list-style-type:none; padding: 0;">
                {''.join(f"<li style='margin-bottom: 10px;'>🔹 <strong>{p['name']}</strong> - <a href='{p['link']}' target='_blank'>{p['link']}</a></li>" for p in professions)}
            </ul>
            <p>Check them out and take the next step in your IT journey!</p>
        </body>
    </html>
    """

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(username, password)
        msg = MIMEText(email_content, 'html')
        msg['Subject'] = "🚀 New IT Professions Alert"
        msg['From'] = username
        msg['To'] = username
        server.send_message(msg)
        print("✅ Email sent!")

def task():
    professions = scrape_professions()
    matches = filter_professions(professions)
    if matches:
        send_email(matches)

schedule.every(6).hours.do(task)

while True:
    schedule.run_pending()
    time.sleep(1)
```

</details>

