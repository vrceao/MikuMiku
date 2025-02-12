//! Update Displays
function updateDisplays() {
    shopGoldDisplay.textContent = gold.toFixed(2);
    shopGemDisplay.textContent = gem.toFixed(2);
    dayGoldDisplay.textContent = gold.toFixed(2);
    dayGemDisplay.textContent = gem.toFixed(2);
    earnedGoldDisplay.textContent = earnedGold.toFixed(2);
    earnedGemDisplay.textContent = earnedGem.toFixed(2);

    shopDayDisplay.textContent = "Day " + day;
    dayDayDisplay.textContent = "Day " + day;

    upgradeBonusGoldStatDisplay.textContent = "Current: " + bonusGoldLevel.toFixed(2) + " (+1)";
    upgradeBonusGoldPriceDisplay.textContent = "Price: " + bonusGoldUpgradePrice.toFixed(2);
    upgradeMultiplyGoldStatDisplay.textContent = "Current: x" + multiplyGoldValue.toFixed(2) + " (+10%)";
    upgradeMultiplyGoldPriceDisplay.textContent = "Price: " + multiplyGoldUpgradePrice.toFixed(2);
}

//! Variables

// Shop Icons Switcher Display
const goldShopIcon = document.getElementById("gold-shop-icon");
const otherShopIcon = document.getElementById("other-shop-icon");
const gemShopIcon = document.getElementById("gem-shop-icon");

// Shop Upgrade Tiles Display
const upgradeBonusGoldTile = document.getElementById("upgrade-bonus-gold-tile");
const upgradeMultiplyGoldTile = document.getElementById("upgrade-multiply-gold-tile");
const upgradeBonusApplesTile = document.getElementById("upgrade-bonus-apples-tile");
const upgradeGappleChanceTile = document.getElementById("upgrade-gapple-chance-tile");
const upgradeBonusGemsTile = document.getElementById("upgrade-bonus-gems-tile");
const upgradeMultiplyGemTile = document.getElementById("upgrade-multiply-gem-tile");

// Shop Upgrade Buttons
const upgradeBonusGoldButtons = document.getElementsByClassName("upgrade-button");

// Shop Upgrade Tiles Details
const upgradeBonusGoldPriceDisplay = document.getElementById("upgrade-bonus-gold-price-display");
const upgradeBonusGoldStatDisplay = document.getElementById("upgrade-bonus-gold-stat-display");
const upgradeMultiplyGoldPriceDisplay = document.getElementById("upgrade-multiply-gold-price-display");
const upgradeMultiplyGoldStatDisplay = document.getElementById("upgrade-multiply-gold-stat-display");

// Statistics Display
const shopGoldDisplay = document.getElementById("shop-gold-display");
const shopGemDisplay = document.getElementById("shop-gem-display");
const dayGoldDisplay = document.getElementById("day-gold-display");
const dayGemDisplay = document.getElementById("day-gem-display");
const earnedGoldDisplay = document.getElementById("earned-gold-display");
const earnedGemDisplay = document.getElementById("earned-gem-display");

// Main Sectors Display
const shopDisplay = document.getElementById("shop");
const dayDisplay = document.getElementById("day");
const snakeCanvasDisplay = document.getElementById("snake");

// Day Display
const dayDayDisplay = document.getElementById("day-day-display");
const shopDayDisplay = document.getElementById("shop-day-display");

// Side bar thingies
const rightSideContent = document.getElementsByClassName("right-side-content");

// Shop Related Variables
let currentShop = 0; // 0 - Gold, 1 - Other, 2 - Gems
let upgradeCurrencyType;
let gemsUnlocked = true;

// Shop Default Prices
let bonusGoldUpgradePrice = 12;
let multiplyGoldUpgradePrice = 18;
let bonusApplesUpgradePrice = 30;
let gappleChanceUpgradePrice = 25;
let bonusGemsUpgradePrice = 24;
let multiplyGemUpgradePrice = 36;

let priceIncrease = 50;

// Shop Upgrade Colors
const upgradeColors = [
    "#ffeb5c",
    "#ffd652",
    "#ffc247",
    "#ffad3d",
    "#ff9933",
    "#ff8529",
    "#ff701f",
    "#ff5c14",
    "#ff470a",
    "#ff3300"
];

const bonusGoldColorDisplay = document.getElementById("upgrade-bonus-gold-tile");
const multiplyGoldColorDisplay = document.getElementById("upgrade-multiply-gold-tile");
const bonusApplesColorDisplay = document.getElementById("upgrade-bonus-apples-tile");
const gappleChanceColorDisplay = document.getElementById("upgrade-gapple-chance-tile");
const bonusGemsColorDisplay = document.getElementById("upgrade-bonus-gems-tile");
const multiplyGemsColorDisplay = document.getElementById("upgrade-multiply-gem-tile");

const bonusGoldColor = upgradeColors[0];
const multiplyGoldColor = upgradeColors[0];
const bonusApplesColor = upgradeColors[0];
const gappleChanceColor = upgradeColors[0];
const bonusGemsColor = upgradeColors[0];
const multiplyGemsColor = upgradeColors[0];

// Currencies
let gold = 0;
let gem = 0;
let earnedGold = 0;
let earnedGem = 0;
let lostGold = 0;
let lostGem = 0;

// Upgrade Levels & Stats
let bonusGoldLevel = 1;
let multiplyGoldLevel = 1;
let bonusApplesLevel = 1;
let gappleChanceLevel = 1;
let bonusGemsLevel = 1;
let multiplyGemLevel = 1;

let bonusGoldValue = 1;
let multiplyGoldValue = 1;
let bonusApplesValue = 1;
let gappleChanceValue = 0;
let bonusGemsValue = 1;
let multiplyGemValue = 1;

// Snake Related Variables
let gameStarted = false;
const canvasWidth = 880;
const canvasHeight = 880;
const tileWidth = 80;
const tileHeight = 80;
const canvasGridSize = 11;
const snakeHeadSize = 80;

let xPos = 400;
let yPos = 400;
let appleAmount = 0;

// Others
let day = 1;

// Music
const dayMusic = new Audio("Audio/day_music.mp3");
const shopMusic = new Audio("Audio/shop_music.mp3");
dayMusic.loop = true;
shopMusic.loop = true;
dayMusic.volume = 0.25;
shopMusic.volume = 0.25;
dayMusic.currentTime = 12.1;

//! Switching Shop Types

onload = function() {
    changeShopGold();
    updateDisplays()
};

function nextShopMode() {
    const nextShopModeSound = new Audio("Audio/next_shop_mode.mp3");
    nextShopModeSound.volume = 0.5;
    nextShopModeSound.play();

    if (currentShop == 0) changeShopOther();
    else if (currentShop == 1 && gemsUnlocked) changeShopGems();
    else if (currentShop == 1 && !gemsUnlocked) changeShopGold();
    else if (currentShop == 2) changeShopGold();
}

function previousShopMode() {
    const previousShopModeSound = new Audio("Audio/previous_shop_mode.mp3");
    previousShopModeSound.volume = 0.5;
    previousShopModeSound.play();

    if (currentShop == 0 && gemsUnlocked) changeShopGems();
    else if (currentShop == 0 && !gemsUnlocked) changeShopOther();
    else if (currentShop == 1) changeShopGold();
    else if (currentShop == 2) changeShopOther();
}

function changeShopGold() {
    currentShop = 0;
    goldShopIcon.style.display = "flex";
    otherShopIcon.style.display = "none";
    gemShopIcon.style.display = "none";

    upgradeBonusGoldTile.style.display = "flex";
    upgradeMultiplyGoldTile.style.display = "flex";
    upgradeBonusApplesTile.style.display = "none";
    upgradeGappleChanceTile.style.display = "none";
    upgradeBonusGemsTile.style.display = "none";
    upgradeMultiplyGemTile.style.display = "none";

    console.log("Current shop type: " + currentShop);
}

function changeShopOther() {
    currentShop = 1;
    goldShopIcon.style.display = "none";
    otherShopIcon.style.display = "flex";
    gemShopIcon.style.display = "none";

    upgradeBonusGoldTile.style.display = "none";
    upgradeMultiplyGoldTile.style.display = "none";
    upgradeBonusApplesTile.style.display = "flex";
    upgradeGappleChanceTile.style.display = "flex";
    upgradeBonusGemsTile.style.display = "none";
    upgradeMultiplyGemTile.style.display = "none";

    console.log("Current shop type: " + currentShop);
}

function changeShopGems() {
    currentShop = 2;
    goldShopIcon.style.display = "none";
    otherShopIcon.style.display = "none";
    gemShopIcon.style.display = "flex";

    upgradeBonusGoldTile.style.display = "none";
    upgradeMultiplyGoldTile.style.display = "none";
    upgradeBonusApplesTile.style.display = "none";
    upgradeGappleChanceTile.style.display = "none";
    upgradeBonusGemsTile.style.display = "flex";
    upgradeMultiplyGemTile.style.display = "flex";

    console.log("Current shop type: " + currentShop);
}

//! Buying Stuff

for (const button of upgradeBonusGoldButtons) {
    button.addEventListener("click", function(ev) {
        const parentNode = ev.target.parentNode.parentNode.parentNode;
        const tileImage = parentNode.parentNode.getElementsByClassName("tile-image")[0];
        const title = parentNode.getElementsByClassName("tile-title")[0].getElementsByTagName("p")[0].innerText;
        
        switch(title) {
            case "Bonus Gold":
                upgradeBonusGold();
                tileImage.style.transition = "200ms";
                tileImage.style.border = "4px solid " + upgradeColors[Math.min(upgradeColors.length - 1, bonusGoldLevel - 1)];
                break;
            case "Gold Multiplier":
                upgradeMultiplyGold();
                tileImage.style.transition = "200ms";
                tileImage.style.border = "4px solid " + upgradeColors[Math.min(upgradeColors.length - 1, multiplyGoldLevel - 1)];
                break;
        }
    })
}

function upgradeBonusGold() {
    if (gold >= bonusGoldUpgradePrice) {
        gold -= bonusGoldUpgradePrice;
        bonusGoldLevel++;
        bonusGoldValue++;
        bonusGoldUpgradePrice += (bonusGoldUpgradePrice * priceIncrease) / 100;
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.play();
    } else {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeMultiplyGold() {
    if (gold >= multiplyGoldUpgradePrice) {
        gold -= multiplyGoldUpgradePrice;
        multiplyGoldLevel++;
        multiplyGoldValue += 0.1;
        multiplyGoldUpgradePrice += (multiplyGoldUpgradePrice * priceIncrease) / 100;
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.play();
    } else {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function notEnoughCurrency() {
    console.log("You have no currency to purchase");

    if (upgradeCurrencyType == "gold") {
        shopGoldDisplay.style.animation = "none";
        shopGoldDisplay.offsetHeight;
        shopGoldDisplay.style.animation = "currency-blink-red 200ms";
        const notEnoughGoldSound = new Audio("Audio/not_enough_gold.mp3");
        notEnoughGoldSound.play();
    } else {
        shopGemDisplay.style.animation = "none";
        shopGemDisplay.offsetHeight;
        shopGemDisplay.style.animation = "currency-blink-red 200ms";
        const notEnoughGemSound = new Audio("Audio/not_enough_gem.mp3");
        notEnoughGemSound.play();
    }
}

//! Game

function roundNumbers(x, y) {
    xPos = Math.floor(x / snakeHeadSize) * snakeHeadSize;
    yPos = Math.floor(y / snakeHeadSize) * snakeHeadSize;
    return(xPos, yPos);
}

function setup() {
    createCanvas(880, 880, snake);
    colorMode(RGB, 255);
    background(40);
}

function draw() {
    // The Grid
    stroke(0);

    for (let i = 0; i < canvasGridSize + 1; i++) {
        strokeWeight(3);
        stroke(32);
        line(i * snakeHeadSize, 0, i * snakeHeadSize, canvasHeight);
        line(0, i * snakeHeadSize, canvasWidth, i * snakeHeadSize);
    }

    // The Player Head
    if (gameStarted) roundNumbers(canvasWidth / 2, canvasHeight / 2);
    strokeWeight(3);
    stroke(128, 100, 15);
    fill(255, 200, 30);
    square(xPos + snakeHeadSize / 10, yPos + snakeHeadSize / 10, snakeHeadSize * 0.8, snakeHeadSize / 8);

    // Draw apple if there's less than max apples
    if (appleAmount < bonusApplesLevel) {
        drawApple();
    }
}

function drawApple() {
    appleAmount++;
    appleX = (Math.round(Math.random() * (canvasGridSize - 1)) * snakeHeadSize);
    appleY = (Math.round(Math.random() * (canvasGridSize - 1)) * snakeHeadSize);

    while (appleX == xPos && appleY == yPos) {
        appleX = (Math.round(Math.random() * (canvasGridSize - 1)) * snakeHeadSize);
        appleY = (Math.round(Math.random() * (canvasGridSize - 1)) * snakeHeadSize);
    }

    strokeWeight(3);
    stroke(128, 0, 0);
    fill(255, 0, 0);
    square(appleX + snakeHeadSize / 10, appleY + snakeHeadSize / 10, snakeHeadSize * 0.8, snakeHeadSize / 8);
    console.log("Next apple position: " + appleX / snakeHeadSize + ", " + appleY / snakeHeadSize)
}

function keyPressed() {
    stroke(40);
    fill(40);
    square(xPos, yPos, snakeHeadSize);

    switch (key) {
        case "w":
        case "W":
        case "ArrowUp":
            yPos -= snakeHeadSize;
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            xPos -= snakeHeadSize;
            break;
        case "s":
        case "S":
        case "ArrowDown":
            yPos += snakeHeadSize;
            break;
        case "d":
        case "D":
        case "ArrowRight":
            xPos += snakeHeadSize;
            break;
    }

    console.log("Current Position:", xPos, yPos, "(", xPos / snakeHeadSize, yPos / snakeHeadSize, ")");

    if (xPos >= canvasWidth) {
        xPos -= snakeHeadSize;
        direction = "d";
        hitSide(direction);
    }

    if (yPos >= canvasHeight) {
        yPos -= snakeHeadSize;
        direction = "s";
        hitSide(direction);
    }

    if (xPos < 0) {
        xPos += snakeHeadSize;
        direction = "a";
        hitSide(direction);
    }

    if (yPos < 0) {
        yPos += snakeHeadSize;
        direction = "w";
        hitSide(direction);
    }

    // Check when player is on apple
    if (appleX == xPos && appleY == yPos) {
        console.log("YOU ON APPLE!!!!!!!!!!!!!!!");
        const eatAppleSound = new Audio("Audio/eat_apple.wav");
        eatAppleSound.play();
        appleAmount--;
        gold += bonusGoldValue * multiplyGoldValue;
        earnedGold += bonusGoldValue * multiplyGoldValue;
        dayGoldDisplay.style.animation = "none";
        dayGoldDisplay.offsetHeight;
        dayGoldDisplay.style.animation = "currency-blink-yellow 200ms";
        earnedGoldDisplay.style.animation = "none";
        earnedGoldDisplay.offsetHeight;
        earnedGoldDisplay.style.animation = "currency-blink-yellow 200ms";
        updateDisplays()
    }
};

function hitSide(direction) {
    snakeCanvasDisplay.style.animation = "none";
    snakeCanvasDisplay.offsetHeight;
    snakeCanvasDisplay.style.animation = "miku-miku-beam-" + direction + " 100ms";
    console.log("you got miku miku beamed on '" + direction + "' side");

    const mikuMikuBeamSound = new Audio("Audio/miku_miku_beam.wav");
    mikuMikuBeamSound.play();

    gold -= 0.5 * day;
    earnedGold -= 0.5 * day;
    if (gold < 0) {
        lostGold = gold;
        gold = 0;
        earnedGold += 0.5 * day;
        earnedGold -= (lostGold + 0.5 * day);
    }
    updateDisplays();

    dayGoldDisplay.style.animation = "none";
    dayGoldDisplay.offsetHeight;
    dayGoldDisplay.style.animation = "currency-blink-red 200ms";
}

//! Switching Scenes

function beginDay() {
    shopDisplay.style.display = "none";
    dayDisplay.style.display = "flex";

    const beginDaySound = new Audio("Audio/begin_day.ogg");
    beginDaySound.play();

    dayMusic.play();
    shopMusic.currentTime = 10.7;
    shopMusic.pause();

    updateDisplays();
}

function nextDay() {
    shopDisplay.style.display = "flex";
    dayDisplay.style.display = "none";

    const nextDaySound = new Audio("Audio/next_day.ogg");
    nextDaySound.play();

    shopMusic.play();
    dayMusic.currentTime = 12.1;
    dayMusic.pause();

    earnedGold = 0;
    day++

    updateDisplays();
}