import app from "./app";
import 'dotenv/config';

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
})

export default server