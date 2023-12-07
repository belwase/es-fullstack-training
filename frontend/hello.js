//import { sum_two } from './calculation';

// variables

var name = "ram";
var age = 29;

console.log(name);
console.log(age);

typeof(name)
typeof(age)

var is_married = false;

// to define constants
const country_name = 'Nepal';

var a = 5 ;
var b = 8;
var sum  = a + b;
console.log(sum);

if(age > 25){ 
	console.log("seriously think about career");
}

if(age > 25 || age < 30){ 
	console.log("seriously think about career");
}
// And => &&

function sum_numbers(x, y){
	s = x + y;
	return s;
}

console.log(sum_numbers(11, 34))

for(i=0;i<10;i++){
	console.log(i)
}

var counter = 0
while(counter <= 10){
	console.log(counter)
	counter += 1
}

// Creating object
var student = {
    name:"ram", age:22, marks:85
}

// Creating array
students = [
	{"name": "ram", "age": 23, "marks":80},
	{"name": "shyam", "age": 22, "marks":50},
	{"name": "sita", "age": 20, "marks":85},
	{"name": "gita", "age": 21, "marks":25},
]

// To print student with age greater than 20
for(i=0;i<students.length;i++){
	if(students[i].age > 20) { 
		console.log(students[i].name);
	}
}

// To add  total marks of all students
var total_marks=0;
for(i=0;i<students.length;i++){
    total_marks += students[i].marks;
}
console.log(total_marks);

// Normal function
function multiply(a, b){
	m = a * b
	return m
}

// Arrow function
var multiply = (a, b) => a * b;
var multiply = (a, b) => { m = a * b; console.log(m);}
multiply(5, 5);

var getTotalMarks = (students) => { 
	total_marks = 0;
	for(i=0;i<students.length;i++){
    	total_marks += students[i].marks;
    }
    return total_marks;
}

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: "Data fetched successfully!" };
            resolve(data);
        }, 2000);
    });
};

console.log("Getting data...")
fetchData()
    .then((data) => console.log(data.message))
    .catch((error) => console.error(error));

console.log("I'm here")

///// 
// Print starting
// Call get total marks ( async ... )
// Call sum of two numbers ( sync.. )
// Print done

const getTotalMarksAsync = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            total_marks = 0;
			for(i=0;i<students.length;i++){
		    	total_marks += students[i].marks;
		    }
            resolve(total_marks);
        }, 2000);
    });
};

function sum_two(a, b){
	return a + b
}

console.log("Starting...")
getTotalMarksAsync()
    .then((data) => console.log(data))
    .catch((error) => console.error("Error : " + error));

s = sum_two(4, 5)
console.log(s)
console.log("Done")
