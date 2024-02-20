import React, { useState } from 'react'
import { Storage } from './Firebase';
import {ref, uploadBytes , listAll, getDownloadURL} from 'firebase/storage';

function UploadImage() {
  const [Myimage , setMyImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const upload = () => {
    if (Myimage == null){
      alert("There are no file to upload! ")
      
    }else {
      console.log(Myimage)
      const imageRef = ref(Storage,`image/${Myimage.name}`)
      uploadBytes(imageRef, Myimage).then(() => { 
        alert("Image upload")
      })
      
    }
  }
  const listimage= () => {
    const imageRef = ref(Storage,`image`)
    listAll(imageRef).then((res) =>{
      res.items.forEach((itemRef) => {
        console.log(itemRef)
        getDownloadURL(itemRef).then((url) =>{
          setImageList((prev) =>[...prev, url])
        })
      })

    }).catch((error) => {
      alert("there are some error")
    })

  }



  return (
    <div>
      <input type='file' onChange={(event) => setMyImage(event.target.files[0])}/>
      <button onClick={upload}> Upload Image</button>
      <button onClick={listimage}>List Image</button>
      {imageList.map((url, index) => {
       return  <img key={index} src={url} alt='' />
      })}

    </div>
  )
}

export default UploadImage
