import React, { useState } from 'react'
import { Storage } from './Firebase';
import {ref, uploadBytes , listAll, getDownloadURL, deleteObject} from 'firebase/storage';

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
  const listimage = () => {
    const imageRef = ref(Storage,`image`)
    setImageList([]);
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
  
const handeldelete = (url) =>{
  console.log(url);

  deleteObject(ref(Storage, url)).then(() =>{
    alert("file succefully delete")
    listimage();
  }).catch((error) =>{
    alert('somting went wrong');
  })


}


  return (
    <div>
      <input type='file' onChange={(event) => setMyImage(event.target.files[0])}/>
      <button onClick={upload}> Upload Image</button>
      <button onClick={listimage}>List Image</button>
      {imageList.map((url, index) => {
       return (
        <div key={index}> 
          <img src={url} alt='' />
          <button onClick={() => handeldelete(url)}> Delete</button>
        </div>
       ) 
      })}

    </div>
  )
}

export default UploadImage
