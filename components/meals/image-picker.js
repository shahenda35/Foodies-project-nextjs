'use client' //we add it due to the function 
import Image from 'next/image';
import classes from './image-picker.module.css'
import {useRef , useState} from 'react'
export default function ImagePicker({label ,name}){
    const [pickImage , setPickImage] = useState();
    const imageInput = useRef()

    function handleClick () {
        imageInput.current.click()
    } 

    function handleImageChange (e) {
        const file = e.target.files[0];

        if (!file) { setPickImage(null) ; return} ;

        const fileReader =new FileReader()
        
        fileReader.onload = (url) => {
            setPickImage(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }

    return( 
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickImage && <p>Please pick an image</p>}
                    {pickImage && <Image src={pickImage} alt="image selected by user" fill/>}
                </div>
                <input className={classes.input} type="file" id={name} accept="image/png , image/jpeg" name={name} ref={imageInput} onChange={handleImageChange} required />
                <button className={classes.button} type="button" onClick={handleClick}>Pick an Image</button>
            </div>
        </div>
    )
}