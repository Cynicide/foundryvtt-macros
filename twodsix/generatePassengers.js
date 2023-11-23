// Dialog Box Content
const myContent = `

    <style>
        .input-box {
            flex: 0 0 3.875rem;
            display: flex;
            flex-direction: column;
            width: 3.875rem;
            overflow-y: auto;
            overflow-x: hidden;
            margin-left: .5rem;
            padding: 0 .5rem;
            justify-content: flex-end
        }

        .input-description {
            display: flex;
            flex-direction: column;
            justify-content: flex-start
        }

        .center-aligned {
            align-items: center
        }

    </style>

    <div>
        <li class="flexrow center-aligned">
            <div class="input-description">Skill Roll Effect (Broker/Carouse/Streetwise):</div>
            <input class="input-box" id="skillRollEffect" type="number" value="0" />  
        </li>
        <li class="flexrow center-aligned">
        <div class="input-description">Highest Steward Skill on Ship:</div>
            <input class="input-box" id="highestStewardSkill" type="number" value="0" />
        </li>
    </div>

    <div>
        <li class="flexrow center-aligned">
            <div class="input-description">High Passengers:</div>
            <input class="input-box" id="highPassengers" type="checkbox" value=false />
        </li>
        <li class="flexrow center-aligned">
            <div class="input-description">Low Passengers:</div>
            <input class="input-box" id="lowPassengers" type="checkbox" value=false />
        </li>
    </div>

    <div>
        <li class="flexrow center-aligned">
            <div class="input-description">Current World Population:</div>
            <input class="input-box" id="currentWorldPopulation" type="text" value="0" />
        </li>
        <li class="flexrow center-aligned"> 
        <div class="input-description">Current Starport Class:</div>
            <input class="input-box" id="currentStarport" type="text" value="C" />
        </li>
    </div>

    <div>
        <li class="flexrow center-aligned">
            <div class="input-description">Destination World Population:</div>
            <input class="input-box" id="destinationWorldPopulation" type="text" value="0" />
        </li>
        <li class="flexrow center-aligned">
            <div class="input-description">Destination Starport Class:</div>
            <input class="input-box" id="destinationStarport" type="text" value="C" />
        </li>
    </div>

    <div>
            <li class="flexrow center-aligned">   
                <div class="input-description">Amber Zone:</div>
                <input class="input-box" id="amberZone" type="checkbox" value=false />  
            </li>
            <li class="flexrow center-aligned">
                <div class="input-description">Red Zone:</div>
                <input class="input-box" id="redZone" type="checkbox" value=false />
            </li>
    </div>
    <br>
    <div>
        <li class="flexrow center-aligned">   
            <div class="input-description">Generate Exciting Passengers?:</div>
            <input class="input-box" id="toggleExcitingPassengers" type="checkbox" value=false />  
        </li>
    </div>
`;

// Create Dialog Box
new Dialog({
  title: "Traveller Passenger Generator",
  content: myContent,
  buttons: {
    button1: {
      label: "Generate",
      callback: (html) => generatePassengers(html),
      icon: `<i class="fas fa-check"></i>`
    }
  }
}).render(true);

// Function to Generate Passengers
async function generatePassengers(html) {

    // Get Submission Data
    const passengerEffect = {
        "skillRollEffect": {
          "Effect": 0,
          "Value": 0
        },
        "highestStewardSkill": {
          "Effect": 0,
          "Value": 0
        },
        "highPassengers": {
          "Effect": false,
          "Value": 0
        },
        "lowPassengers": {
          "Effect": false,
          "Value": 0
        },
        "currentWorldPopulation": {
          "Effect": "",
          "Value": 0
        },
        "currentStarport": {
          "Effect": "",
          "Value": 0
        },
        "destinationWorldPopulation": {
          "Effect": "",
          "Value": 0
        },
        "destinationStarport": {
          "Effect": "",
          "Value": 0
        },
        "amberZone": {
          "Effect": false,
          "Value": 0
        },
        "redZone": {
          "Effect": false,
          "Value": 0
        }
      };

    passengerEffect.skillRollEffect.Effect = Number(html.find("input#skillRollEffect").val());
    passengerEffect.highestStewardSkill.Effect = Number(html.find("input#highestStewardSkill").val());

    passengerEffect.highPassengers.Effect = html[0].querySelector("input#highPassengers").checked;
    passengerEffect.lowPassengers.Effect = html[0].querySelector("input#lowPassengers").checked;

    passengerEffect.currentWorldPopulation.Effect = String(html.find("input#currentWorldPopulation").val()).toUpperCase();
    passengerEffect.currentStarport.Effect = String(html.find("input#currentStarport").val()).toUpperCase();

    passengerEffect.destinationWorldPopulation.Effect = String(html.find("input#destinationWorldPopulation").val()).toUpperCase();
    passengerEffect.destinationStarport.Effect = String(html.find("input#destinationStarport").val()).toUpperCase();

    passengerEffect.amberZone.Effect = html[0].querySelector("input#amberZone").checked;
    passengerEffect.redZone.Effect = html[0].querySelector("input#redZone").checked;

    const toggleExcitingPassengers = html[0].querySelector("input#toggleExcitingPassengers").checked; 

    // Define Regexes for testing input
    const starportRegex = /[ABCDEX]/;
    const populationRegex = /[0-9ABC]/;

    // Check and Clean Data

    // Player Skills
    if (!Number.isInteger(passengerEffect.skillRollEffect.Effect)) {
        ui.notifications.error(`${passengerEffect.skillRollEffect.Effect} is not a valid Skill Roll Effect`);
        return;
    }

    if (!Number.isInteger(passengerEffect.highestStewardSkill.Effect)) {
        ui.notifications.error(`${passengerEffect.highestStewardSkill.Effect} is not a valid Steward Rank`);
        return;
    }

    //Passenger Types

    if (passengerEffect.highPassengers.Effect === true && passengerEffect.lowPassengers.Effect === true) {
        ui.notifications.error(`High and Low Passengers cannot be selected at the same time`);
        return;
    }

    // Current World Population
    if (passengerEffect.currentWorldPopulation.Effect.length != 1) {
        ui.notifications.error(`${passengerEffect.currentWorldPopulation.Effect} is not a valid Population Code. It must be a single character`);
        return;
    }

    if (!populationRegex.test(passengerEffect.currentWorldPopulation.Effect)) {
        ui.notifications.error(`World Population must be one of 0 to 9 or A, B, C. ${passengerEffect.currentWorldPopulation.Effect} is not a valid Population Code`);
        return;
    }

    // Current Star Port
    if (passengerEffect.currentStarport.Effect.length != 1) {
        ui.notifications.error(`${passengerEffect.currentStarport.Effect} is not a valid Starport Code. It must be a single character`);
        return;
    }

    if (!starportRegex.test(passengerEffect.currentStarport.Effect)) {
        ui.notifications.error(`Starport must be one of A, B, C, D, E, X. ${passengerEffect.currentStarport.Effect} is not a valid Starport Code`);
        return;
    }

    // Destination World Population
    if (passengerEffect.destinationWorldPopulation.Effect.length != 1) {
        ui.notifications.error(`${passengerEffect.destinationWorldPopulation.Effect} is not a valid Population Code. It must be a single character`);
        return;
    }

    if (!populationRegex.test(passengerEffect.destinationWorldPopulation.Effect)) {
        ui.notifications.error(`World Population must be one of 0 to 9 or A, B, C. ${passengerEffect.destinationWorldPopulation.Effect} is not a valid Population Code`);
        return;
    }

    // Destination Star Port
    if (passengerEffect.destinationStarport.Effect.length != 1) {
        ui.notifications.error(`${passengerEffect.destinationStarport.Effect} is not a valid Starport Code. It must be a single character`);
        return;
    }

    if (!starportRegex.test(passengerEffect.destinationStarport.Effect)) {
        ui.notifications.error(`Starport must be one of A, B, C, D, E, X. ${passengerEffect.destinationStarport.Effect} is not a valid Starport Code`);
        return;
    }

    //Amber and Red Zone

    if (passengerEffect.amberZone.Effect === true && passengerEffect.redZone.Effect === true) {
        ui.notifications.error(`Amber and Red Zones cannot both be selected`);
        return;
    }

    // Calculate Effect for Passenger Table Lookup

    passengerEffect.skillRollEffect.Value = passengerEffect.skillRollEffect.Effect;
    passengerEffect.highestStewardSkill.Value = passengerEffect.highestStewardSkill.Effect;

    if (passengerEffect.highPassengers.Effect === true) {
        passengerEffect.highPassengers.Value = -4;
    }

    if (passengerEffect.lowPassengers.Effect === true) {
        passengerEffect.lowPassengers.Value = 1;
    }

    passengerEffect.currentWorldPopulation.Value = calculatePopulationEffect(passengerEffect.currentWorldPopulation.Effect);
    passengerEffect.currentStarport.Value = calculateStarportEffect(passengerEffect.currentStarport.Effect);

    passengerEffect.destinationWorldPopulation.Value = calculatePopulationEffect(passengerEffect.destinationWorldPopulation.Effect);
    passengerEffect.destinationStarport.Value = calculateStarportEffect(passengerEffect.destinationStarport.Effect);

    if (passengerEffect.amberZone.Effect === true) {
        passengerEffect.amberZone.Value = 1;
    }

    if (passengerEffect.redZone.Effect === true) {
        passengerEffect.redZone.Value = -4;
    }

    let totalPassengerEffect =   passengerEffect.skillRollEffect.Value +
                        passengerEffect.highestStewardSkill.Value +
                        passengerEffect.highPassengers.Value +
                        passengerEffect.lowPassengers.Value +
                        passengerEffect.currentWorldPopulation.Value +
                        passengerEffect.currentStarport.Value +
                        passengerEffect.destinationWorldPopulation.Value +
                        passengerEffect.destinationStarport.Value +
                        passengerEffect.amberZone.Value +
                        passengerEffect.redZone.Value

    // Prepare for Table Lookup
    let tableLookupValue = totalPassengerEffect;

    // Clamp Values to table bounds
    if (tableLookupValue < 1) {
        tableLookupValue = 1;
    }

    if (tableLookupValue > 20) {
        tableLookupValue = 20;
    }
    // Lookup Table
    let tableResult = game.tables.getName("Passengers").getResultsForRoll(tableLookupValue)[0].text

    // Generate Passengers
    let passengerResult = await getPassengerResults(tableResult)

    // In order to hide and show divs with expand this HTML must be in the message flavor property
    let messageFlavor = `
                        <b><h2>Passengers</h2></b><p>
                            
                        <section class="card-buttons">
                            <button data-action="expand" data-tooltip="${game.i18n.localize("TWODSIX.Rolls.ToggleDetails")}">
                                View Modifiers
                            </button>
                        </section>
                        <section class="dice-chattip" style="display: none">
                            <br>Skill Roll Effect: ${passengerEffect.skillRollEffect.Effect} (${passengerEffect.skillRollEffect.Value})
                            <br>Highest Steward Skill: ${passengerEffect.highestStewardSkill.Effect} (${passengerEffect.highestStewardSkill.Value})
                            <br>High Passengers: ${passengerEffect.highPassengers.Effect} (${passengerEffect.highPassengers.Value})
                            <br>Low Passengers: ${passengerEffect.lowPassengers.Effect} (${passengerEffect.lowPassengers.Value})
                            <br>Current World Population: ${passengerEffect.currentWorldPopulation.Effect} (${passengerEffect.currentWorldPopulation.Value})
                            <br>Curret Starport Size: ${passengerEffect.currentStarport.Effect} (${passengerEffect.currentStarport.Value})
                            <br>Destination World Population: ${passengerEffect.destinationWorldPopulation.Effect} (${passengerEffect.destinationWorldPopulation.Value})
                            <br>Destination Starport Size: ${passengerEffect.destinationStarport.Effect} (${passengerEffect.destinationStarport.Value})
                            <br>Amber Zone: ${passengerEffect.amberZone.Effect} (${passengerEffect.amberZone.Value})
                            <br>Red Zone: ${passengerEffect.redZone.Effect} (${passengerEffect.redZone.Value})
                        </section>`

    // Create Content Output
    let messageTable =  `<section>
                                <p>Passenger Table Effect: ${totalPassengerEffect}
                                <br>Table Result: ${tableResult}
                                <p><b>Total Passengers: ${passengerResult} </b>
                            </section>
                        `;                       
    
    // Generate Exciting Passengers
    if (toggleExcitingPassengers === true) {
        let passengerArray = await generateExcitingPassengers(passengerResult)

        // Dedupe array
        let cleanedArray = [...new Set(passengerArray)] 

        // Append to Chat Output
        messageTable = messageTable + ` <section>
        <p>Exciting Passengers: <ul>`;

        for (var i = 0; i < cleanedArray.length; i++) {
            messageTable = messageTable + `<li> ${cleanedArray[i]} </li>`;
        }

        messageTable = messageTable + `</ul></section>`
    }

    // Create Chat Message
    let chatData = {
        user: game.user._id,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        speaker: ChatMessage.getSpeaker(),
        content: messageTable,
        flavor: messageFlavor,
        whisper: game.users.filter(u => u.isGM).map(u => u._id)
    };
    message = await ChatMessage.create(chatData, {});
    console.log(message)
}

function calculatePopulationEffect(population) {
    populationEffect = 0;

    switch(population) {
        default:
            ui.notifications.error(`World Population not in range: ${population}`);
            return;
        case "0":
            populationEffect = -4;
            break;
        case "1":
            populationEffect = -4;
            break;
        case "2":
            populationEffect = 0;
            break;
        case "3":
            populationEffect = 0;
            break;
        case "4":
            populationEffect = 0;
            break;
        case "5":
            populationEffect = 0;
            break;
        case "6":
            populationEffect = 1;
            break;
        case "7":
            populationEffect = 1;
            break;
        case "8":
            populationEffect = 3;
            break;
        case "9":
            populationEffect = 3;
            break;
        case "A":
            populationEffect = 3;
            break;
        case "B":
            populationEffect = 3;
            break;
        case "C":
            populationEffect = 3;
            break;
    }

    return populationEffect;
}

function calculateStarportEffect(starport) {
    starportEffect = 0;

    switch(starport) {
        default:
            ui.notifications.error(`Starport Class not in range: ${starport}`);
            return;
        case "A":
            starportEffect = 2;
            break;
        case "B":
            starportEffect = 1;
            break;
        case "C":
            starportEffect = 0;
            break;
        case "D":
            starportEffect = 0;
            break;
        case "E":
            starportEffect = -1;
            break;
        case "X":
            starportEffect = -3;
            break;
    }
    return starportEffect;
}

async function getPassengerResults(tableResult) {

    if (tableResult == "0") {
        return 0;
    }

    numberOfDice = tableResult.replace('D', '');
    const passengerRoll = await new Roll(`${numberOfDice}d6`).roll();

    return passengerRoll.result
}
async function generateExcitingPassengers(count) {
    table = game.tables.getName("Exciting Passengers")
    let passengers = []

    for (i = 1; i <= count; i++) {
        let roll = await table.roll();
        passengers.push(roll.results[0].text)
    }

    return passengers;
}