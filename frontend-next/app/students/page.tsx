import React from 'react'

const StudentPage = async() => {

  // let res = await fetch(
  //   "http://localhost:8000/api/v1/student"
  //   )
  // var students = await res.json();
  // console.log(students)

  let res = await fetch("https://jsonplaceholder.typicode.com/users", { cache: 'no-store' })
  var students = await res.json();
  console.log(students)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Students</h1>

      <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Username</th>
          <th class="py-2 px-4 border-b">Email</th>
        </tr>
      </thead>
      <tbody>
      {students.map((student) => (
        <tr>
          <td class="py-2 px-4 border-b">{student.id}</td>
          <td class="py-2 px-4 border-b">{student.name}</td>
          <td class="py-2 px-4 border-b">{student.username}</td>
          <td class="py-2 px-4 border-b">{student.email}</td>
        </tr>
        ))}
    
      </tbody>
    </table>
 
    </div>
  )
}

export default StudentPage
