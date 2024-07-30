import { useParams } from "react-router-dom";
import {Diagnosis, Patient} from "../types"



interface Props {
    patients : Patient[],
    diagnoses: Diagnosis[]
  }



const PatientPage = ({patients, diagnoses}: Props) => {

  const codeDescription = (code: string) : string => {
    const codedescription = diagnoses.filter(diagnose=> diagnose.code==code)
    return codedescription[0].name
}
    console.log(diagnoses)

console.log('PATIENT REQUESTED')
const name = useParams().name

const patientId = patients.filter(patient => patient.name == name)

const RequestedPatient = patientId[0];


return (<div>
    <h2>{RequestedPatient.name}</h2>
    <p>ssn: {RequestedPatient.ssn}</p>
    <p>occupation: {RequestedPatient.occupation}</p>
    <p>Gender: {RequestedPatient.gender}</p>
    <h3>Entries</h3>
    {RequestedPatient.entries.map((entry) => {

      return(
        <div key={entry.id}> 
          <p>{entry.date}    {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {codeDescription(code)}</li>)}
          </ul>
        </div>
      )
    })}
    
</div>)
}


export default PatientPage