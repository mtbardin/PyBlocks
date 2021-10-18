import sys

# get the name of the file being passed in.
file_name = sys.argv[1]
# print(file_name)

# Check if it is a python file.
if file_name.split(".", 1)[1] == "py":
    # print(file_name, "is a python file.")

    # Execute the file being passed in.
    exec(open(file_name).read())

else:
    print("Improper file type (.py only).")


'''
import subprocess
subprocess.run(["ls", "-l"])
or other methods in this link \/
https://stackoverflow.com/questions/89228/how-to-execute-a-program-or-call-a-system-command
'''
