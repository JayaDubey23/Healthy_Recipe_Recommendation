// function for filter 
document.getElementById("search").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let cards = document.querySelectorAll("#recipesContainer #card");

    cards.forEach(card => {
        let recipeName = card.querySelector("h3").innerText.toLowerCase();
        if (recipeName.includes(searchValue)) {
            card.style.display = "block"; // show card
        } else {
            card.style.display = "none"; // hide card
        }
    });
});

// function for card

let totalFavCalories = 0;
function clickForm(){
    let RecipeName = document.getElementById("recipeName").value;
    let IngredientsName = document.getElementById("recipeIngredient").value;
    let CaloriesValue = document.getElementById("recipeCalories").value;

    if(RecipeName === "" || IngredientsName === "" || CaloriesValue === "") {
     alert("Fill all the fields!");
     return;   
    }

    // Data Stored in LocalStorage
    let mydata = JSON.parse(localStorage.getItem("data")) || [];

    let obj={
        RecipeName,
        IngredientsName,
        CaloriesValue
    }
    mydata.push(obj);        

    localStorage.setItem("data", JSON.stringify(mydata));

    let divContainer = document.getElementById("recipesContainer");

    // card
    let card = document.createElement("div");
    card.id = "card";
    divContainer.appendChild(card);

    // card head
    let cardHead = document.createElement("h3");
    cardHead.id = "head";
    cardHead.innerText = `🍲 ${RecipeName}`;
    card.appendChild(cardHead);

    // ingredients
    let ingredients = document.createElement("p");
    ingredients.className= "para";
    ingredients.innerHTML = `<b style="color:black;">📝 Ingredients: </b> ${IngredientsName}`;
    card.appendChild(ingredients);

    // calories
    let calories = document.createElement("p");
    calories.className = "para";
    calories.innerHTML = `<b style="color:black;">🔥 Calories: </b>${CaloriesValue}`;
    card.appendChild(calories);

    // action buttons
    let btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "10px";

    let starBtn = document.createElement("button");
    starBtn.innerHTML = "⭐";
    starBtn.id = "star"
    starBtn.className = "btnBtn";

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.id = "edit";
    editBtn.className = "btnBtn";


    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.id = "dustbin";
    deleteBtn.className = "btnBtn";

    btnContainer.appendChild(starBtn);
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    card.appendChild(btnContainer);

    // Star Button Functionality
    let isStarred = false;
    starBtn.addEventListener("click", () => {
        isStarred = !isStarred; // 

        if (isStarred) {
            card.style.border = "5px solid yellow";
            card.style.color = "black";
            card.addEventListener("mouseenter", hoverIn);
            card.addEventListener("mouseleave", hoverOut);
            
            // FavoirateCaloryAdd
            totalFavCalories += parseInt(CaloriesValue);

        } 
        else {
            card.style.border = "1px solid gray"; // reset
            card.style.backgroundColor = "white";
            card.style.color = "black";

            card.removeEventListener("mouseenter", hoverIn);
            card.removeEventListener("mouseleave", hoverOut);

            // FavoirateCalorySubstrac
            totalFavCalories -= parseInt(CaloriesValue);
        }
        document.getElementById("totalFavCalories").innerText = `Total Favorite Calories:  ${totalFavCalories}`
    });

    // Define hover functions separately
    function hoverIn() {
        card.style.border = "5px solid black";
        card.style.color = "black";
        card.style.backgroundColor = "yellow";
    }
    
    function hoverOut() {
        card.style.border = "5px solid yellow";
        card.style.color = "black";
        card.style.backgroundColor = "white";
    }

    // Delete Button Functionality
    deleteBtn.addEventListener("click", () => {
        card.remove();
    })

    // Edit Button Functionality
    editBtn.addEventListener("click", ()=>{
        let editeRecipyName = prompt("Edit Recipe Name: ");
        let editeIngredientName = prompt("Edit Infredients Name: ");
        let editeCaloriesNumber = Number(prompt("Edit Calories Quantities: "));

        if(isNaN(editeCaloriesNumber)){
            alert("Please enter a valid number!");
        };

        cardHead.innerText = editeRecipyName;
        ingredients.innerHTML = `<b style="color:black;"> 📝 Ingredients: </b>${editeIngredientName}`;
        calories.innerHTML = `<b style="color:black;"> 🔥 Calories: </b>${editeCaloriesNumber}`;
    })  
}
