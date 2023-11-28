from student import StudentDetail


# Reading from a file
with open("student.txt", "r") as file_object:
	file_contents = file_object.read()
	print(file_contents)

# Writing to a file
with open("student.txt", "w") as file_object:
	file_object.write("updated file")

# Appending/updating to file
with open("student.txt", "a") as file_object:
	file_object.write("\nthis is another line")
