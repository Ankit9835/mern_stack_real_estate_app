import React from 'react'
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

const UploadPhoto = ({ad,setAd}) => {

 const handleUpload = async (e) => {
    try {
        let files = e.target.files
        files = [...files]
        if(files?.length){
            console.log('files',files)
            setAd({...ad, uploading:true})

            files.map((file) => {
                new Promise(() => {
                  Resizer.imageFileResizer(
                    file,
                    1080,
                    720,
                    "JPEG",
                    100,
                    0,
                    async (uri) => {
                      try {
                        // console.log("UPLOAD URI => ", uri);
                        const { data } = await axios.post("/upload-image", {
                          image: uri,

                        });
                        setAd((prev) => ({
                          ...prev,
                          photos: [data, ...prev.photos],
                          uploading: false,
                        }));
                      } catch (err) {
                        console.log(err);
                        setAd({ ...ad, uploading: false });
                      }
                    },
                    "base64"
                  );
                });
             });

        } else {
            setAd({...ad, uploading:false})
        }
    } catch (error) {
        console.log(error)
    }
 }

 const removeImage = async (file) => {
    const test = window.confirm('Are you sure you want to remove this image')
    if(!test) return
    try {
        setAd({...ad, uploading:true})
        const {data} = await axios.post('/remove-image', file)
        setAd({...ad, uploading:false}) 
    } catch (error) {
        console.log(error)
        setAd({...ad,uploading:false})
    }
 }

  return (
    <>
    <label className="btn btn-secondary mb-4">
      {ad.uploading ? "Processing..." : "Upload photos"}
      <input
        onChange={handleUpload}
        type="file"
        accecp="image/*"
        multiple
        hidden
      />
    </label>
    {ad.photos?.map((file, index) => (<Avatar key={index} src={file?.Location}
          shape="square"
          size="46"
          className="ml-2 mb-4"
          onClick={() => removeImage(file)}
          />) )}
  </>
  )
}

export default UploadPhoto
