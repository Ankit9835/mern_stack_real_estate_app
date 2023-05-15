import S3 from 'aws-sdk/clients/s3.js'

export const imageUpload = (req,res) => {
    try {
        const { image } = req.body;
        const base64Image = new Buffer.from(
          image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const type = image.split(";")[0].split("/")[1];
        // image params
        const params = {
          Bucket: "real-estate-application-bucket",
          Key: `${nanoid()}.${type}`,
          Body: base64Image,
          ACL: "public-read",
          ContentEncoding: "base64",
          ContentType: `image/${type}`,
        };

        const SESConfig = {
            apiVersion: "2010-12-01",
            accessKeyId: process.env.AWS_ACCESS_KEY,      // should be:  process.env.AWS_ACCESS_ID
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
            region: "ap-southeast-2"
        }

        const AWSS3 = new S3(SESConfig)

        AWSS3.upload(params, (err,data) => {
            if(err){
                console.log(err)
                res.sendStatus(400)
            } else {
                console.log(data)
            }
        })

      } catch (err) {
        console.log(err);
        res.json({ error: "Upload failed. Try again." });
      }
}

