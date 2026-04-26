let submitBtn = document.querySelector(".submit-btn");
let is_confident = false;
let newData = {}
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    gender();
});

// Function to get the gender of a name
// Checks if the name is empty
// Checks if the name is a string
// Fetches the gender of the name from the API
// Checks if the probability is greater than 0.7 and the sample size is greater than 100
// Returns a formatted json response
async function gender() {
    const fName = document.getElementById("name").value;
    console.log(fName);
    if (fName === "") {
        newData = {
            status: "error",
            message: "Bad Request"
        }
        console.log(newData);
        return newData;
    }
    else if (typeof fName !== "string") {
        newData = {
            status: "error",
            message: "Unprocessable Entity"
        }
        console.log(newData);
        return newData;
    }
    else{
        try {
            const response = await fetch(`https://api.genderize.io/?name=${fName}`);
            const data = await response.json();
            data['sample_size'] = data['count'];
            delete data['count'];
            console.log(data);
            if(data.gender === null || data.sample_size === 0){
                newData ={
                    status: "error",
                    message: "No prediction available for the provided name"
                }
                console.log(newData);
                return newData;
            }
            else if (data['probability'] > 0.7 && data['sample_size'] > 100) {
                newData = {
                    status: "success",
                    data: {
                        name: data.name,
                        gender: data.gender,
                        probability: data.probability,
                        sample_size: data.sample_size,
                        is_confident: true,
                        processed_at: new Date().toISOString()
                    }
                }
                console.log(newData);
                return newData;
            }
            else{
                newData = {
                    status: "error",
                    message: "Probability is less than 0.7 or sample size is less than 100"
                }
                console.log(newData);
                return newData;
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}

