// Dialog Box Content
const dialogContent = `

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

        .outlined {
            border: 1px solid;
            padding: 5px;
            margin: 1px;
        }
        .center-align-text {
            text-align: center;
        }

        .container {
            padding: 5px;
        }

    </style>

    <div class="container">
        <div class="outlined">
            <b>Passenger Type: </b>
            <li class="flexrow center-aligned">
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">High</div>
                    <div class="center-align-text"><input name="passengerType" type="radio"  value="high"/></div>
                </div>
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">Middle</div>
                    <div class="center-align-text"><input name="passengerType" type="radio"  value="middle"/></div>
                </div>
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">Basic</div>
                    <div class="center-align-text"><input name="passengerType" type="radio"  value="basic"/></div>
                </div>
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">Low</div>
                    <div class="center-align-text"><input name="passengerType" type="radio" checked="checked" value="low"/></div>
                </div
            </li>
        </div>

        <div class="outlined">
            <b>Skills</b>
            <li class="flexrow center-aligned">
                <div class="input-description">Skill Roll Effect (Broker/Carouse/Streetwise):</div>
                <input class="input-box" id="skillRollEffect" type="number" value="0" />  
            </li>
            <li class="flexrow center-aligned">
            <div class="input-description">Highest Steward Skill on Ship:</div>
                <input class="input-box" id="highestStewardSkill" type="number" value="0" />
            </li>
        </div>

        <div class="outlined">
            <b>Source World</b>
            <li class="flexrow center-aligned">
                <div class="input-description">Source World Population:</div>
                <input class="input-box" id="sourceWorldPopulation" type="text" value="0" />
            </li>
            <li class="flexrow center-aligned"> 
            <div class="input-description">Source Starport Class:</div>
                <input class="input-box" id="sourceStarport" type="text" value="C" />
            </li>
            <li class="flexrow center-aligned">
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">Amber Zone</div>
                    <div class="center-align-text"><input name="sourceZoneType" type="radio"  value="Amber"/></div>
                </div>
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">Red Zone</div>
                    <div class="center-align-text"><input name="sourceZoneType" type="radio"  value="Red"/></div>
                </div>
                <div class="flexcolumn center-aligned">
                    <div class="center-align-text">None</div>
                    <div class="center-align-text"><input name="sourceZoneType" type="radio" checked="checked" value="None"/></div>
                </div>            
            </li>
        </div>

        <div class="outlined">
            <b>Destination World</b>
            <li class="flexrow center-aligned">
                <div class="input-description">Destination World Population:</div>
                <input class="input-box" id="destinationWorldPopulation" type="text" value="0" />
            </li>
            <li class="flexrow center-aligned">
                <div class="input-description">Destination Starport Class:</div>
                <input class="input-box" id="destinationStarport" type="text" value="C" />
            </li>
            <li class="flexrow center-aligned">
            <div class="flexcolumn center-aligned">
                <div class="center-align-text">Amber Zone</div>
                <div class="center-align-text"><input name="destinationZoneType" type="radio"  value="Amber"/></div>
            </div>
            <div class="flexcolumn center-aligned">
                <div class="center-align-text">Red Zone</div>
                <div class="center-align-text"><input name="destinationZoneType" type="radio"  value="Red"/></div>
            </div>
            <div class="flexcolumn center-aligned">
                <div class="center-align-text">None</div>
                <div class="center-align-text"><input name="destinationZoneType" type="radio" checked="checked" value="None"/></div>
            </div>
        </li>
        </div>
        <div class="outlined">
        <b>Configuration</b>
            <li class="flexrow center-aligned">   
                <div class="input-description">Generate Exciting Passengers?:</div>
                <input class="input-box" id="toggleExcitingPassengers" type="checkbox" value=false />  
            </li>
        </div>
    </div>
`;

// Create Dialog Box
new Dialog({
  title: "Traveller Passenger Generator",
  content: dialogContent,
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
        "passengerType": {
            "Effect": "",
            "Value": 0
        },
        "skillRollEffect": {
          "Effect": 0,
          "Value": 0
        },
        "highestStewardSkill": {
          "Effect": 0,
          "Value": 0
        },
        "sourceWorldPopulation": {
          "Effect": "",
          "Value": 0
        },
        "sourceStarport": {
          "Effect": "",
          "Value": 0
        },
        "sourceZoneType": {
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
        "destinationZoneType": {
            "Effect": "",
            "Value": 0
        }
      };

    passengerEffect.passengerType.Effect = String(html.find('input[name="passengerType"]:checked').val()).toUpperCase();

    passengerEffect.skillRollEffect.Effect = Number(html.find("input#skillRollEffect").val());
    passengerEffect.highestStewardSkill.Effect = Number(html.find("input#highestStewardSkill").val());

    passengerEffect.sourceWorldPopulation.Effect = String(html.find("input#sourceWorldPopulation").val()).toUpperCase();
    passengerEffect.sourceStarport.Effect = String(html.find("input#sourceStarport").val()).toUpperCase();
    passengerEffect.sourceZoneType.Effect = String(html.find('input[name="sourceZoneType"]:checked').val()).toUpperCase();

    passengerEffect.destinationWorldPopulation.Effect = String(html.find("input#destinationWorldPopulation").val()).toUpperCase();
    passengerEffect.destinationStarport.Effect = String(html.find("input#destinationStarport").val()).toUpperCase();
    passengerEffect.destinationZoneType.Effect = String(html.find('input[name="destinationZoneType"]:checked').val()).toUpperCase();

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

    // Current World Population
    if (passengerEffect.sourceWorldPopulation.Effect.length != 1) {
        ui.notifications.error(`${passengerEffect.sourceWorldPopulation.Effect} is not a valid Population Code. It must be a single character`);
        return;
    }

    if (!populationRegex.test(passengerEffect.sourceWorldPopulation.Effect)) {
        ui.notifications.error(`World Population must be one of 0 to 9 or A, B, C. ${passengerEffect.sourceWorldPopulation.Effect} is not a valid Population Code`);
        return;
    }

    // Current Star Port
    if (passengerEffect.sourceStarport.Effect.length != 1) {
        ui.notifications.error(`${passengerEffect.sourceStarport.Effect} is not a valid Starport Code. It must be a single character`);
        return;
    }

    if (!starportRegex.test(passengerEffect.sourceStarport.Effect)) {
        ui.notifications.error(`Starport must be one of A, B, C, D, E, X. ${passengerEffect.sourceStarport.Effect} is not a valid Starport Code`);
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

    // Calculate Effect for Passenger Table Lookup

    passengerEffect.skillRollEffect.Value = passengerEffect.skillRollEffect.Effect;
    passengerEffect.highestStewardSkill.Value = passengerEffect.highestStewardSkill.Effect;

    passengerEffect.passengerType.Value = getPassengerTypeEffect(passengerEffect.passengerType.Effect);

    passengerEffect.sourceWorldPopulation.Value = calculatePopulationEffect(passengerEffect.sourceWorldPopulation.Effect);
    passengerEffect.sourceStarport.Value = calculateStarportEffect(passengerEffect.sourceStarport.Effect);
    passengerEffect.sourceZoneType.Value = getZoneTypeEffect(passengerEffect.sourceZoneType.Effect);


    passengerEffect.destinationWorldPopulation.Value = calculatePopulationEffect(passengerEffect.destinationWorldPopulation.Effect);
    passengerEffect.destinationStarport.Value = calculateStarportEffect(passengerEffect.destinationStarport.Effect);
    passengerEffect.destinationZoneType.Value = getZoneTypeEffect(passengerEffect.destinationZoneType.Effect);

    let totalPassengerEffect =   passengerEffect.skillRollEffect.Value +
                        passengerEffect.highestStewardSkill.Value +
                        passengerEffect.passengerType.Value +
                        passengerEffect.sourceWorldPopulation.Value +
                        passengerEffect.sourceStarport.Value +
                        passengerEffect.sourceZoneType.Value +
                        passengerEffect.destinationWorldPopulation.Value +
                        passengerEffect.destinationStarport.Value + 
                        passengerEffect.destinationZoneType.Value;

    // Prepare for Table Lookup
    const tableLookupRoll = await new Roll(`2d6 + ${totalPassengerEffect}`).roll();
    let tableLookupValue = tableLookupRoll.total;


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
                            <br>Passenger Type: ${passengerEffect.passengerType.Effect} (${passengerEffect.passengerType.Value})
                            <br>Source World Population: ${passengerEffect.sourceWorldPopulation.Effect} (${passengerEffect.sourceWorldPopulation.Value})
                            <br>Source Starport Size: ${passengerEffect.sourceStarport.Effect} (${passengerEffect.sourceStarport.Value})
                            <br>Source Zone Type: ${passengerEffect.sourceZoneType.Effect} (${passengerEffect.sourceZoneType.Value})
                            <br>Destination World Population: ${passengerEffect.destinationWorldPopulation.Effect} (${passengerEffect.destinationWorldPopulation.Value})
                            <br>Destination Starport Size: ${passengerEffect.destinationStarport.Effect} (${passengerEffect.destinationStarport.Value})
                            <br>Destination Zone Type: ${passengerEffect.destinationZoneType.Effect} (${passengerEffect.destinationZoneType.Value})
                        </section>`

    // Create Content Output
    let messageTable =  `<section>
                                <p>Passenger Table Effect: ${totalPassengerEffect}
                                <br>Passenger Table Result: ${tableLookupValue}
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

function getPassengerTypeEffect(_passengerType) {
    switch(_passengerType) {
        case "HIGH":
            return -4;
        case "MIDDLE":
            return 0;
        case "BASIC":
            return 0;
        case "LOW":
            return 1;
        default:
            return 0;
    }
}

function getZoneTypeEffect(_zoneType) {
    switch(_zoneType) {
        case "RED":
            return -4;
        case "AMBER":
            return 1;
        case "NONE":
            return 0;
        default:
            return 0;
    }
}