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
        <b>Freight Type: </b>
        <li class="flexrow center-aligned">
            <div class="flexcolumn center-aligned">
                <div class="center-align-text">Major</div>
                <div class="center-align-text"><input name="freightType" type="radio"  value="major"/></div>
            </div>
            <div class="flexcolumn center-aligned">
                <div class="center-align-text">Minor</div>
                <div class="center-align-text"><input name="freightType" type="radio"  value="minor"/></div>
            </div>
            <div class="flexcolumn center-aligned">
                <div class="center-align-text">Incidental</div>
                <div class="center-align-text"><input name="freightType" type="radio" checked="checked" value="incidental"/></div>
            </div
        </li>
    </div>

    <div class="outlined">
        <b>Skills</b>
        <li class="flexrow center-aligned">
            <div class="input-description">Skill Roll Effect (Broker/Streetwise):</div>
            <input class="input-box" id="skillRollEffect" type="number" value="0" />  
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
            <div class="input-description">Source Tech Level:</div>
            <input class="input-box" id="sourceTechLevel" type="text" value="8" />
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
            <div class="input-description">Destination Tech Level:</div>
            <input class="input-box" id="destinationTechLevel" type="text" value="8" />
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






</div>
`

// Create Dialog Box
new Dialog({
    title: "Traveller Freight Generator",
    content: dialogContent,
    buttons: {
      button1: {
        label: "Generate",
        callback: (html) => generateFreight(html),
        icon: `<i class="fas fa-check"></i>`
      }
    }
  }).render(true);
  
  // Function to Generate Freight
  async function generateFreight(html) {

    // Get Submission Data
    const freightEffect = {
        "freightType": {
            "Effect": "",
            "Value": 0
        },
        "skillRollEffect": {
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
        "sourceTechLevel": {
            "Effect": 0,
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
        },
        "destinationTechLevel": {
            "Effect": 0,
            "Value": 0
        },
      };



    freightEffect.freightType.Effect = String(html.find('input[name="freightType"]:checked').val()).toUpperCase();

    freightEffect.skillRollEffect.Effect = Number(html.find("input#skillRollEffect").val());

    freightEffect.sourceWorldPopulation.Effect = String(html.find("input#sourceWorldPopulation").val()).toUpperCase();
    freightEffect.sourceStarport.Effect = String(html.find("input#sourceStarport").val()).toUpperCase();
    freightEffect.sourceZoneType.Effect = String(html.find('input[name="sourceZoneType"]:checked').val()).toUpperCase();
    freightEffect.sourceTechLevel.Effect = String(html.find('input#sourceTechLevel').val()).toUpperCase();

    freightEffect.destinationWorldPopulation.Effect = String(html.find("input#destinationWorldPopulation").val()).toUpperCase();
    freightEffect.destinationStarport.Effect = String(html.find("input#destinationStarport").val()).toUpperCase();
    freightEffect.destinationZoneType.Effect = String(html.find('input[name="destinationZoneType"]:checked').val()).toUpperCase();
    freightEffect.destinationTechLevel.Effect = String(html.find('input#destinationTechLevel').val()).toUpperCase();

    // Check and Clean Data

    // Player Skills
    if (!Number.isInteger(freightEffect.skillRollEffect.Effect)) {
        ui.notifications.error(`${freightEffect.skillRollEffect.Effect} is not a valid Skill Roll Effect`);
        return;
    }

    // Source
    if (!validateWorldPopulation(freightEffect.sourceWorldPopulation.Effect)) {
        return;
    }

    if (!validateStarportSize(freightEffect.sourceStarport.Effect)) {
        return;
    }

    if (!validateTechLevel(freightEffect.sourceTechLevel.Effect)) {
        return;
    }
    // Destination
    if (!validateWorldPopulation(freightEffect.destinationWorldPopulation.Effect)) {
        return;
    }

    if (!validateStarportSize(freightEffect.destinationStarport.Effect)) {
        return;
    }

    if (!validateTechLevel(freightEffect.destinationTechLevel.Effect)) {
        return;
    }

    // Calculate Effect for Passenger Table Lookup

    freightEffect.skillRollEffect.Value = freightEffect.skillRollEffect.Effect;
    freightEffect.freightType.Value = getFreightTypeEffect(freightEffect.freightType.Effect);

    freightEffect.sourceWorldPopulation.Value = calculatePopulationEffect(freightEffect.sourceWorldPopulation.Effect);
    freightEffect.sourceStarport.Value = calculateStarportEffect(freightEffect.sourceStarport.Effect);
    freightEffect.sourceZoneType.Value = getZoneTypeEffect(freightEffect.sourceZoneType.Effect);
    freightEffect.sourceTechLevel.Value = calculateTechLevelEffect(freightEffect.sourceTechLevel.Effect);

    freightEffect.destinationWorldPopulation.Value = calculatePopulationEffect(freightEffect.destinationWorldPopulation.Effect);
    freightEffect.destinationStarport.Value = calculateStarportEffect(freightEffect.destinationStarport.Effect);
    freightEffect.destinationZoneType.Value = getZoneTypeEffect(freightEffect.destinationZoneType.Effect);
    freightEffect.destinationTechLevel.Value = calculateTechLevelEffect(freightEffect.destinationTechLevel.Effect);

    let totalFreightEffect =   freightEffect.skillRollEffect.Value +
    freightEffect.freightType.Value +
    freightEffect.sourceWorldPopulation.Value +
    freightEffect.sourceStarport.Value +
    freightEffect.sourceZoneType.Value +
    freightEffect.destinationWorldPopulation.Value +
    freightEffect.destinationStarport.Value +
    freightEffect.destinationZoneType.Value + 
    freightEffect.destinationTechLevel.Value;

    // Prepare for Table Lookup
    const tableLookupRoll = await new Roll(`2d6 + ${totalFreightEffect}`).roll();
    let tableLookupValue = tableLookupRoll.total;

    // Clamp Values to table bounds
    if (tableLookupValue < 1) {
        tableLookupValue = 1;
    }

    if (tableLookupValue > 20) {
        tableLookupValue = 20;
    }

    let tableResult = await game.tables.getName("Freight").getResultsForRoll(tableLookupValue)[0].text

    // In order to hide and show divs with expand this HTML must be in the message flavor property
    let messageFlavor = `
    <b><h2>Freight</h2></b><p>
        
    <section class="card-buttons">
        <button data-action="expand" data-tooltip="${game.i18n.localize("TWODSIX.Rolls.ToggleDetails")}">
            View Modifiers
        </button>
    </section>
    <section class="dice-chattip" style="display: none">
        <br>Skill Roll Effect: ${freightEffect.skillRollEffect.Effect} (${freightEffect.skillRollEffect.Value})
        <br>Freight Type: ${freightEffect.freightType.Effect} (${freightEffect.freightType.Value})
        <br>Source World Population: ${freightEffect.sourceWorldPopulation.Effect} (${freightEffect.sourceWorldPopulation.Value})
        <br>Source Starport Size: ${freightEffect.sourceStarport.Effect} (${freightEffect.sourceStarport.Value})
        <br>Source Zone Type: ${freightEffect.sourceZoneType.Effect} (${freightEffect.sourceZoneType.Value})
        <br>Source Tech Level: ${freightEffect.sourceTechLevel.Effect} (${freightEffect.sourceTechLevel.Value})       
        <br>Destination World Population: ${freightEffect.destinationWorldPopulation.Effect} (${freightEffect.destinationWorldPopulation.Value})
        <br>Destination Starport Size: ${freightEffect.destinationStarport.Effect} (${freightEffect.destinationStarport.Value})
        <br>Destination Zone Type: ${freightEffect.destinationZoneType.Effect} (${freightEffect.destinationZoneType.Value})
        <br>Destination Tech Level: ${freightEffect.destinationTechLevel.Effect} (${freightEffect.destinationTechLevel.Value})
    </section>`;

    // Create Content Output
    let messageTable =  `<section>
            <p>Freight Table Effect: ${totalFreightEffect}
            <br>Table Lookup Roll: ${tableLookupValue}
            <br>Freight Table Result: ${tableResult}`;

    let freightLots = await determineFreightLots(tableResult, freightEffect.freightType.Effect);
    messageTable = messageTable + freightLots;

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

  async function validateTechLevel(techlevel) {
    
    let techlevel_regex = /[ABCDEFGHJKLMNPQRSTUVQX]/;
    let techlevel_num = Number(techlevel);

    // If the tech  level cannot be converted into a number
    if (isNaN(techlevel_num)) {
        if (techlevel.length != 1) {
            ui.notifications.error(`${techlevel} is not a valid Tech Level Code. It must be a single character`);
            return false;
        } else {
            if (!techlevel_regex.test(techlevel)) {
                ui.notifications.error(`Tech Level must be one of 0 to 31 or A - H, J - M or N - X. ${techlevel} is not a valid Tech Level`);
                return false;
            }
        }
    } else {
        // If the tech level is a number is it between 0 and 31
        if (techlevel_num < 0 || techlevel_num > 31) {
            ui.notifications.error(`Tech Level must be between 0 and 31. Techlevel is  ${techlevel}.`);
            return false
        }
    }

    return true;
  }

  function validateWorldPopulation(population) {
    
    const populationRegex = /[0-9ABC]/;

    if (population.length != 1) {
        ui.notifications.error(`${population} is not a valid Population Code. It must be a single character`);
        return false;
    }

    if (!populationRegex.test(population)) {
        ui.notifications.error(`World Population must be one of 0 to 9 or A, B, C. ${population} is not a valid Population Code`);
        return false;
    }

    return true;
  }

  function validateStarportSize(starport) {

    const starportRegex = /[ABCDEX]/;

    if (starport.length != 1) {
        ui.notifications.error(`${starport} is not a valid Starport Code. It must be a single character`);
        return false;
    }

    if (!starportRegex.test(starport)) {
        ui.notifications.error(`Starport must be one of A, B, C, D, E, X. ${starport} is not a valid Starport Code`);
        return false;
    }

    return true
  }

  function getFreightTypeEffect(frieghtType) {
    switch(frieghtType) {
        case "MINOR":
            return 0;
        case "MAJOR":
            return -4;
        case "INCIDENTAL":
            return 2;
        default:
            return 0;
    }
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
            populationEffect = 2;
            break;
        case "7":
            populationEffect = 2;
            break;
        case "8":
            populationEffect = 4;
            break;
        case "9":
            populationEffect = 4;
            break;
        case "A":
            populationEffect = 4;
            break;
        case "B":
            populationEffect = 4;
            break;
        case "C":
            populationEffect = 4;
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

    function getZoneTypeEffect(_zoneType) {
        switch(_zoneType) {
            case "RED":
                return -6;
            case "AMBER":
                return -2;
            case "NONE":
                return 0;
            default:
                return 0;
        }
    }

    function calculateTechLevelEffect(techLevel) {

        let techlevel_num = Number(techLevel);

        if (isNaN(techlevel_num)) {
            // This a Letter. Tech levels with a letter are automatically higher then 9
            return 2;
        } else {
            // This is a Number
            if (techlevel_num <= 6) {
                return -1;
            }
            if (techlevel_num >= 9) {
                return 2;
            }
        }
        return 0;
    }

    async function determineFreightLots(tableResult, freightType) {
        if (tableResult == "0") {
            return `<b>Total Freight Lots: None</section>`;
        }

        const numberOfDice = tableResult.replace('D', '');
        const numberOfLots = await new Roll(`${numberOfDice}d6`).roll();
        
        console.log("Dice: " + numberOfDice);
        console.log("Lots:" + numberOfLots.total);

        let freightTypePrinted = freightType.toLowerCase();

        let lotList = `<br><b>Total ${freightTypePrinted.charAt(0).toUpperCase() + freightTypePrinted.slice(1)}  Freight Lots:</b> <ul>`;
        let lotTonnageMultiplier = 0;

        switch(freightType) {
            default:
                lotTonnageMultiplier =  1;
                break;
            case "MINOR":
                lotTonnageMultiplier = 5;
                break;
            case "MAJOR":
                lotTonnageMultiplier = 10;
                break;
            case "INCIDENTAL":
                lotTonnageMultiplier = 1;
                break;
        }

        for (i = 1; i <= numberOfLots.total; i++) {
            lotTonnage = await new Roll(`1d6`).roll();
            console.log("TonnageM: " + lotTonnageMultiplier);
            lotList = lotList + `<li> Lot ${i}: ${Number(lotTonnage.result) * Number(lotTonnageMultiplier)} tons`
        }

        lotList = lotList + `</ul></section>`;
        console.log(lotList);
        return lotList;

    }