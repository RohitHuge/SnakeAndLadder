import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';



cloudinary.config({ 
    cloud_name: 'dstevgxwe', 
    api_key: '145798137123186', 
    api_secret: 'Wi2lViTuZY2WyQFdpIP6CD13g-c'
})

  const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log(process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET,"2")
        if (!localFilePath) return console.log("Error in getting file path")
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}
