// import multer from "multer";

// const storage = multer.memoryStorage();
// const singleUpload =multer({storage}).single("file")






const signUpload = async () => {
    const timestamp = Math.round(newDate() /1000);
    const params = {
        timestamp: timestamp
    };
    const signature = await cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_SECRET);
    return { timestamp, signature };
}
export default signUpload