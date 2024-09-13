export class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
export const errorHandle = async (err, req, res) => {
    if (err instanceof ErrorHandler) {
        err.message ||= "internal server error";
        err.statusCode ||= 500;
        res.json({
        sucess:false,
        message:err.message
     }).status(err.statusCode)
    } else {
        res.json({
            sucess:false,
            message:"internal serve error"
         }).status(500)
    }
  };