/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import {  Entry } from '../types';
import toNewPatientEntry from '../utils'

const router = express.Router();


router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
  });
  
  
  router.get('/:id', (_req,res) => {
    const id = _req.params.id;
    console.log(patientService.getPatient(id))
    res.send(patientService.getPatient(id))
  })
  
  
  router.post('/', (req,res)=> {
  
  try{
     
    const  {date, occupation, dateOfBirth, name, ssn, gender} = req.body
  
    const entry: Entry = {
    id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
    date: '2019-10-20',
    specialist: 'MD House',
    type: 'HealthCheck',
    description: 'Yearly control visit. Cholesterol levels back to normal.',
    healthCheckRating: 0,
    };
  
    const object: object = {
      date: date,
      occupation: occupation,
      dateOfBirth: dateOfBirth,
      name: name,
      ssn: ssn,
      gender: gender,
      entries: entry
    };
    
  
      const newPatientEntry = toNewPatientEntry(object)
  
     const NewPatientObject = patientService.addPatient(newPatientEntry);
  
      res.send(NewPatientObject);
  }
  catch(error: unknown){
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
  }
  })
  
  
  export default router;