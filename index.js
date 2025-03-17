/*
  > Next type of apples, after maxing out Golden Apple Chance upgrade.
  > Add pitch variety to common sound effects.
  > Upgrade that costs both gold and gems.
  > Maybe try combining Time Limit and Extra Time into one element.

  > Speedrun mode; Collect X apples in a period of time.
  > Music Library; You can unlock different Miku songs that play in the background and switch between them.
*/

//! Update Displays

onload = function() {
    notification("Ohayo!", "Press 'Begin Day' to start :3");
    changeShopGold();
    updateDisplays();
};

function updateDisplays() {
    // Day displays
    if (dayDisplay.style.display == "flex") {
        dayGoldDisplay.textContent = gold.toFixed(2);
        dayGemDisplay.textContent = gem.toFixed(2);
        earnedGoldDisplay.textContent = earnedGold.toFixed(2);
        earnedGemDisplay.textContent = earnedGem.toFixed(2);

        dayDayDisplay.textContent = "Day " + day;
    }
    // Shop Displays
    else if (shopDisplay.style.display == "flex") {
        shopGoldDisplay.textContent = gold.toFixed(2);
        shopGemDisplay.textContent = gem.toFixed(2);

        shopDayDisplay.textContent = "Day " + day;

        // Bonus Gold
        upgradeBonusGoldStatDisplay.textContent = "Current: " + bonusGoldLevel.toFixed(2) + " (+1)";
        upgradeBonusGoldPriceDisplay.textContent = "Price: " + bonusGoldUpgradePrice.toFixed(2);
        upgradeBonusGoldLevelDisplay.textContent = "Level " + bonusGoldLevel + "/10";
        // Multiply Gold
        upgradeMultiplyGoldStatDisplay.textContent = "Current: x" + multiplyGoldValue.toFixed(2) + " (+10%)";
        upgradeMultiplyGoldPriceDisplay.textContent = "Price: " + multiplyGoldUpgradePrice.toFixed(2);
        upgradeMultiplyGoldLevelDisplay.textContent = "Level " + multiplyGoldLevel + "/10";
        // Time Limit & Extra Time
        if (timeLimitLevel != 10) {
            upgradeTimeLimitStatDisplay.textContent = "Current: " + timeLimitValue.toFixed(0) + "s (+2s)";
            upgradeTimeLimitPriceDisplay.textContent = "Price: " + timeLimitUpgradePrice.toFixed(2);
            upgradeTimeLimitLevelDisplay.textContent = "Level " + timeLimitLevel + "/10";
        } else {
            if (extraTimeLevel == 10) {
                upgradeExtraTimeStatDisplay.textContent = "Current: Infinite";
            } else {
                upgradeExtraTimeStatDisplay.textContent = "Current: " + timeLimitValue + "s (+5s)";
            }
            upgradeExtraTimePriceDisplay.textContent = "Price: " + extraTimeUpgradePrice.toFixed(2);
            upgradeExtraTimeLevelDisplay.textContent = "Level " + extraTimeLevel + "/10";
        }
        // Bonus Apples
        upgradeBonusApplesStatDisplay.textContent = "Current: " + bonusApplesValue.toFixed(0) + " (+1)";
        upgradeBonusApplesPriceDisplay.textContent = "Price: " + bonusApplesUpgradePrice.toFixed(2);
        upgradeBonusApplesLevelDisplay.textContent = "Level " + bonusApplesLevel + "/10";
        // Gapple Chance
        upgradeGappleChanceStatDisplay.textContent = "Current: " + (gappleChanceValue * 10).toFixed(0) + "% (+10%)";
        upgradeGappleChancePriceDisplay.textContent = "Price: " + gappleChanceUpgradePrice.toFixed(2);
        upgradeGappleChanceLevelDisplay.textContent = "Level " + gappleChanceLevel + "/10";
        // Dash
        upgradeDashStatDisplay.textContent = "Current: " + dashValue;
        upgradeDashPriceDisplay.textContent = "Price: " + dashUpgradePrice.toFixed(2);
        upgradeDashLevelDisplay.textContent = "Level " + dashLevel + "/1";
        // Sleep
        if (sleepValue == "Awake") {
            upgradeSleepStatDisplay.textContent = "Current: " + sleepValue;
        } else if (sleepValue != "Locked") {
            upgradeSleepStatDisplay.textContent = sleepValue;
        }
        upgradeSleepPriceDisplay.textContent = "Price: " + sleepUpgradePrice.toFixed(2);
        upgradeSleepLevelDisplay.textContent = "Level " + sleepLevel + "/1";
        // Bonus Gems
        upgradeBonusGemsStatDisplay.textContent = "Current: " + bonusGemsLevel.toFixed(2) + " (+1)";
        upgradeBonusGemsPriceDisplay.textContent = "Price: " + bonusGemsUpgradePrice.toFixed(2);
        upgradeBonusGemsLevelDisplay.textContent = "Level " + bonusGemsLevel + "/10";
        // Multiply Gem
        upgradeMultiplyGemStatDisplay.textContent = "Current: x" + multiplyGemValue.toFixed(2) + " (+10%)";
        upgradeMultiplyGemPriceDisplay.textContent = "Price: " + multiplyGemUpgradePrice.toFixed(2);
        upgradeMultiplyGemLevelDisplay.textContent = "Level " + multiplyGemLevel + "/10";

        statApplesCollectedValueDisplay.textContent = statApplesCollectedValue.toFixed(0);
        statTilesMovedValueDisplay.textContent = statTilesMovedValue.toFixed(0);
        statGoldCollectedValueDisplay.textContent = statGoldCollectedValue.toFixed(2);
        statGemsCollectedValueDisplay.textContent = statGemsCollectedValue.toFixed(2);
    }
}

//! Variables

// Shop Icons Switcher Display
const goldShopIcon = document.getElementById("gold-shop-icon");
const otherShopIcon = document.getElementById("other-shop-icon");
const specialShopIcon = document.getElementById("special-shop-icon");
const gemShopIcon = document.getElementById("gem-shop-icon");

// Shop Upgrade Tiles Display
const upgradeBonusGoldTile = document.getElementById("upgrade-bonus-gold-tile");
const upgradeMultiplyGoldTile = document.getElementById("upgrade-multiply-gold-tile");
const upgradeTimeLimitTile = document.getElementById("upgrade-time-limit-tile");
const upgradeExtraTimeTile = document.getElementById("upgrade-extra-time-tile");
const upgradeBonusApplesTile = document.getElementById("upgrade-bonus-apples-tile");
const upgradeGappleChanceTile = document.getElementById("upgrade-gapple-chance-tile");
const upgradeDashTile = document.getElementById("upgrade-dash-tile");
const upgradeSleepTile = document.getElementById("upgrade-sleep-tile");
const upgradeBonusGemsTile = document.getElementById("upgrade-bonus-gems-tile");
const upgradeMultiplyGemTile = document.getElementById("upgrade-multiply-gem-tile");

// Shop Upgrade Tiles Details

// Bonus Gold
const upgradeBonusGoldPriceDisplay = document.getElementById("upgrade-bonus-gold-price-display");
const upgradeBonusGoldStatDisplay = document.getElementById("upgrade-bonus-gold-stat-display");
const upgradeBonusGoldLevelDisplay = document.getElementById("upgrade-bonus-gold-level-display");
// Multiply Gold
const upgradeMultiplyGoldPriceDisplay = document.getElementById("upgrade-multiply-gold-price-display");
const upgradeMultiplyGoldStatDisplay = document.getElementById("upgrade-multiply-gold-stat-display");
const upgradeMultiplyGoldLevelDisplay = document.getElementById("upgrade-multiply-gold-level-display");
// Time Limit
const upgradeTimeLimitPriceDisplay = document.getElementById("upgrade-time-limit-price-display");
const upgradeTimeLimitStatDisplay = document.getElementById("upgrade-time-limit-stat-display");
const upgradeTimeLimitLevelDisplay = document.getElementById("upgrade-time-limit-level-display");
// Infinite Time
const upgradeExtraTimePriceDisplay = document.getElementById("upgrade-extra-time-price-display");
const upgradeExtraTimeStatDisplay = document.getElementById("upgrade-extra-time-stat-display");
const upgradeExtraTimeLevelDisplay = document.getElementById("upgrade-extra-time-level-display");
// Bonus Apples
const upgradeBonusApplesPriceDisplay = document.getElementById("upgrade-bonus-apples-price-display");
const upgradeBonusApplesStatDisplay = document.getElementById("upgrade-bonus-apples-stat-display");
const upgradeBonusApplesLevelDisplay = document.getElementById("upgrade-bonus-apples-level-display");
// Gapple Chance
const upgradeGappleChancePriceDisplay = document.getElementById("upgrade-gapple-chance-price-display");
const upgradeGappleChanceStatDisplay = document.getElementById("upgrade-gapple-chance-stat-display");
const upgradeGappleChanceLevelDisplay = document.getElementById("upgrade-gapple-chance-level-display");
// Dash
const upgradeDashPriceDisplay = document.getElementById("upgrade-dash-price-display");
const upgradeDashStatDisplay = document.getElementById("upgrade-dash-stat-display");
const upgradeDashLevelDisplay = document.getElementById("upgrade-dash-level-display");
// Sleep
const upgradeSleepPriceDisplay = document.getElementById("upgrade-sleep-price-display");
const upgradeSleepStatDisplay = document.getElementById("upgrade-sleep-stat-display");
const upgradeSleepLevelDisplay = document.getElementById("upgrade-sleep-level-display");
// Bonus Gems
const upgradeBonusGemsPriceDisplay = document.getElementById("upgrade-bonus-gems-price-display");
const upgradeBonusGemsStatDisplay = document.getElementById("upgrade-bonus-gems-stat-display");
const upgradeBonusGemsLevelDisplay = document.getElementById("upgrade-bonus-gems-level-display");
// Multiply Gem
const upgradeMultiplyGemPriceDisplay = document.getElementById("upgrade-multiply-gem-price-display");
const upgradeMultiplyGemStatDisplay = document.getElementById("upgrade-multiply-gem-stat-display");
const upgradeMultiplyGemLevelDisplay = document.getElementById("upgrade-multiply-gem-level-display");

// Statistics Display
const shopGoldDisplay = document.getElementById("shop-gold-display");
const shopGemDisplay = document.getElementById("shop-gem-display");
const dayGoldDisplay = document.getElementById("day-gold-display");
const dayGemDisplay = document.getElementById("day-gem-display");
const earnedGoldDisplay = document.getElementById("earned-gold-display");
const earnedGemDisplay = document.getElementById("earned-gem-display");

// Main Sectors Display
const shopDisplay = document.getElementById("shop");
const shopMapDisplay = document.getElementById("map");
const dayDisplay = document.getElementById("day");
const snakeCanvasDisplay = document.getElementById("snake");

// Day Display
const dayDayDisplay = document.getElementById("day-day-display");
const shopDayDisplay = document.getElementById("shop-day-display");

// Time Left
const timeLeftDisplay = document.getElementById("time-left-display");
let tick = 0;
let timeLeftSeconds = 0;

// Shop Related Variables
let currentShop = "Gold";
let upgradeCurrencyType;
let gemsUnlocked = false;
let unlockedGemsOnDay;
let specialsUnlocked = false;

// Apples
let nextAppleType;
let appleAmount = 0;
let foundApple = false;
let applePositions = []

// Currencies
let gold = 0;
let goldCompletitionMultiplier = 1;
let gem = 0;
let gemCompletitionMultiplier = 1;
let earnedGold = 0;
let earnedGem = 0;
let lostGold = 0;
let lostGem = 0;

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
const timeLimitColorDisplay = document.getElementById("upgrade-time-limit-tile");
const extraTimeColorDisplay = document.getElementById("upgrade-extra-time-tile");
const bonusApplesColorDisplay = document.getElementById("upgrade-bonus-apples-tile");
const gappleChanceColorDisplay = document.getElementById("upgrade-gapple-chance-tile");
const dashColorDisplay = document.getElementById("upgrade-dash-tile");
const sleepColorDisplay = document.getElementById("sleep-dash-tile");
const bonusGemsColorDisplay = document.getElementById("upgrade-bonus-gems-tile");
const multiplyGemColorDisplay = document.getElementById("upgrade-multiply-gem-tile");

const bonusGoldColor = upgradeColors[0];
const multiplyGoldColor = upgradeColors[0];
const timeLimitColor = upgradeColors[0];
const extraTimeColor = upgradeColors[0];
const bonusApplesColor = upgradeColors[0];
const gappleChanceColor = upgradeColors[0];
const dashColor = upgradeColors[0];
const sleepColor = upgradeColors[0];
const bonusGemsColor = upgradeColors[0];
const multiplyGemColor = upgradeColors[0];

// Upgrade Levels & Values
let bonusGoldLevel = 0;
let multiplyGoldLevel = 0;
let timeLimitLevel = 0;
let extraTimeLevel = 0;
let bonusApplesLevel = 0;
let gappleChanceLevel = 0;
let dashLevel = 0;
let sleepLevel = 0;
let bonusGemsLevel = 0;
let multiplyGemLevel = 0;

let bonusGoldValue = 0;
let multiplyGoldValue = 1;
let timeLimitValue = 10;
let bonusApplesValue = 0;
let gappleChanceValue = 0;
let dashValue = "Locked";
let sleepValue = "Awake";
let bonusGemsValue = 0;
let multiplyGemValue = 1;

// Shop Default Prices
let bonusGoldUpgradePrice = 12;
let multiplyGoldUpgradePrice = 18;

let timeLimitUpgradePrice = 8;
let extraTimeUpgradePrice = 16;
let bonusApplesUpgradePrice = 32;
let gappleChanceUpgradePrice = 24;

let dashUpgradePrice = 750;
let sleepUpgradePrice = 400;

let bonusGemsUpgradePrice = 12;
let multiplyGemUpgradePrice = 18;

let priceIncrease = 50;

// Snake Related Variables
let gameStarted = false;
const canvasWidth = 880;
const canvasHeight = 880;
const tileWidth = 80;
const tileHeight = 80;
const canvasGridSize = 11;
const snakeHeadSize = 80;

let xPos = canvasWidth / 2 - tileWidth / 2;
let yPos = canvasHeight / 2 - tileHeight / 2;

// Upgrade Details
const defaultRightSideShopDisplay = document.getElementsByClassName("default-right-side");

const upgradeGappleChanceDetailsButtonDisplay = document.getElementById("upgrade-gapple-chance-details-button");
const upgradeGappleChanceDetailsDisplay = document.getElementById("upgrade-gapple-chance-details");

const upgradeDashDetailsButtonDisplay = document.getElementById("upgrade-dash-details-button");
const upgradeDashDetailsDisplay = document.getElementById("upgrade-dash-details");

const upgradeSleepDetailsButtonDisplay = document.getElementById("upgrade-sleep-details-button");
const upgradeSleepDetailsDisplay = document.getElementById("upgrade-sleep-details");

// Dashing
let temporaryXpos;
let temporaryYpos;
let dashed = false;
let dashDirection;

// Sleeping Miku
const upgradeSleepMikuAsleepDisplay = document.getElementById("upgrade-sleep-miku-asleep");
const upgradeSleepMikuAwakeDisplay = document.getElementById("upgrade-sleep-miku-awake");

let mikuAsleep = false;

// Notifications
const notificationBackgroundDisplay = document.getElementById("notification-background");
const notificationContentDisplay = document.getElementsByClassName("notification-content");

// Others
let day = 1;
let scene = "shop";
let currentSide = "default";

// Music
const volumeButton = document.getElementById("volume-button");
const dayMusic = new Audio("Audio/day_music.mp3");
const shopMusic = new Audio("Audio/shop_music.mp3");
volumeValue = 1;
dayMusic.loop = true;
shopMusic.loop = true;
dayMusic.volume = 0.2 * volumeValue;
shopMusic.volume = 0.15 * volumeValue;
dayMusic.currentTime = 12.3;

// Statistics
const statisticsButton = document.getElementById("statistics-button");
const statisticsDisplay = document.getElementById("statistics");
let statisticsShowing = false;

const statTimePlayedValueDisplay = document.getElementById("stat-time-played-value-display");
const statApplesCollectedValueDisplay = document.getElementById("stat-apples-collected-value-display");
const statTilesMovedValueDisplay = document.getElementById("stat-tiles-moved-value-display");
const statGoldCollectedValueDisplay = document.getElementById("stat-gold-collected-value-display");
const statGemsCollectedValueDisplay = document.getElementById("stat-gems-collected-value-display");

let statTimePlayedValue = 0;
let statApplesCollectedValue = 0;
let statTilesMovedValue = 0;
let statGoldCollectedValue = 0;
let statGemsCollectedValue = 0;

const allUpgradesTextDisplay = document.getElementById("all-upgrades-text");
let statAllUpgradesValue = 0;

//! Switching Shop Types

function nextShopMode() {
    const nextShopModeSound = new Audio("Audio/next_shop_mode.mp3");
    nextShopModeSound.volume = 0.5 * volumeValue;
    nextShopModeSound.play();

    if (currentShop == "Gold") changeShopOther();
    else if (currentShop == "Other" && !gemsUnlocked && !specialsUnlocked) changeShopGold();
    else if (currentShop == "Other" && gemsUnlocked && !specialsUnlocked) changeShopGems();
    else if (currentShop == "Other" && specialsUnlocked) changeShopSpecial();
    else if (currentShop == "Special" && !gemsUnlocked) changeShopGold();
    else if (currentShop == "Special" && gemsUnlocked) changeShopGems();
    else if (currentShop == "Gems") changeShopGold();

    resetCurrentSide()
}

function previousShopMode() {
    const previousShopModeSound = new Audio("Audio/previous_shop_mode.mp3");
    previousShopModeSound.volume = 0.5 * volumeValue;
    previousShopModeSound.play();

    if (currentShop == "Gold" && !gemsUnlocked && !specialsUnlocked) changeShopOther();
    else if (currentShop == "Gold" && !gemsUnlocked && specialsUnlocked) changeShopSpecial();
    else if (currentShop == "Gold" && gemsUnlocked) changeShopGems();
    else if (currentShop == "Other") changeShopGold();
    else if (currentShop == "Special") changeShopOther();
    else if (currentShop == "Gems" && !specialsUnlocked) changeShopOther();
    else if (currentShop == "Gems" && specialsUnlocked) changeShopSpecial();

    resetCurrentSide()
}

function changeShopGold() {
    currentShop = "Gold";
    goldShopIcon.style.display = "flex";
    otherShopIcon.style.display = "none";
    specialShopIcon.style.display = "none";
    gemShopIcon.style.display = "none";

    upgradeBonusGoldTile.style.display = "flex";
    upgradeMultiplyGoldTile.style.display = "flex";
    upgradeTimeLimitTile.style.display = "none";
    upgradeExtraTimeTile.style.display = "none";
    upgradeBonusApplesTile.style.display = "none";
    upgradeGappleChanceTile.style.display = "none";
    upgradeDashTile.style.display = "none";
    upgradeSleepTile.style.display = "none";
    upgradeBonusGemsTile.style.display = "none";
    upgradeMultiplyGemTile.style.display = "none";

    console.log("Current shop type: " + currentShop);
}

function changeShopOther() {
    currentShop = "Other";
    goldShopIcon.style.display = "none";
    otherShopIcon.style.display = "flex";
    specialShopIcon.style.display = "none";
    gemShopIcon.style.display = "none";

    upgradeBonusGoldTile.style.display = "none";
    upgradeMultiplyGoldTile.style.display = "none";
    if (timeLimitLevel != 10) {
        upgradeTimeLimitTile.style.display = "flex";
        upgradeExtraTimeTile.style.display = "none";
    } else {
        upgradeTimeLimitTile.style.display = "none";
        upgradeExtraTimeTile.style.display = "flex";
    }
    upgradeBonusApplesTile.style.display = "flex";
    upgradeGappleChanceTile.style.display = "flex";
    upgradeDashTile.style.display = "none";
    upgradeSleepTile.style.display = "none";
    upgradeBonusGemsTile.style.display = "none";
    upgradeMultiplyGemTile.style.display = "none";

    console.log("Current shop type: " + currentShop);
}

function changeShopSpecial() {
    currentShop = "Special";
    goldShopIcon.style.display = "none";
    otherShopIcon.style.display = "none";
    specialShopIcon.style.display = "flex";
    gemShopIcon.style.display = "none";

    upgradeBonusGoldTile.style.display = "none";
    upgradeMultiplyGoldTile.style.display = "none";
    upgradeTimeLimitTile.style.display = "none";
    upgradeExtraTimeTile.style.display = "none";
    upgradeBonusApplesTile.style.display = "none";
    upgradeGappleChanceTile.style.display = "none";
    upgradeDashTile.style.display = "flex";
    upgradeSleepTile.style.display = "flex";
    upgradeBonusGemsTile.style.display = "none";
    upgradeMultiplyGemTile.style.display = "none";

    console.log("Current shop type: " + currentShop);
}

function changeShopGems() {
    currentShop = "Gems";
    goldShopIcon.style.display = "none";
    otherShopIcon.style.display = "none";
    specialShopIcon.style.display = "none";
    gemShopIcon.style.display = "flex";

    upgradeBonusGoldTile.style.display = "none";
    upgradeMultiplyGoldTile.style.display = "none";
    upgradeTimeLimitTile.style.display = "none";
    upgradeExtraTimeTile.style.display = "none";
    upgradeBonusApplesTile.style.display = "none";
    upgradeGappleChanceTile.style.display = "none";
    upgradeDashTile.style.display = "none";
    upgradeSleepTile.style.display = "none";
    upgradeBonusGemsTile.style.display = "flex";
    upgradeMultiplyGemTile.style.display = "flex";

    console.log("Current shop type: " + currentShop);
}

//! Buying Stuff and Details

function checkAllUpgrades() {
    if (goldCompletitionMultiplier == 2 && gemCompletitionMultiplier == 2 && extraTimeLevel == 10 && bonusApplesLevel == 10 && sleepLevel == 1 && dashLevel == 1 && statAllUpgradesValue == 0) {
        statAllUpgradesValue = day;
        allUpgradesTextDisplay.textContent = "You have bought all the upgrades in " + statAllUpgradesValue + " days.";
        allUpgradesTextDisplay.style.display = "flex";
    }
}

function upgradeBonusGold() {
    if (gold >= bonusGoldUpgradePrice && bonusGoldLevel != 10) {
        gold -= bonusGoldUpgradePrice;
        bonusGoldLevel++;
        bonusGoldValue++;
        bonusGoldUpgradePrice += (bonusGoldUpgradePrice * priceIncrease) / 100;
        upgradeBonusGoldLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(bonusGoldLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (bonusGoldLevel == 10) {
            upgradeBonusGoldPriceDisplay.style.display = "none";
            upgradeBonusGoldPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-bonus-gold-unlock-button").style.display = "none";
        }
        if (bonusGoldLevel == 10 && multiplyGoldLevel == 10 && goldCompletitionMultiplier == 1) {
            goldCompletitionMultiplier = 2;
            notification("Gold Upgrades Maxed!", "Gold gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gold >= bonusGoldUpgradePrice) && bonusGoldLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeMultiplyGold() {
    if (gold >= multiplyGoldUpgradePrice && multiplyGoldLevel != 10) {
        gold -= multiplyGoldUpgradePrice;
        multiplyGoldLevel++;
        multiplyGoldValue += 0.1;
        multiplyGoldUpgradePrice += (multiplyGoldUpgradePrice * priceIncrease) / 100;
        upgradeMultiplyGoldLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(multiplyGoldLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (multiplyGoldLevel == 10) {
            upgradeMultiplyGoldPriceDisplay.style.display = "none";
            upgradeMultiplyGoldPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-multiply-gold-unlock-button").style.display = "none";
        }
        if (bonusGoldLevel == 10 && multiplyGoldLevel == 10 && goldCompletitionMultiplier == 1) {
            goldCompletitionMultiplier = 2;
            notification("Gold Upgrades Maxed!", "Gold gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gold >= multiplyGoldUpgradePrice) && multiplyGoldLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeTimeLimit() {
    if (gold >= timeLimitUpgradePrice && timeLimitLevel != 10) {
        gold -= timeLimitUpgradePrice;
        timeLimitLevel++;
        timeLimitValue += 2;
        timeLimitUpgradePrice += (timeLimitUpgradePrice * priceIncrease) / 100;
        upgradeTimeLimitLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(timeLimitLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (timeLimitLevel == 10) {
            upgradeTimeLimitPriceDisplay.style.display = "none";
            upgradeTimeLimitPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-time-limit-unlock-button").style.display = "none";

            upgradeTimeLimitTile.style.display = "none";
            upgradeExtraTimeTile.style.display = "flex";
            notification("Time Limit upgrade maxed!", "Extra Time upgrade is now available.");
        }
        checkAllUpgrades();
    } else if (!(gold >= timeLimitUpgradePrice) && timeLimitLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeExtraTime() {
    if (gem >= extraTimeUpgradePrice && extraTimeLevel != 10) {
        gem -= extraTimeUpgradePrice;
        extraTimeLevel++;
        timeLimitValue += 5;
        extraTimeUpgradePrice += (extraTimeUpgradePrice * priceIncrease) / 100;
        upgradeExtraTimeLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(extraTimeLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (extraTimeLevel == 10) {
            upgradeExtraTimePriceDisplay.style.display = "none";
            upgradeExtraTimePriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-extra-time-unlock-button").style.display = "none";

            timeLimitValue = "Infinite";
            document.getElementById("time-container").style.display = "none";
            notification("Extra Time Maxed!", "Time Limit has been removed.");
        }
        checkAllUpgrades();
    } else if (!(gem >= extraTimeUpgradePrice) && extraTimeLevel != 10) {
        upgradeCurrencyType = "gem";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeBonusApples() {
    if (gold >= bonusApplesUpgradePrice && bonusApplesLevel != 10) {
        gold -= bonusApplesUpgradePrice;
        bonusApplesLevel++;
        bonusApplesValue++;
        bonusApplesUpgradePrice += (bonusApplesUpgradePrice * priceIncrease) / 100;
        upgradeBonusApplesLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(bonusApplesLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (bonusApplesLevel == 10) {
            upgradeBonusApplesPriceDisplay.style.display = "none";
            upgradeBonusApplesPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-bonus-apples-unlock-button").style.display = "none";
        }
        checkAllUpgrades();
    } else if (!(gold >= bonusApplesUpgradePrice) && bonusApplesLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeGappleChance() {
    if (gold >= gappleChanceUpgradePrice && gappleChanceLevel != 10) {
        gold -= gappleChanceUpgradePrice;
        gappleChanceLevel++;
        gappleChanceValue++;
        gappleChanceUpgradePrice += (gappleChanceUpgradePrice * priceIncrease) / 100;
        upgradeGappleChanceLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gappleChanceLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gappleChanceLevel == 10) {
            upgradeGappleChancePriceDisplay.style.display = "none";
            upgradeGappleChancePriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-gapple-chance-unlock-button").style.display = "none";
            document.getElementById("upgrade-gapple-chance-details-unlock-button").style.display = "none";
            upgradeGappleChanceDetailsButtonDisplay.style.width = "95%";
        }
        checkAllUpgrades();
    } else if (!(gold >= gappleChanceUpgradePrice) && gappleChanceLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeGappleChanceDetails() {
    if (currentSide != "gappleChance") {
        resetCurrentSide();
        const openDetails = new Audio("Audio/open_details.wav");
        openDetails.volume = volumeValue;
        openDetails.play();
        currentSide = "gappleChance";
        upgradeGappleChanceDetailsButtonDisplay.textContent = "X";
        upgradeGappleChanceDetailsDisplay.style.display = "flex";
        defaultRightSideShopDisplay[0].style.display = "none";
    } else if (currentSide == "gappleChance") {
        const closeDetails = new Audio("Audio/close_details.wav");
        closeDetails.volume = volumeValue;
        closeDetails.play();
        resetCurrentSide();
    }
}

function upgradeDash() {
    if (gold >= dashUpgradePrice && dashLevel != 1) {
        gold -= dashUpgradePrice;
        dashLevel++;
        dashValue = "Enabled";
        notification("Dashing Unlocked!", "Press 'Shift + Direction' During Gameplay.");
        upgradeDashLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[9];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        document.getElementById("upgrade-dash-details-unlock-button").style.display = "none";
        if (dashLevel == 1) {
            upgradeDashPriceDisplay.style.display = "none";
            upgradeDashPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-dash-unlock-button").style.display = "none";
        }
        checkAllUpgrades();
        dashEnable();
    } else if (!(gold >= dashUpgradePrice) && dashLevel != 1) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeDashDetails() {
    if (currentSide != "dash") {
        resetCurrentSide();
        const openDetails = new Audio("Audio/open_details.wav");
        openDetails.volume = volumeValue;
        openDetails.play();
        currentSide = "dash";
        upgradeDashDetailsButtonDisplay.textContent = "X";
        upgradeDashDetailsDisplay.style.display = "flex";
        defaultRightSideShopDisplay[0].style.display = "none";
    } else if (currentSide == "dash") {
        const closeDetails = new Audio("Audio/close_details.wav");
        closeDetails.volume = volumeValue;
        closeDetails.play();
        resetCurrentSide();
    }
}

function upgradeSleep() {
    if (gem >= sleepUpgradePrice && sleepLevel != 1) {
        gem -= sleepUpgradePrice;
        sleepLevel++;
        sleepValue = "Awake";
        notification("Miku is now asleep!", "You don't have to worry about losing your belongings.");
        upgradeSleepLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[9];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        document.getElementById("upgrade-sleep-unlock-button").style.display = "none";
        document.getElementById("upgrade-sleep-details-unlock-button").style.display = "none";
        if (sleepLevel == 1) {
            upgradeSleepPriceDisplay.style.display = "none";
            upgradeSleepPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-sleep-unlock-button").style.display = "none";
        }
        checkAllUpgrades();
        mikuSleep();
    } else if (!(gem >= sleepUpgradePrice) && sleepLevel != 1) {
        upgradeCurrencyType = "gem";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeSleepDetails() {
    if (currentSide != "sleep") {
        resetCurrentSide();
        const openDetails = new Audio("Audio/open_details.wav");
        openDetails.volume = volumeValue;
        openDetails.play();
        currentSide = "sleep";
        upgradeSleepDetailsButtonDisplay.textContent = "X";
        upgradeSleepDetailsDisplay.style.display = "flex";
        defaultRightSideShopDisplay[0].style.display = "none";
    } else if (currentSide == "sleep") {
        const closeDetails = new Audio("Audio/close_details.wav");
        closeDetails.volume = volumeValue;
        closeDetails.play();
        resetCurrentSide();
    }
}

function upgradeBonusGems() {
    if (gem >= bonusGemsUpgradePrice && bonusGemsLevel != 10) {
        gem -= bonusGemsUpgradePrice;
        bonusGemsLevel++;
        bonusGemsValue++;
        bonusGemsUpgradePrice += (bonusGemsUpgradePrice * priceIncrease) / 100;
        upgradeBonusGemsLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(bonusGemsLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (bonusGemsLevel == 10) {
            upgradeBonusGemsPriceDisplay.style.display = "none";
            upgradeBonusGemsPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-bonus-gems-unlock-button").style.display = "none";
        }
        if (bonusGemsLevel == 10 && multiplyGemLevel == 10 && gemCompletitionMultiplier == 1) {
            gemCompletitionMultiplier = 2;
            notification("Gem Upgrades Maxed!", "Gems gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gem >= bonusGemsUpgradePrice) && bonusGemsLevel != 10) {
        upgradeCurrencyType = "gem";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeMultiplyGem() {
    if (gem >= multiplyGemUpgradePrice && multiplyGemLevel != 10) {
        gem -= multiplyGemUpgradePrice;
        multiplyGemLevel++;
        multiplyGemValue += 0.1;
        multiplyGemUpgradePrice += (multiplyGemUpgradePrice * priceIncrease) / 100;
        upgradeMultiplyGemLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(multiplyGemLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (multiplyGemLevel == 10) {
            upgradeMultiplyGemPriceDisplay.style.display = "none";
            upgradeMultiplyGemPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-multiply-gem-unlock-button").style.display = "none";
        }
        if (bonusGemsLevel == 10 && multiplyGemLevel == 10 && gemCompletitionMultiplier == 1) {
            gemCompletitionMultiplier = 2;
            notification("Gem Upgrades Maxed!", "Gems gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gem >= multiplyGemUpgradePrice) && multiplyGemLevel != 10) {
        upgradeCurrencyType = "gem";
        notEnoughCurrency();
    }
    updateDisplays();
}

function resetCurrentSide() {
    currentSide = "default";
    upgradeGappleChanceDetailsButtonDisplay.textContent = "?";
    upgradeGappleChanceDetailsDisplay.style.display = "none";
    upgradeDashDetailsButtonDisplay.textContent = "?";
    upgradeDashDetailsDisplay.style.display = "none";
    upgradeSleepDetailsButtonDisplay.textContent = "?";
    upgradeSleepDetailsDisplay.style.display = "none";

    defaultRightSideShopDisplay[0].style.display = "flex";
}

function notEnoughCurrency() {
    console.log("You have no currency to purchase");

    if (upgradeCurrencyType == "gold") {
        shopGoldDisplay.style.animation = "none";
        shopGoldDisplay.offsetHeight;
        shopGoldDisplay.style.animation = "currency-blink-red 200ms";
        const notEnoughGoldSound = new Audio("Audio/not_enough_gold.mp3");
        notEnoughGoldSound.volume = volumeValue;
        notEnoughGoldSound.play();
    } else if (upgradeCurrencyType == "gem") {
        shopGemDisplay.style.animation = "none";
        shopGemDisplay.offsetHeight;
        shopGemDisplay.style.animation = "currency-blink-red 200ms";
        const notEnoughGemSound = new Audio("Audio/not_enough_gem.mp3");
        notEnoughGemSound.volume = volumeValue;
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
    statTimePlayedValue += 1/3600;
    statTimePlayedValueDisplay.textContent = statTimePlayedValue.toFixed(2) + "m";

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
    stroke(0, 72, 112);
    fill(0, 144, 224);
    square(xPos + snakeHeadSize / 10, yPos + snakeHeadSize / 10, snakeHeadSize * 0.8, snakeHeadSize / 8);

    // Draw apple if there's less than max apples
    if (appleAmount < bonusApplesValue + 1) {
        drawApple();
    }

    // Time Left
    if (extraTimeLevel == 10) return;

    if (dayDisplay.style.display == "flex") {
        tick++
        if (tick = 60) {
            tick = 0;
            timeLeftSeconds--;
            if (timeLeftSeconds / 60 < 9.5) {
                timeLeftDisplay.textContent = "00:0" + (timeLeftSeconds / 60).toFixed(0);
            } else {
                timeLeftDisplay.textContent = "00:" + (timeLeftSeconds / 60).toFixed(0);
            }
            if (timeLeftSeconds == 0) nextDay();
        }
    }
}

function drawApple() {
    nextAppleType = "normal";
    if (gappleChanceValue == 10) {
        nextAppleType = "golden";
    } else {
        if (gappleChanceValue > 0) {
            if (Math.random() < gappleChanceValue / 10) {
                nextAppleType = "golden";
            }
        }
    }

    appleX = (Math.round(Math.random() * (canvasGridSize - 1)) * snakeHeadSize);
    appleY = (Math.round(Math.random() * (canvasGridSize - 1)) * snakeHeadSize);

    while (appleX == xPos && appleY == yPos) return;

    if (appleAmount > 0) {
        for (let i = 0; i < appleAmount; i++) {
            while (appleX == applePositions[i][0] && appleY == applePositions[i][1]) return;
        }
    }

    applePositions.push([appleX, appleY, nextAppleType]);

    appleAmount++;

    strokeWeight(3)
    if (nextAppleType == "normal") {
        stroke(128, 0, 0);
        fill(255, 0, 0);
    } else if (nextAppleType == "golden") {
        stroke(128, 100, 15);
        fill(255, 200, 30);
    }
    square(appleX + snakeHeadSize / 10, appleY + snakeHeadSize / 10, snakeHeadSize * 0.8, snakeHeadSize / 8);
    console.log("Next apple position: " + appleX / snakeHeadSize + ", " + appleY / snakeHeadSize)
}

function notification(text, subtext) {
    const notificationSound = new Audio("Audio/notification.wav");
    notificationSound.volume = 0.6 * volumeValue;
    notificationSound.play();
    notificationContentDisplay[0].textContent = text;
    notificationContentDisplay[1].textContent = subtext;

    notificationBackgroundDisplay.style.background = "#000000c0";
    notificationContentDisplay[0].style.opacity = "100%";
    notificationContentDisplay[1].style.opacity = "100%";

    setTimeout(() => {
        notificationBackgroundDisplay.style.background = "#00000000";
        notificationContentDisplay[0].style.opacity = "0%";
        notificationContentDisplay[1].style.opacity = "0%";
    }, 2500);
}

function checkForApple() {
    // Checking when player on apple
    for (let i = 0; i < appleAmount; i++) {
        if (applePositions[i][0] == xPos && applePositions[i][1] == yPos) {
            if (dashed == true) {
                dashed = false;
                if (dashDirection == "positive") {
                    temporaryXpos = 0;
                    temporaryYpos = 0;
                } else if (dashDirection == "negative") {
                    temporaryXpos = canvasWidth / snakeHeadSize;
                    temporaryYpos = canvasHeight / snakeHeadSize;
                }
                foundApple = true;
            }
            // Change apple amount
            appleAmount--;

            // Different sound and gain
            if (applePositions[i][2] == "normal") {
                const eatAppleSound = new Audio("Audio/eat_apple.wav");
                eatAppleSound.volume = volumeValue;
                eatAppleSound.play();
                // Gold
                gold += (bonusGoldValue + 1) * multiplyGoldValue * goldCompletitionMultiplier;
                earnedGold += (bonusGoldValue + 1) * multiplyGoldValue * goldCompletitionMultiplier;
                statGoldCollectedValue += (bonusGoldValue + 1) * multiplyGoldValue * goldCompletitionMultiplier;
            } else if (applePositions[i][2] == "golden") {
                const eatGappleSound = new Audio("Audio/eat_gapple.wav");
                eatGappleSound.volume = volumeValue;
                eatGappleSound.play();
                // Gold
                gold += ((bonusGoldValue + 1) * multiplyGoldValue) * 2 * goldCompletitionMultiplier;
                earnedGold += ((bonusGoldValue + 1) * multiplyGoldValue) * 2 * goldCompletitionMultiplier;
                statGoldCollectedValue += ((bonusGoldValue + 1) * multiplyGoldValue) * 2 * goldCompletitionMultiplier;
                // Gems
                gem += (bonusGemsValue + 1) * multiplyGemValue * gemCompletitionMultiplier;
                earnedGem += (bonusGemsValue + 1) * multiplyGemValue * gemCompletitionMultiplier;
                statGemsCollectedValue += (bonusGemsValue + 1) * multiplyGemValue * gemCompletitionMultiplier;
                if (!gemsUnlocked) {
                    gemsUnlocked = true;
                    unlockedGemsOnDay = day;
                    notification("Gem Upgrades Unlocked!", "Access them in the shop.");
                }
            }

            square(applePositions[i][0], applePositions[i][1], snakeHeadSize);

            // Remove apple position from array
            applePositions.splice(i, 1);

            // Check if player unlocked specials
            if (gold >= 200 && !specialsUnlocked) {
                specialsUnlocked = true;
                notification("Special Upgrades Unlocked!", "Access them in the shop.");
            }

            // Animations
            dayGoldDisplay.style.animation = "none";
            dayGoldDisplay.offsetHeight;
            dayGoldDisplay.style.animation = "currency-blink-yellow 200ms";
            earnedGoldDisplay.style.animation = "none";
            earnedGoldDisplay.offsetHeight;
            earnedGoldDisplay.style.animation = "currency-blink-yellow 200ms";

            statApplesCollectedValue++;

            updateDisplays()
        }
    }
}

function keyPressed() {
    stroke(40);
    fill(40);
    square(xPos, yPos, snakeHeadSize);
    if (scene == "day") {
        if (dashValue != "Enabled") {
            switch (key) {
                case "w":
                case "W":
                case "i":
                case "I":
                case "ArrowUp":
                    yPos -= snakeHeadSize;
                    break;
                case "a":
                case "A":
                case "j":
                case "J":
                case "ArrowLeft":
                    xPos -= snakeHeadSize;
                    break;
                case "s":
                case "S":
                case "k":
                case "K":
                case "ArrowDown":
                    yPos += snakeHeadSize;
                    break;
                case "d":
                case "D":
                case "l":
                case "L":
                case "ArrowRight":
                    xPos += snakeHeadSize;
                    break;
            }
        } else if (dashValue == "Enabled") {
            temporaryXpos = ((canvasWidth - xPos - snakeHeadSize) / snakeHeadSize);
            temporaryYpos = ((canvasWidth - yPos - snakeHeadSize) / snakeHeadSize);
            dashed = true;
            switch (key) {
                case "w":
                case "i":
                case "I":
                case "ArrowUp":
                    yPos -= snakeHeadSize;
                    break;
                case "a":
                case "j":
                case "J":
                case "ArrowLeft":
                    xPos -= snakeHeadSize;
                    break;
                case "s":
                case "k":
                case "K":
                case "ArrowDown":
                    yPos += snakeHeadSize;
                    break;
                case "d":
                case "l":
                case "L":
                case "ArrowRight":
                    xPos += snakeHeadSize;
                    break;
                
                case "W":
                    dashDirection = "negative";
                    for (let i = 0; i < Math.abs(temporaryYpos - canvasHeight / snakeHeadSize) - 1; i++) {
                        yPos -= snakeHeadSize;
                        checkForApple();
                    }
                    if (foundApple == false) {
                        yPos -= snakeHeadSize;
                    }
                    break;
                case "A":
                    dashDirection = "negative";
                    for (let i = 0; i < Math.abs(temporaryXpos - canvasWidth / snakeHeadSize) - 1; i++) {
                        xPos -= snakeHeadSize;
                        checkForApple();
                    }
                    if (foundApple == false) {
                        xPos -= snakeHeadSize;
                    }
                    break;
                case "S":
                    dashDirection = "positive";
                    for (let i = 0; i < temporaryYpos; i++) {
                        yPos += snakeHeadSize;
                        checkForApple();
                    }
                    if (foundApple == false) {
                        yPos += snakeHeadSize;
                    }
                    break;
                case "D":
                    dashDirection = "positive";
                    for (let i = 0; i < temporaryXpos; i++) {
                        xPos += snakeHeadSize;
                        checkForApple();
                    }
                    if (foundApple == false) {
                        xPos += snakeHeadSize;
                    }
                    break;
            }
            dashed = false;
        }
        statTilesMovedValue++;

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

        foundApple = false;
        checkForApple();
    } else if (scene == "shop") {
        switch (key) {
            case "a":
            case "A":
            case "ArrowLeft":
                previousShopMode();
                break;
            case "d":
            case "D":
            case "ArrowRight":
                nextShopMode();
                break;
        }
    }
}

function hitSide(direction) {
    // Sound effects
    const mikuMikuBeamSound = new Audio("Audio/miku_miku_beam.wav");
    mikuMikuBeamSound.volume = 0.8 * volumeValue;
    if (mikuAsleep == true) mikuMikuBeamSound.volume = 0.15 * volumeValue;
    mikuMikuBeamSound.play();

    // Different animation if Miku is asleep
    snakeCanvasDisplay.style.animation = "none";
    snakeCanvasDisplay.offsetHeight;

    if (mikuAsleep == true) {
        snakeCanvasDisplay.style.animation = "miku-miku-beam-sleep-" + direction + " 100ms";
        return;
    } else if (mikuAsleep == false) {
        snakeCanvasDisplay.style.animation = "miku-miku-beam-" + direction + " 100ms";
    }

    // Flashing currencies
    dayGoldDisplay.style.animation = "none";
    dayGoldDisplay.offsetHeight;
    dayGoldDisplay.style.animation = "currency-blink-red 200ms";
    if (gemsUnlocked) {
        dayGemDisplay.style.animation = "none";
        dayGemDisplay.offsetHeight;
        dayGemDisplay.style.animation = "currency-blink-red 200ms";
    }

    console.log("you got miku miku beamed on '" + direction + "' side");

    // Decreasing gold
    gold -= 0.5 * day;
    earnedGold -= 0.5 * day;
    if (gold < 0) {
        lostGold = gold;
        gold = 0;
        earnedGold += 0.5 * day;
        earnedGold -= lostGold + 0.5 * day;
    }

    // Decreasing gems
    if (gemsUnlocked) {
        gem -= 0.5 * day - 0.5 * unlockedGemsOnDay + 0.5;
        earnedGem -= 0.5 * day - 0.5 * unlockedGemsOnDay + 0.5;
        if (gem < 0) {
            lostGem = gem;
            gem = 0;
            earnedGem += 0.5 * day - 0.5 * unlockedGemsOnDay + 0.5;
            earnedGem -= lostGem + 0.5 * day - 0.5 * unlockedGemsOnDay + 0.5;
        }
    }

    statTilesMovedValue--;

    updateDisplays();
}

function dashEnable() {
    document.getElementById("enable-dash-button").style.display = "none";
    document.getElementById("disable-dash-button").style.display = "block";
    dashValue = "Enabled";

    updateDisplays();
}

function dashDisable() {
    document.getElementById("enable-dash-button").style.display = "block";
    document.getElementById("disable-dash-button").style.display = "none";
    dashValue = "Disabled";

    updateDisplays();
}

function mikuSleep() {
    mikuAsleep = true;
    upgradeSleepMikuAsleepDisplay.style.display = "flex";
    upgradeSleepMikuAwakeDisplay.style.display = "none";
    document.getElementById("put-miku-to-sleep-button").style.display = "none";
    document.getElementById("wake-up-miku-button").style.display = "block";
    sleepValue = "Miku is asleep!";

    updateDisplays();
}

function mikuWake() {
    mikuAsleep = false;
    upgradeSleepMikuAsleepDisplay.style.display = "none";
    upgradeSleepMikuAwakeDisplay.style.display = "flex";
    document.getElementById("wake-up-miku-button").style.display = "none";
    document.getElementById("put-miku-to-sleep-button").style.display = "block";
    sleepValue = "Miku is awake!";

    updateDisplays();
}

//! Switching Scenes

function beginDay() {
    // Reset apple positions and time, player position and clear the canvas
    applePositions = [];
    appleAmount = 0;
    timeLeftSeconds = timeLimitValue * 60;

    xPos = canvasWidth / 2 - tileWidth / 2;
    yPos = canvasHeight / 2 - tileHeight / 2;

    fill(40);
    square(0, 0, 880);

    // Tutorial if it's the first/second day
    if (day == 1) {
        mikuAsleep = true;
        document.getElementById("devmode-button").style.display = "none";
        notification("Konichiwa!", "Use WASD/IJKL/Arrows to move around and collect apples.");
        timeLeftSeconds += 5 * 60;
    } else if (day == 2) {
        mikuAsleep = false;
        notification("Watch out!", "If you bump into a wall, Miku will take some of your gold.");
        timeLeftSeconds += 5 * 60;
    }

    // Change the scene
    scene = "day";
    shopDisplay.style.display = "none";
    dayDisplay.style.display = "flex";

    // Sound effects
    const beginDaySound = new Audio("Audio/begin_day.ogg");
    beginDaySound.volume = volumeValue;
    beginDaySound.play();

    // Music
    shopMusic.pause();
    dayMusic.currentTime = 12.3;
    dayMusic.play();

    // Reset statistics display
    statisticsShowing = false;
    shopMapDisplay.style.display = "flex";
    statisticsDisplay.style.display = "none";
    statisticsButton.style.background = "#206018";
    statisticsButton.style.border = "4px solid #40b030"

    updateDisplays();
}

function nextDay() {
    // Change the scene
    scene = "shop";
    shopDisplay.style.display = "flex";
    dayDisplay.style.display = "none";

    // Sound effects
    const nextDaySound = new Audio("Audio/next_day.ogg");
    nextDaySound.volume = volumeValue;
    nextDaySound.play();

    // Music
    dayMusic.pause();
    shopMusic.currentTime = 10.7;
    shopMusic.play();

    // Reset temporary currencies and increase the day
    earnedGold = 0;
    earnedGem = 0;
    day++

    updateDisplays();
}

function volumeControl() {
    if (volumeValue == 1) {
        const controlButtonSound = new Audio("Audio/control_button_off.wav");
        controlButtonSound.play();
        volumeValue = 0;
        volumeButton.style.background = "#601818";
        volumeButton.style.border = "4px solid #b03030"
        
    } else if (volumeValue == 0) {
        const controlButtonSound = new Audio("Audio/control_button_on.wav");
        controlButtonSound.play();
        volumeValue = 1;
        volumeButton.style.background = "#206018";
        volumeButton.style.border = "4px solid #40b030"
    }
    dayMusic.volume = 0.2 * volumeValue;
    shopMusic.volume = 0.15 * volumeValue;
}

function statisticsControl() {
    if (statisticsShowing) {
        const controlButtonSound = new Audio("Audio/control_button_on.wav");
        controlButtonSound.volume = volumeValue;
        controlButtonSound.play();
        statisticsShowing = false;
        shopMapDisplay.style.display = "flex";
        statisticsDisplay.style.display = "none";
        statisticsButton.style.background = "#206018";
        statisticsButton.style.border = "4px solid #40b030"
    } else {
        const controlButtonSound = new Audio("Audio/control_button_off.wav");
        controlButtonSound.volume = volumeValue;
        controlButtonSound.play();
        statisticsShowing = true;
        shopMapDisplay.style.display = "none";
        statisticsDisplay.style.display = "flex";
        statisticsButton.style.background = "#601818";
        statisticsButton.style.border = "4px solid #b03030"
    }
}

function dev() {
    document.getElementById("devmode-button").style.display = "flex";
}