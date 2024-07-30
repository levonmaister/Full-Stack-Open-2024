import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get("/bmi", (req, res) => {
    try{
    const _height = Number(req.query.height);
    const _weight = Number(req.query.weight);

    

    if(!_height){throw new Error('you didnt insert height');}
    if(!_weight){throw new Error('you didnt insert mass');}
    if(Number.isNaN(_height) || Number.isNaN(_weight)){throw new Error('mass and height needs to be a number');}


    const BMI_EXPRESS = calculateBMI(_height, _weight);

    const _responseData = {
        weight: _weight,
        height: _height,
        bmi: BMI_EXPRESS
    };

    res.json(_responseData);
}

catch(error: unknown){
    

  const  _errorMessage = {error: "Malformatted parameters"};
    // here we can not use error.message
  
    res.json(_errorMessage);
}

});



app.post("/exercises", (req, res) => {
 
    try{

    const {daily_exercises, target} = req.body;



if (!Array.isArray(daily_exercises)){throw new Error('Malformatted parameters');}


if (typeof target !== 'number' || isNaN(target)){throw new Error('malformatted parameters');}

for (const exercise of daily_exercises) {
    if (typeof exercise !== 'number' || isNaN(exercise)) {
        throw new Error('malformatted paramets');
    }
}



    res.json(calculateExercises(daily_exercises, target));
}
catch(error: unknown){
    res.json('parameters missing')
}
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


