'''Create the Databases needed for evaulating PyBlocks.'''

import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

# Name of the database.
mydb = myclient["eval-db"]
#mydb = myclient["moviesdb"]

# Name of the "table", collection in mongodb.
collection_names = ["basics", "variables", "branching", "looping", "functions"]
my_collection = mydb["looping"]

for i in range(100):
    userId = f"id_{i}"
    insert_result = my_collection.insert_one({
        'userId': userId,
        'q1': 0.0,
        'q2': 0.0,
        'q3': 0.0,
        'q4': 0.0,
        'q5': 0.0
    })

'''
# Get and print the first row found.
item = my_collection.find_one()
print(item)

# Create the query.
query = my_collection.find(
        {},   # get all
        {}    # display all
    )

# Display the results.
for x in query:
  print(x)
'''

#my_collection = mydb["Movies"]
#query = my_collection.find(
#        {},             # what I am looking for
#        {"title": 1}    # only return title
#    )
#for x in query:
#  print(x["title"])

# Print the list of database names
print(myclient.list_database_names())

# Print the names of the currently selected collection.
print(mydb.list_collection_names())
