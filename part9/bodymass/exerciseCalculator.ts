
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number | undefined;
    average: number;
  }


export const calculateExercises = (hoursArray: Array<number>, target: number | undefined) : Result=> {



    if (target === 0) throw new Error('Can\'t divide by 0!');
    if(target==undefined) throw new Error('TARGET UNDEFINED');
const periodLength = hoursArray.length;
const trainingDays = hoursArray.filter(day => day>0).length;
const average = hoursArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/hoursArray.length;
let success;
if(average==target){success=true;}
else{success = false;}


let rating;
let ratingDescription;
if(average/target >= 1){
    ratingDescription = "Target reached";
    rating = 3;}
else if(average/target > 0.5){
    ratingDescription = "Could do better";
    rating = 2;}
else{
    ratingDescription = "Get your lazy ass out working";
    rating = 1;}

const result: Result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
};

return result;


};
//console.log(process.argv[2])

try{

let i = 0;
const Allvalues: Array<string> = process.argv.filter(arg => {
    if(i>=2){
        return arg;
    }
    
    i+=1;
    return null;
});
const hoursArray: Array<number> = Allvalues.map(n => Number(n));
const target: number | undefined = hoursArray.pop();
    
if(hoursArray.includes(NaN)){throw new Error('You did not imput numbers correctly!');}
if(Number.isNaN(target)){throw new Error('Target assigned bad value');}
if(hoursArray.length==0){throw new Error('You didnt input enough days');}
console.log(hoursArray);

console.log(calculateExercises(hoursArray,target));

}
catch(error: unknown){
    let errorMessage = 'Something went wrong: ';
    // here we can not use error.message
    if (error instanceof Error) {
      // the type is narrowed and we can refer to error.message
      errorMessage += error.message;
    }
    // here we can not use error.message
  
    console.log(errorMessage);
    
}
