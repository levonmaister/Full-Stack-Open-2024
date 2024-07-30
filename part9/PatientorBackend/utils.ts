import { NewPatientEntry } from "./types"
import { Gender, Entry } from "./types";


const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};


const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect weather: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
  };

const parseName = (name: unknown): string => {
  if(!isString(name)){
    throw new Error('Incorrect name: ' + name);
  }
return name;
}

const parseOccupation = (occupation: unknown): string => {
  if(!isString(occupation)){
    throw new Error('Incorrect occupation: ' + occupation);
  }
return occupation;
}

const parseSSN = (ssn: unknown): string => {
  if(!isString(ssn)){
    throw new Error('Incorrect ssn: ' + ssn);
  }
return ssn;
}

function parseEntry(_data: any): Entry[] {

  return {} as Entry[];
}



const toNewPatientEntry = (object: unknown): NewPatientEntry => {
   

    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
      
    
    
if('entries' in object && 'name' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'dateOfBirth' in object){
    if(!object.name || !object.ssn || !object.occupation){throw new Error('Incorrect data: a field missing')} 
  const newPatient = {
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: parseEntry(object.entries)
    };

    return newPatient;
}


throw new Error('Incorrect data: a field missing');
}


export default toNewPatientEntry