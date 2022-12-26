import app from './app';
import { NODE_ENV } from './utils/variable';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Tekana back-end listening on port ${PORT} in ${NODE_ENV}`);
});
