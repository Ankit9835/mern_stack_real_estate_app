import React from 'react'
import Resizer from "react-image-file-resizer";
import axios from "axios";

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
  </>
  )
}

export default UploadPhoto
