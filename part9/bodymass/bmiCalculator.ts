export const calculateBMI = (height: number, mass: number) : string => {
    height = height/100;
    const BMI =  mass/(height*height);
    if(BMI<18.5){
  
        return "Underweight";}
    else if(BMI<22.9){

        return "Normal (healthy weight)";}

    else if(BMI<27.4){
        
        return "Mild to moderate overweight";}
    else {
        
        return "Very overweight to obese";}

  };
  


  try{
  const height: number = Number(process.argv[2]);
  const mass: number = Number(process.argv[3]);


  if(!height){throw new Error('you didnt insert height');}
  if(!mass){throw new Error('you didnt insert mass');}
  if(Number.isNaN(height) || Number.isNaN(mass)){throw new Error('mass and height needs to be a number');}


  console.log(calculateBMI(height, mass));
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

export default "I dont know what I am doing";