# API Documentation

## API Server
- The server for the API is in the **database** folder.
### How to run the server
**Note**: Ensure your laptop has Python and Pip, check by using the following commands:
```python3 --version ```
```python3 -m pip --version```
*These command is different in Windows, check https://packaging.python.org/en/latest/tutorials/installing-packages/*

### STEPS
- Step 1: Navigate to the directory - "database" folder.
    - *Note*: The "database" folder has:
        - "api" folder
        - "base" folder
        - "database" folder
        - db.sqlite3
        - manage.py 
- Step 2: open the terminal/ command line in the folder 
    - The terminal should be similar to:
        MacBook-Air **database** % 
- Step 3: Run the following commands in the terminal
```python3 -m venv env``
```source env/bin/activate ```
    - **On Windows** use ```env\Scripts\activate```
- Step 4: Install Django and Django REST framework into the virtual environment
```pip3 install django```
```pip3 install djangorestframework```
- Step 5: Run command:
```python3 manage.py migrate```
- Step 6: Run the server:
```python3 manage.py runserver```

### IMPORTANT!!!
- Step 3 and 4 just have to be executed once when *you run the server for the first time on your laptop*. You can skip step 3,4 after that and it should be working, even when you terminate the server. To run it again, just use step 6.
- To terminate the server: CTRL+C

## Database structure
- **"avatars"** table:
    - avatar_id (number -- auto incremented // PK)
    - name (text)
    - source (url)
- **"users"** table:
    - user_id (PK)
    - name
    - avatar_id (Foreign key to Avatar table)
- **"rooms"** table:
    - room_id (PK)
    - name
    - colour (HEX color)
    - icon (text)
    - note (text)
- **"tasks"** table:
    - task_id (PK)
    - name 
    - description
    - coins (number)
    - due_date (Date time)
    - frequency (number)
    - task_type (Boolean) 
        - True: task is assigned to someone
        - False: task is pending
    - user_id (FK)
    - room_id (FK)
- **"notices"** table:
    - notice_id (PK)
    - description 
    - user_id (FK)
- **"priorities"** table:
    - prio_id (PK)
    - description 
    - user_id (FK)    


## API Calls
### Provided functions
- In this branch, there is a Node app, with the main file called **test.js**.
    - This file contains the examples of a call that can be used to add/ get/ update data in the database.
    - This file imports some functions from **./helpers/apiFunctions.js** to make the calls.
    - **Note**: The only function that you must look at is  **test.js*. 

### How test.js works
- Basically, I provide several functions:
##### getAll(target)
- This function gets all data from a table
- **PARAMS**
- **target** is the table name (table name can be found at [Database structure](#database-structure))
    - Example: ```getAll("users")```

##### getByID(target, id)
- This function gets the data in the table associated with an id
- **PARAMS**
- **target** is the table name
- **id** is the id of the item that you want to fetch

##### add(target, data)
- This function adds a new entity to the database (like create a new user, new task,...)
- **PARAMS**
- **target** is the table name
- **data** is the JSON object that matches the requested structure in a table (See [Example model](#example-model))

##### update(target, id, data)
- This functions updates an item (that has the provided id) with the given data 
- **PARAMS**
- **target** is the table name
- **id** is the id of the item that you want to update
- **data** is the JSON object that matches the requested structure in a table (See [Example model](#example-model))
    - **Note**: any field that you want to update, use your value, otherwise, keep the original value
    - Spread syntax can be used easily for this functionality

## Example model
- Data model for **"avatars" table**
```
{
    name: [your value -- string],
    source: [url]
}
```
- Data model for **"users" table**
```
{
    name: [your value -- string],
    avatar_id: [id of the avatar -- must exist]
}
```
- Data model for **"rooms" table**
```
{
    name: [your value -- string],
    colour: [hex value],
    icon: [icon name],
    note: [text]
}
```
- Data model for **"tasks" table**
```
{
    name: [your value -- string],
    description: [text],
    coins: [number]
    due_date: [Date() object]
    frequency: [number]
    task_type: [boolean]
    user_id: [id of user]
    room_id: [id of room]

}
```
- Data model for **"notices" table**
```
{
    description: [text],
    user_id: [id of user]
}
```
- Data model for **"priorities" table**
```
{
    description: [text],
    user_id: [id of user]
}
```






    

