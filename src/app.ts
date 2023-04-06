import 'express-async-errors';
import express from 'express';
import routes from './routes/index.js';
import { handleApplicationErrors } from './middlewares/handleApplicationErrors.js';

const app: any = express();
const PORT: number = 5000;

app.use(express.json());
app.use(routes);
app.use(handleApplicationErrors);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));