# 👉 Day 61 Challenge: Replit DB

<a href="https://www.youtube.com/watch?v=rq0COWjUX60" target="_blank">📹 Dāvida video</a>

Replit DB (Database) is a Replit specific feature that allows you to store data directly in a repl using a built-in database.

We've spent time learning about files, lists and dictionaries as data storage methods because sometimes, gasp, you might want to write code outside of Replit too, and these are all common approaches to storage across multiple platforms.

While you're here though, you can use Replit DB to easily and permanently store data with very little code. Everything we store in the database is permanentely stored in the repl.

We know...we're awesome 😊😊

However every user that uses this will get their own unique database unless you're using a client-server model. This means that it's great for independent data store, but not for sharing data amongst multiple people - unless you're building a server. We'll get to that later in the 100 days.

## All About That 'base

👉 Let's import the built-in replit DB library. Select the 'Database' option from your dock on the bottom left. Then, drag and drop the database tab into your `day61.py` tab.

*Note: If you do not do this, you will see 'copy' instead of 'insert' within the database commands.

<img id="image" src="assets/day61.png" alt="Replit Workspace Overview" width="460">


👉 Click `How to use the database` to see the different functions available and how to use them.


<img id="image" src="assets/day61_01.png" alt="Replit Workspace Overview" width="460">

👉 When you're done looking around, click 'Insert' on the 'Import the database' option to get this code.

<img id="image" src="assets/day61_02.png" alt="Replit Workspace Overview" width="460">


```python
from replit import db
```

That's it! No, really.

## Storing Data

Now let's store some information. To do this, we use keys and values in a very similar way to a dictionary.

<img id="image" src="assets/day61_03.png" alt="Replit Workspace Overview" width="960">

Choose 'Set a key to a value':

<img id="image" src="assets/day61_04.png" alt="Replit Workspace Overview" width="460">

👉 We'll call our key 'test' and set the value to 'Hello there'.

```python
from replit import db

db["test"] = "Hello there"
```

When you `run` the code, nothing is printed. Not to worry. The key will be created and stored behind the scenes. You don't need the key creation code any more. Notice how it isn't in any further example code.

## Acessing Data

### All keys

👉 Now choose 'List all keys' and `run` this code to get the program to print out all of the keys.

<img id="image" src="assets/day61_05.png" alt="Replit Workspace Overview" width="460">

```python
from replit import db

keys = db.keys()
print(keys)
```

### Single key

Note: If the key doesn't exist, the program will throw a KeyError and crash, so harness your `try.... except` powers.

👉 To access a single key, choose 'Get a key's value' from the menu. In this example, 'test' is the key's value. We can then print it out.

<img id="image" src="assets/day61_06.png" alt="Replit Workspace Overview" width="460">

```python
from replit import db

value = db["test"]
print(value)
```

## Removing Data

👉 Select - yep, you got it - 'Delete a key' from the menu. Then add the name of your key.

<img id="image" src="assets/day61_07.png" alt="Replit Workspace Overview" width="460">

```python
from replit import db

del db["test"]
```

## Accessing By Prefix

If we have a bunch of keys that start with the same text, then we can access them by prefix too. In this code, I've used usernames.

```python
from replit import db

db["login1"] = "david"
db["login2"] = "pamela"
db["login3"] = "sian"
db["login4"] = "ian"
```

👉 Now I can use `.prefix()` to search for all the keys that start with 'login'.

```python
from replit import db

matches = db.prefix("login")
print(matches)
```

### Try it out!

## Keys and Dictionaries

I'm a comuter scientist and I love a good database.

One of the most powerful things we can do is assign more than just one piece of data to a key. We could assign a whole list, or a dictionary.

👉 This example uses 'david' as the key, and a dictionary as the value. Look at how we can use this to store all of the user data in one key location.

```python
from replit import db

db["david"] = {"username": "dmorgan", "password":"baldy1"}
```

List all the keys:

```python
from replit import db

keys = db.keys()
print(keys)
```

## Individual Elements
👉 Now I can access individual elements in the dictionary in the normal way.

```python
from replit import db

value = db["david"]
print(value["password"])
```

### Try it out!

## Looping Access

One of the things you might want to do is access all the keys and loop through them.

<img id="image" src="assets/day61_08.png" alt="Replit Workspace Overview" width="960">

👉 Here's how:

```python
from replit import db

keys = db.keys()
for key in keys:
  print(f"""{key}: {db[key]}""")
```

### Try it out!

## Common Errors

First, delete any other code in your `day61.py` file. Copy each code snippet below into `day61.py` by clicking the copy icon in the top right of each code box. Then, hit `run` and see what errors occur. Fix the errors and press `run` again until you are error free. Click on the `👀 Answer` to compare your code to the correct code.

## InKeyRect

👉 What's the problem here?

```python
from replit import db

value = db["key"]
```


<details>
<summary>👀 Answer</summary>
The key 'key' doesn't exist in the database. Let's use a `try except` to catch it.

`pass` is a line of code that tells the program ' don't worry about this just yet, no need to do anything'.

I've used it here to avoid crashing the program by leaving a blank line after `except`. I'd probably return to this later and replace the pass with a proper error message.

```python
from replit import db

try:
  value = db["key"]
except:
  pass
```

</details>

## Where's The Data?

👉 What is the problem here?

```python
from replit import db

keys = db.keys
for key in keys:
  print(key)
```


<details>
<summary>👀 Answer</summary>
The code would output the names of all the keys, but not the data.

We'll change the print statement a little and include the 'Get key value' from the database menu. I've used a nice little fString technique here too.

```python
from replit import db

keys = db.keys()
for key in keys:
  print(f"{key}: {db[key]}")
```

</details>

## Fix My Code

👉 Try and fix this code which is full of errors.

First, delete any other code in your main.py file. Copy each code snippet below into main.py by clicking the copy icon in the top right of each code box. Then, hit run and see what errors occur. Fix the errors and press run again until you are error free. Click on the 👀 Answer to compare your code to the correct code.

```python
keys = db.key

for key in keys
print(key)
```

<details>
<summary>👀 Answer</summary>

```python
from replit import db # no import

keys = db.keys() # missing 's' from 'key', missing brackets
for key in keys: #missing colon
  print(f"{key}: {db[key]}") # Not indented. Only outputted the key.
```

*You will still get an 'attribution error' if you have not defined 'key'.*

</details>