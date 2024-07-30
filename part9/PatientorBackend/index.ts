/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diagnosisRouter from './routers/diagnosisrouter';
import patientRouter from './routers/patientrouter';

const cors = require('cors')
const app = express();


app.use(cors())
app.use(express.json());


app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientRouter)







const PORT = 3001;







app.get('/api/ping', (_req, res) =>{

    res.status(200).send()
}) 







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});