const folk = ["Faerie", "Boggart", "Sprite", "Sluagh"];
const element = ["Undine", "Salamander", "Sylph"];
const nation = ["The Realm: In the Dining Hall", "The Hearth: In the Living Room", "The Free Dominions: On the Upper Floor", "The Horde: In the Basement"];
const profession = ["Soldier", "Scholar", "Hunter", "Criminal", "Duelist", "Animal Handler"];
const faerieOrigin = ["rus", "fre", "roma", "gre"];
const boggartOrigin = ["eng"];
const spriteOrigin = ["iri", "sco", "wel"];
const sluaghOrigin = ["ita", "spa", "ara", "heb"];

const apiKey = "ri297443161";
const apiUrl = "https://www.behindthename.com/api/random.json";

async function getName(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    return data;
}

function generateValue(array) {
    let num = Math.floor(Math.random() * array.length);
    return array[num];
}

async function generateAll() {
    let chosenFolk = generateValue(folk);
    let chosenElement = "";
    let chosenNation = generateValue(nation);
    let chosenProfession = generateValue(profession);
    let chosenOrigin = "";
    let chosenName = "";
    
    if (chosenFolk === "Faerie") {
        chosenOrigin = generateValue(faerieOrigin);
    } else if (chosenFolk === "Boggart") {
        chosenOrigin = generateValue(boggartOrigin);
    } else if (chosenFolk === "Sprite") {
        chosenElement = generateValue(element);
        chosenOrigin = generateValue(spriteOrigin);
    } else if (chosenFolk === "Sluagh") {
        chosenOrigin = generateValue(sluaghOrigin);
    }

    chosenName = await getName(apiUrl + "?usage=" + chosenOrigin + "&number=1&key=" + apiKey);

    return {chosenName, chosenFolk, chosenElement, chosenNation, chosenProfession, chosenOrigin};
}

function generateHTML(generatedContent) {
    let origin = decodeOrigin(generatedContent.chosenOrigin);
    let html = "";
    if (generatedContent.chosenElement !== "") {
        html = generatedContent.chosenName.names + " the " + generatedContent.chosenElement + " " + generatedContent.chosenFolk + " " + generatedContent.chosenProfession + "<br>" + generatedContent.chosenNation + "<br><br>(Name origin: " + origin + ")";
    } else {
        html = generatedContent.chosenName.names + " the " + generatedContent.chosenFolk + " " + generatedContent.chosenProfession + " <br>" + generatedContent.chosenNation + "<br><br>(Name origin: " + origin + ")";
    }
    return html;
}

function decodeOrigin(origin) {
    switch (origin){
        case "rus":
            return "Russian";
        case "fre":
            return "French";
        case "roma":
            return "Roman";
        case "gre":
            return "Greek";
        case "eng":
            return "English";
        case "iri":
            return "Irish";
        case "sco":
            return "Scottish";
        case "wel":
            return "Welsh";
        case "ita":
            return "Italian";
        case "spa":
            return "Spanish";
        case "ara":
            return "Arabic";
        case "heb":
            return "Hebrew";
        default:
            return "Unknown";
    }
}

async function fillPage() {
    const result = document.getElementById('result');
    const generateButton = document.getElementById('generate');

    result.innerHTML = generateHTML(await generateAll());

    generateButton.addEventListener('click', async () => {
        result.innerHTML = generateHTML(await generateAll());
    });
}

fillPage();