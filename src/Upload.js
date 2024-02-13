import React, { useState } from 'react'
import { Storage } from './Firebase';

function UploadImage() {
  const [image , setImage] = useState(null);
  const upload = () => {
    if (image == null){
      alert("There are no file to upload! ")
    
    }else {
      console.log(image)
      
    }
  }



  return (
    <div>
      <input type='file' onChange={(event) => setImage(event.target.files[0])}/>
      <button onClick={upload}> Upload Image</button>

    </div>
  )
}

export default UploadImage
