import { connect, Mongoose } from "mongoose";

(async () => {
  try {
    const db = await connect(
      "mongodb+srv://cgnuno:C3sar1002*@cluster0.kpqh9ex.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch(error) {
    console.log(error);
  }
})();
