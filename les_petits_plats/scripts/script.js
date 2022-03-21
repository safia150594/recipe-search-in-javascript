let arrofRecipes = [];
let arrIngredienst = [];
let arrUstensils = [];
let arrAppliance = [];
let arrSelectedIngredients = [];
let arrSelectedUstensils = [];
let arrSelectedAppliance = [];
let arrofFilterRecipes = [];
let arrFilterJson = {
    ingredients: arrSelectedIngredients,
    appliance: arrSelectedAppliance,
    ustensils: arrSelectedUstensils,
}
// JSON Array
function setArrayOfRecipes(recipes) {
    arrofRecipes = recipes;
}

//Unique Array
function getUnique(arrofRecipes) {
    arrofRecipes.forEach(arr => {
        if (arrAppliance.indexOf(arr.appliance) === -1) {
            arrAppliance.push(arr.appliance);
        }
        // if(arrUstensils.indexOf(arr.ustensils) === -1){
        //     arrUstensils.push(...arr.ustensils);
        //     let uniqueChars = [...new Set(arrUstensils)];
        //     console.log(uniqueChars.length);

        // }
        arr.ustensils.map((ustensil) => {
            if (!arrUstensils.includes(ustensil)) {
                arrUstensils.push(ustensil);
            };

        });
        arr.ingredients.forEach(ingridents => {
            if (arrIngredienst.indexOf(ingridents.ingredient) === -1) {
                arrIngredienst.push(ingridents.ingredient);
            }
        });
    });
}

function menuListDisplay() {
    document.getElementById('contentImg').innerHTML = `
${arrofRecipes.map(function (food) {
        var arrfood = food.ingredients;
        return `
    <div class="col-4 py-1 cardDisplay " id="card-${food.id}" >
<div class="card-deck">
    <div class="card">
        <img class="card-img-top" src="./assets/img/bg-recipe.png" alt="Card image cap">
        <div class="card-body">
            <div class="card-title">
                <div class="row">
                    <div class="col-8 recipeNames">${food.name}</div>
                    <div class="col-4 text-right recipeNames"><img src="./assets/img/clock-icon.png"> ${food.time} min</div>
                </div>
            </div>
            <div class="card-text py-3">
                <div class="row">               
                    <div class="col-6 recipeDetails">
                    ${arrfood.map(function (x) {
            return `
                        <span><b>${x.ingredient ? x.ingredient : ''}:</b> ${x.quantity ? x.quantity : ''}${x.unit ? x.unit : ''}</span><br>                    
                    `}).join('')}   
                 </div>                
                    <div class="col-6"><p class="recipeDetails">${food.description}</p></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    `
    }).join('')}
`
}
function toggle(toggleSrcRecipes, ulId) {
    var toggelForm = document.getElementById(toggleSrcRecipes);
    var toggleIngredients = document.getElementById(ulId);
    // console.log(toggelForm);
    if (toggelForm.getAttribute("src") == "./assets/img/dropdown-icon-down.png") {
        toggelForm.src = "./assets/img/dropdown-icon-up.png";
        toggleIngredients.style.display = "block";
    } else if (toggelForm.getAttribute("src") == "./assets/img/dropdown-icon-up.png") {
        toggelForm.src = "./assets/img/dropdown-icon-down.png";
        toggleIngredients.style.display = "none";

    }
}
function filterAllByText() {
    var inputSearch;
    inputSearch = document.getElementById("inputSearchAll").value;
    inputSearch = inputSearch.toLowerCase();
    arrofFilterRecipes = [];
    let searchArrayList = [];
    if (inputSearch.length < 2 && arrFilterJson.ingredients.length == 0 && arrFilterJson.appliance.length == 0 && arrFilterJson.ustensils.length == 0) {
        arrofFilterRecipes = arrofRecipes;
    }
    if (inputSearch.length > 2) {
        arrofRecipes.forEach(arr => {
            if (arr.name.toLowerCase().includes(inputSearch) || arr.appliance.toLowerCase().includes(inputSearch) || arr.ustensils.some(item => item.toLowerCase().includes(inputSearch))) {
                searchArrayList.push(arr);
            } else {
                arr.ingredients.forEach(ingredient => {
                    if (ingredient.ingredient.toLowerCase().includes(inputSearch)) {
                        searchArrayList.push(arr);
                    }
                });
            }
        });
        if (arrFilterJson.ingredients.length == 0 && arrFilterJson.appliance.length == 0 && arrFilterJson.ustensils.length == 0) {
            arrofFilterRecipes = searchArrayList;
        }
        // if(arrFilterJson.ingredients.length > 0 && arrFilterJson.ingredients.length > 0 && arrFilterJson.ustensils.length > 0){

        // }
    }

    if (arrFilterJson.ingredients.length > 0 && arrFilterJson.appliance.length == 0 && arrFilterJson.ustensils.length == 0) {
        let currentArray = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArray = searchArrayList;
        }
        currentArray.forEach(arr => {
            arr.ingredients.forEach(ingredient => {
                arrSelectedIngredients.forEach(selectedItem => {
                    if (selectedItem == ingredient.ingredient) {
                        arrofFilterRecipes.push(arr);
                    }
                });
            });
        });
    } else if (arrFilterJson.ingredients.length == 0 && arrFilterJson.appliance.length > 0 && arrFilterJson.ustensils.length == 0) {
        console.log('hi');
        let currentArrayApp = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArrayApp = searchArrayList;
        }
        currentArrayApp.forEach(arr => {
            arrSelectedAppliance.forEach(app => {
                console.log(arr.appliance);
                if (app == arr.appliance) {
                    console.log(arr);
                    arrofFilterRecipes.push(arr);
                }
            });
        });
    } else if (arrFilterJson.ingredients.length == 0 && arrFilterJson.appliance.length == 0 && arrFilterJson.ustensils.length > 0) {
        let currentArrayustensils = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArrayustensils = searchArrayList;
        }
        currentArrayustensils.forEach(arr => {
            arr.ustensils.forEach(arrUstensils => {
                arrSelectedUstensils.forEach(ustensils => {
                    console.log(ustensils);
                    if (ustensils == arrUstensils) {
                        console.log(arr);
                        arrofFilterRecipes.push(arr);
                    }
                });
            });

        });
    } else if (arrFilterJson.ingredients.length > 0 && arrFilterJson.appliance.length > 0 && arrFilterJson.ustensils.length > 0) {
        let currentArray = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArray = searchArrayList;
        }
        currentArray.forEach(arr => {
            arr.ingredients.forEach(ingredient => {
                arrSelectedIngredients.forEach(selectedItem => {
                    arrSelectedAppliance.forEach(app => {
                        arrSelectedUstensils.forEach(ustensils => {
                            arr.ustensils.forEach(utensilItem => {
                                if ((selectedItem == ingredient.ingredient) && (arr.appliance == app) && (ustensils == utensilItem)) {
                                    arrofFilterRecipes.push(arr);
                                }
                            });
                            
                        });
                    });

                });
            });
        });
    }
    else if(arrFilterJson.ingredients.length > 0 && arrFilterJson.appliance.length > 0 && arrFilterJson.ustensils.length == 0){
        let currentArray = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArray = searchArrayList;
        }
        currentArray.forEach(arr => {
            arr.ingredients.forEach(ingredient => {
                arrSelectedIngredients.forEach(selectedItem => {
                    arrSelectedAppliance.forEach(app => {
                        if ((selectedItem == ingredient.ingredient) && (arr.appliance == app)) {
                            arrofFilterRecipes.push(arr);
                        }
                    });

                });
            });
        });
    } else if(arrFilterJson.ingredients.length == 0 && arrFilterJson.appliance.length > 0 && arrFilterJson.ustensils.length > 0){
        let currentArray = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArray = searchArrayList;
        }
        currentArray.forEach(arr => {
            arrSelectedAppliance.forEach(app => {
                arrSelectedUstensils.forEach(ustensils => {
                    arr.ustensils.forEach(utensilItem => {
                        if ((arr.appliance == app) && (ustensils == utensilItem)) {
                            arrofFilterRecipes.push(arr);
                        }
                    });
                    
                });
            });
        });
    } else if(arrFilterJson.ingredients.length > 0 && arrFilterJson.appliance.length == 0 && arrFilterJson.ustensils.length > 0){
        let currentArray = arrofRecipes;
        if (inputSearch.length > 2) {
            currentArray = searchArrayList;
        }
        currentArray.forEach(arr => {
            arr.ingredients.forEach(ingredient => {
                arrSelectedIngredients.forEach(selectedItem => {
                    arrSelectedUstensils.forEach(ustensils => {
                        arr.ustensils.forEach(utensilItem => {
                            if ((selectedItem == ingredient.ingredient) && (ustensils == utensilItem)) {
                                arrofFilterRecipes.push(arr);
                            }
                        });
                        
                    });

                });
            });
        });
    }


    var cardDiv = document.getElementsByClassName('cardDisplay');
    // console.log(cardDiv);
    for (let i = 0; i < cardDiv.length; i++) {
        cardDiv[i].style.display = "none";
    }
    arrofFilterRecipes.forEach(element => {
        document.getElementById('card-' + element.id).style.display = "block";
    });
}
function recipeList(liItem) {
    listIndex++;
    liItem.style.pointerEvents = "none";
    // console.log(liItem.parentNode.className);
    if (liItem.parentNode.classList.contains('ingredientsBg')) {
        document.getElementById("tagsList").innerHTML += `
        <button type='button'  class="selectedItems ingredientsBg"><span> ${liItem.innerHTML} </span><img src="./assets/img/remove-icon.png"  onclick="closeItem('${liItem.id}',this)"  alt="Remove icon"></button>
        `
        if (arrSelectedIngredients.indexOf(liItem.innerHTML) === -1) {
            arrSelectedIngredients.push(liItem.innerHTML);
            // console.log(arrSelectedIngredients);
        }
    }

    if (liItem.parentNode.classList.contains('applianceBg')) {
        document.getElementById("tagsList").innerHTML += `
        <button type='button'  class="selectedItems applianceBg"><span> ${liItem.innerHTML} </span><img src="./assets/img/remove-icon.png"  onclick="closeItem('${liItem.id}',this)" alt="Remove icon"></button>
        `
        if (arrSelectedAppliance.indexOf(liItem.innerHTML) === -1) {
            arrSelectedAppliance.push(liItem.innerHTML);
            // console.log(arrSelectedAppliance);
        }
    }
    if (liItem.parentNode.classList.contains('ustensilsBg')) {
        document.getElementById("tagsList").innerHTML += `
        <button type='button'  class="selectedItems ustensilsBg"><span> ${liItem.innerHTML} </span><img src="./assets/img/remove-icon.png"  onclick="closeItem('${liItem.id}',this)" alt="Remove icon"></button>
        `
        if (arrSelectedUstensils.indexOf(liItem.innerHTML) === -1) {
            arrSelectedUstensils.push(liItem.innerHTML);
            // console.log(arrSelectedAppliance);
        }
    }

    // filterCard(liItem.innerHTML);
    // this.filterCardByValue(arrSelectedIngredients);
    filterAllByText();
}
function closeItem(id, selectedBtnItem) {
    var selectedList = document.getElementById(id);
    console.log(selectedList)
    var deletedItem = selectedList.innerHTML;
    selectedList.style.pointerEvents = "auto";
    selectedBtnItem.parentNode.classList.add("displayItemNone");
    if (selectedBtnItem.parentNode.classList.contains('ingredientsBg')) {
        let indexClosedItem = arrSelectedIngredients.indexOf(deletedItem);
        arrSelectedIngredients.splice(indexClosedItem, 1);

    } else if (selectedBtnItem.parentNode.classList.contains('applianceBg')) {
        let indexClosedItem = arrSelectedAppliance.indexOf(deletedItem);
        arrSelectedAppliance.splice(indexClosedItem, 1);
    } else if (selectedBtnItem.parentNode.classList.contains('ustensilsBg')) {
        let indexClosedItem = arrSelectedUstensils.indexOf(deletedItem);
        arrSelectedUstensils.splice(indexClosedItem, 1);
    }
    filterAllByText();
    //   if (arrSelectedIngredients.length === 0) {
    //     this.menuListDisplay();
    // }else{
    //     this.filterCardByValue(arrSelectedIngredients);
    // }
}
// function filterCard(value) {
//     //   var button ,span,getBtnValue;
//     //   getBtnValue=document.getElementById("ingredientLists");
//     //   button=getBtnValue.getElementsByTagName("span").value;
//     //   console.log(button);
//     if (arrSelectedIngredients.indexOf(value) === -1) {
//         arrSelectedIngredients.push(value);
//         console.log(arrSelectedIngredients);
//     }
//     filterAllByText();
// }
// function filterCardByValue(arrSelectedIngredients) {
//     arrofFilterRecipes = [];
//     if (arrSelectedIngredients.length === 0) {
//         this.menuListDisplay();
//         return;
//     }
//     if (arrSelectedIngredients.length > 0) {
//         arrofRecipes.forEach(arr => {
//             arr.ingredients.forEach(ingredient => {

//                 arrSelectedIngredients.forEach(selectedItem => {
//                     if (selectedItem == ingredient.ingredient) {
//                         arrofFilterRecipes.push(arr);
//                     }
//                 });
//             });
//         });
//         var cardDiv = document.getElementsByClassName('cardDisplay');
//         console.log(cardDiv);
//         for (let i = 0; i < cardDiv.length; i++) {
//             cardDiv[i].style.display = "none";
//             console.log(cardDiv[i]);
//         }
//         arrofFilterRecipes.forEach(element => {
//             document.getElementById('card-' + element.id).style.display = "block";
//         });
//     }

//     // cardDiv.style.display="none";
//     // var cardDiv=document.getElementsByClassName('card-')[0];
// }

var listIndex = 0;
function ingredientListDropdown() {
    let text = "";
    arrIngredienst.forEach(item => {
        listIndex++;
        document.getElementById('ingredients').innerHTML =
            text += '<li class="ingredientItem py-4 " id="ingredent-' + listIndex + '" style="pointer-events: auto;" onclick="recipeList(this)">' + item + '</li>';
    });
    text = "";
    listIndex = 0;
    arrAppliance.forEach(item => {
        listIndex++;
        document.getElementById('appliance').innerHTML =
            text += '<li class="applianceItem py-4 " id="appliance-' + listIndex + '" style="pointer-events: auto;" onclick="recipeList(this)">' + item + '</li>';
    });
    text = "";
    listIndex = 0;
    arrUstensils.forEach(item => {
        listIndex++;
        document.getElementById('ustensils').innerHTML =
            text += '<li class="ustensilsItem py-4 " id="ustensils-' + listIndex + '" style="pointer-events: auto;" onclick="recipeList(this)">' + item + '</li>';
    });
}

function inputSearch(inputIdName, inputSearch) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(inputSearch);
    filter = input.value.toUpperCase();
    ul = document.getElementById(inputIdName);
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = ul.getElementsByTagName("li")[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }

}
function init() {
    setArrayOfRecipes(recipesJson);
    getUnique(recipesJson);
    ingredientListDropdown();
    menuListDisplay();
}
init();