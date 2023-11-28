print("hello Future full stack developers !!")

name = "Ram"

print(name)

print(f"My name is {name}")

print("My name is %s"%name)

print("My name is " + name)


age = 29

if age > 22 and age < 30:
	print("Start thinking about career")


if age > 22 or age < 30:
	print("Start thinking about career again..")


# integer
age = 29

# strings
name = "shyam"

# list
fruits = ["apple", "banana", "mango", "strawberry"]
print(fruits)
print(fruits[0])
print(fruits[-1:])

print ( 
	[fruit for fruit in fruits if fruit == "banana"]
)

for fruit in fruits:
	if fruit == "banana":
		print(fruit)


# dictonary
student_1_info = {
	"name":"shyam",
	"age": 22
}
print(student_1_info)
print(student_1_info['age'])

student_2_info = {
	"name":"ram",
	"age": 23
}

students = [
	{"name": "ram", "age": 23, "marks":80},
	{"name": "shyam", "age": 22, "marks":50},
	{"name": "sita", "age": 20, "marks":85},
	{"name": "gita", "age": 21, "marks":25},
]
print(students)
print(len(students))

name_with_age_greater_than_20 = []
for student in students:
	if student['age'] > 20:
		print(student)
		name_with_age_greater_than_20.append(student)

print(name_with_age_greater_than_20)


# print student name who are passed
for student in students:
	if student["marks"] > 40:
		# Student <name> is pass.
		print(f"Student {student['name']} is pass.")
"""
x = 1
y =2
"""

def sum(a, b):
	s = a + b
	return s

print(sum(100, 200))

s = sum(100, 200)
print(s)

# Write a function to add marks of all students
def total_marks(students):
	total = 0
	for student in students:
		total = total + student['marks']

	return total

print(total_marks(students))

# Write a function to get average mark of all students
def average_marks(students):
	average = 0
	total = total_marks(students)
	average = total / len(students)
	return average

print(average_marks(students))

x = 1
y = 0
try:
	print ( x / y)
except Exception as ex:
	print("Error: ", ex)

# Object oriented programming
# File handling
# External libraries
# Web scraping: extracting data from other websites
# 
