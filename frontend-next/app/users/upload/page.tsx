'use client'

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import API_URL from "../../config/api.ts"


function UploadPage() {
  const onDrop = useCallback(acceptedFiles =>  {

      console.log("file uploaded")
      console.log(acceptedFiles);

      var file1 = acceptedFiles[0];

      let res =  fetch(
          `${API_URL}/student/upload/${file1.name}`,
          {
            method: 'POST',
            headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzODI0MTM2LCJpYXQiOjE3MDM4MTY5MzYsImp0aSI6IjI3YTFhNWFiZDgxOTRjODFiNTEzNTJhOGJlMzg3YjdjIiwidXNlcl9pZCI6NH0.f2wFJ7ts6MKOqcdJg2ZRPxiG2CuGmCBCXTDAOuAiXco',
                    'Content-Type': 'multipart/form-data'
            },
            body: {"file": file1}
          }
          )
      console.log(res);
   
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>

    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2> Upload Files </h2>
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>

    </div>

    
    </>
  )
}

export default UploadPage
