import multer from "multer"
const storage=multer.memoryStorage();
export const upload=multer({Storage:storage,limits:1024*256}).single("file")