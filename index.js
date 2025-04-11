/*
  > Next type of apples, after maxing out Golden Apple Chance upgrade.
  > Add pitch variety to common sound effects.
  > Upgrade that costs both gold and gems.
  > Maybe try combining Time Limit and Extra Time into one element.

  > Music Library; You can unlock different Miku songs that play in the background and switch between them.
*/
//! Update Displays

onload = function() {
    notification("Click for Reimu", "", 1000);
    changeShopGold();
    updateDisplays();
};

function updateDisplays() {
    // Day displays
    if (dayDisplay.style.display == "flex") {
        dayGoldDisplay.textContent = gs.gold.toFixed(2);
        dayGemDisplay.textContent = gs.gem.toFixed(2);
        earnedGoldDisplay.textContent = earnedGold.toFixed(2);
        earnedGemDisplay.textContent = earnedGem.toFixed(2);

        dayDayDisplay.textContent = "Day " + gs.day;
    }
    // Shop Displays
    else if (shopDisplay.style.display == "flex") {
        shopGoldDisplay.textContent = gs.gold.toFixed(2);
        shopGemDisplay.textContent = gs.gem.toFixed(2);

        shopDayDisplay.textContent = "Day " + gs.day;

        // Bonus Gold
        upgradeBonusGoldStatDisplay.textContent = "Current: " + gs.bonusGoldLevel.toFixed(2) + " (+1)";
        upgradeBonusGoldPriceDisplay.textContent = "Price: " + gs.bonusGoldUpgradePrice.toFixed(2);
        upgradeBonusGoldLevelDisplay.textContent = "Level " + gs.bonusGoldLevel + "/10";
        // Multiply Gold
        upgradeMultiplyGoldStatDisplay.textContent = "Current: x" + gs.multiplyGoldValue.toFixed(2) + " (+10%)";
        upgradeMultiplyGoldPriceDisplay.textContent = "Price: " + gs.multiplyGoldUpgradePrice.toFixed(2);
        upgradeMultiplyGoldLevelDisplay.textContent = "Level " + gs.multiplyGoldLevel + "/10";
        // Time Limit & Extra Time
        if (gs.timeLimitLevel != 10) {
            upgradeTimeLimitStatDisplay.textContent = "Current: " + gs.timeLimitValue.toFixed(0) + "s (+2s)";
            upgradeTimeLimitPriceDisplay.textContent = "Price: " + gs.timeLimitUpgradePrice.toFixed(2);
            upgradeTimeLimitLevelDisplay.textContent = "Level " + gs.timeLimitLevel + "/10";
        } else {
            if (gs.extraTimeLevel == 10) {
                upgradeExtraTimeStatDisplay.textContent = "Current: Infinite";
            } else {
                upgradeExtraTimeStatDisplay.textContent = "Current: " + gs.timeLimitValue + "s (+5s)";
            }
            upgradeExtraTimePriceDisplay.textContent = "Price: " + gs.extraTimeUpgradePrice.toFixed(2);
            upgradeExtraTimeLevelDisplay.textContent = "Level " + gs.extraTimeLevel + "/10";
        }
        // Bonus Apples
        upgradeBonusApplesStatDisplay.textContent = "Current: " + gs.bonusApplesValue.toFixed(0) + " (+1)";
        upgradeBonusApplesPriceDisplay.textContent = "Price: " + gs.bonusApplesUpgradePrice.toFixed(2);
        upgradeBonusApplesLevelDisplay.textContent = "Level " + gs.bonusApplesLevel + "/10";
        // Gapple Chance
        upgradeGappleChanceStatDisplay.textContent = "Current: " + (gs.gappleChanceValue * 10).toFixed(0) + "% (+10%)";
        upgradeGappleChancePriceDisplay.textContent = "Price: " + gs.gappleChanceUpgradePrice.toFixed(2);
        upgradeGappleChanceLevelDisplay.textContent = "Level " + gs.gappleChanceLevel + "/10";
        // Dash
        upgradeDashStatDisplay.textContent = "Current: " + gs.dashValue;
        upgradeDashPriceDisplay.textContent = "Price: " + gs.dashUpgradePrice.toFixed(2);
        upgradeDashLevelDisplay.textContent = "Level " + gs.dashLevel + "/1";
        // Sleep
        if (gs.sleepValue == "Awake") {
            upgradeSleepStatDisplay.textContent = "Current: " + gs.sleepValue;
        } else if (gs.sleepValue != "Locked") {
            upgradeSleepStatDisplay.textContent = gs.sleepValue;
        }
        upgradeSleepPriceDisplay.textContent = "Price: " + gs.sleepUpgradePrice.toFixed(2);
        upgradeSleepLevelDisplay.textContent = "Level " + gs.sleepLevel + "/1";
        // Bonus Gems
        upgradeBonusGemsStatDisplay.textContent = "Current: " + gs.bonusGemsLevel.toFixed(2) + " (+1)";
        upgradeBonusGemsPriceDisplay.textContent = "Price: " + gs.bonusGemsUpgradePrice.toFixed(2);
        upgradeBonusGemsLevelDisplay.textContent = "Level " + gs.bonusGemsLevel + "/10";
        // Multiply Gem
        upgradeMultiplyGemStatDisplay.textContent = "Current: x" + gs.multiplyGemValue.toFixed(2) + " (+10%)";
        upgradeMultiplyGemPriceDisplay.textContent = "Price: " + gs.multiplyGemUpgradePrice.toFixed(2);
        upgradeMultiplyGemLevelDisplay.textContent = "Level " + gs.multiplyGemLevel + "/10";

        statApplesCollectedValueDisplay.textContent = gs.statApplesCollectedValue.toFixed(0);
        statTilesMovedValueDisplay.textContent = gs.statTilesMovedValue.toFixed(0);
        statGoldCollectedValueDisplay.textContent = gs.statGoldCollectedValue.toFixed(2);
        statGemsCollectedValueDisplay.textContent = gs.statGemsCollectedValue.toFixed(2);
    }
}

//! Variables

// Game state
let gs = {
    // Currencies
    gemsUnlocked: false,
    unlockedGemsOnDay: NaN,
    specialsUnlocked: false,
    day: 1,
    gold: 0,
    goldCompletitionMultiplier: 1,
    gem: 0,
    gemCompletitionMultiplier: 1,
    // Upgrade levels
    bonusGoldLevel: 0,
    multiplyGoldLevel: 0,
    timeLimitLevel: 0,
    extraTimeLevel: 0,
    bonusApplesLevel: 0,
    gappleChanceLevel: 0,
    dashLevel: 0,
    sleepLevel: 0,
    bonusGemsLevel: 0,
    multiplyGemLevel: 0,
    // Upgrade values
    bonusGoldValue: 0,
    multiplyGoldValue: 1,
    timeLimitValue: 10,
    bonusApplesValue: 0,
    gappleChanceValue: 0,
    dashValue: "Locked",
    mikuAsleep: false,
    sleepValue: "Awake",
    bonusGemsValue: 0,
    multiplyGemValue: 1,
    // Upgrade Prices
    bonusGoldUpgradePrice: 12,
    multiplyGoldUpgradePrice: 18,

    timeLimitUpgradePrice: 8,
    extraTimeUpgradePrice: 16,
    bonusApplesUpgradePrice: 32,
    gappleChanceUpgradePrice: 24,

    dashUpgradePrice: 750,
    sleepUpgradePrice: 400,

    bonusGemsUpgradePrice: 12,
    multiplyGemUpgradePrice: 18,
    // Stats
    statTimePlayedValue: 0,
    statApplesCollectedValue: 0,
    statTilesMovedValue: 0,
    statGoldCollectedValue: 0,
    statGemsCollectedValue: 0,
    statAllUpgradesValue: 0
}

// Changing current shop icons displays
const goldShopIcon = document.getElementById("gold-shop-icon");
const otherShopIcon = document.getElementById("other-shop-icon");
const specialShopIcon = document.getElementById("special-shop-icon");
const gemShopIcon = document.getElementById("gem-shop-icon");

// Upgrade tiles in shop displays
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

// Upgrade tiles price, stat and level displays

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

// Currencies displays
const shopGoldDisplay = document.getElementById("shop-gold-display");
const shopGemDisplay = document.getElementById("shop-gem-display");
const dayGoldDisplay = document.getElementById("day-gold-display");
const dayGemDisplay = document.getElementById("day-gem-display");
const earnedGoldDisplay = document.getElementById("earned-gold-display");
const earnedGemDisplay = document.getElementById("earned-gem-display");

// Displays for main things
const shopDisplay = document.getElementById("shop");
const dayDisplay = document.getElementById("day");
const startMenuDisplay = document.getElementById("start-menu");
const shopMapDisplay = document.getElementById("map");
const snakeCanvasDisplay = document.getElementById("snake");

// Day counter display (Day 1, Day 2, Day 3 etc.)
const dayDayDisplay = document.getElementById("day-day-display");
const shopDayDisplay = document.getElementById("shop-day-display");

// Time left
const timeLeftDisplay = document.getElementById("time-left-display");
let tick = 0;
let timeLeftSeconds = 0;

// Apples
let nextAppleType;
let appleAmount = 0;
let foundApple = false;
let applePositions = []

// Currencies
let earnedGold = 0;
let earnedGem = 0;
let lostGold = 0;
let lostGem = 0;

// Shop and Upgrades
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

let currentShop = "Gold";
let upgradeCurrencyType;

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

// Notifications
const notificationBackgroundDisplay = document.getElementById("notification-background");
const notificationContentDisplay = document.getElementsByClassName("notification-content");

// Others
let scene;
let currentSide = "default";
let startMenuVisible = true;
let changeShopCooldown = false;
let speedrunMode = false;

// Music
const volumeButton = document.getElementById("volume-button");
const dayMusic = new Audio("Audio/day_music.mp3");
const shopMusic = new Audio("Audio/shop_music.mp3");
const startMenuMusic = new Audio("Audio/reimu_bounce.mp3");
volumeValue = 1;
dayMusic.loop = true;
shopMusic.loop = true;
startMenuMusic.loop = true;
dayMusic.volume = 0.2 * volumeValue;
shopMusic.volume = 0.15 * volumeValue;
startMenuMusic.volume = 0.1 * volumeValue
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

const allUpgradesTextDisplay = document.getElementById("all-upgrades-text");

// Saving & Start menu
const modeDetails = document.getElementById("mode-details");
const modeDetailsText = document.getElementById("mode-details-text");

const autoSaveButton = document.getElementById("auto-save-button");
let autoSaving = true;
let savedProgress;
let objectsToLoad;

//! Switching Shop Types

function nextShopMode() {
    const nextShopModeSound = new Audio("Audio/next_shop_mode.mp3");
    nextShopModeSound.volume = 0.5 * volumeValue;
    nextShopModeSound.play();

    if (currentShop == "Gold") changeShopOther();
    else if (currentShop == "Other" && !gs.gemsUnlocked && !gs.specialsUnlocked) changeShopGold();
    else if (currentShop == "Other" && gs.gemsUnlocked && !gs.specialsUnlocked) changeShopGems();
    else if (currentShop == "Other" && gs.specialsUnlocked) changeShopSpecial();
    else if (currentShop == "Special" && !gs.gemsUnlocked) changeShopGold();
    else if (currentShop == "Special" && gs.gemsUnlocked) changeShopGems();
    else if (currentShop == "Gems") changeShopGold();

    resetCurrentSide()
}

function previousShopMode() {
    const previousShopModeSound = new Audio("Audio/previous_shop_mode.mp3");
    previousShopModeSound.volume = 0.5 * volumeValue;
    previousShopModeSound.play();

    if (currentShop == "Gold" && !gs.gemsUnlocked && !gs.specialsUnlocked) changeShopOther();
    else if (currentShop == "Gold" && !gs.gemsUnlocked && gs.specialsUnlocked) changeShopSpecial();
    else if (currentShop == "Gold" && gs.gemsUnlocked) changeShopGems();
    else if (currentShop == "Other") changeShopGold();
    else if (currentShop == "Special") changeShopOther();
    else if (currentShop == "Gems" && !gs.specialsUnlocked) changeShopOther();
    else if (currentShop == "Gems" && gs.specialsUnlocked) changeShopSpecial();

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
    if (gs.timeLimitLevel != 10) {
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
    if (gs.goldCompletitionMultiplier == 2 && gs.gemCompletitionMultiplier == 2 && gs.extraTimeLevel == 10 && gs.bonusApplesLevel == 10 && gs.sleepLevel == 1 && gs.dashLevel == 1 && gs.statAllUpgradesValue == 0) {
        gs.statAllUpgradesValue = gs.day;
        allUpgradesTextDisplay.textContent = "You have bought all the upgrades in " + gs.statAllUpgradesValue + " days.";
        allUpgradesTextDisplay.style.display = "flex";
        if (speedrunMode) notification("Speedrun Mode Finished!", `You have maxed all the upgrades in ${gs.day} days.`);
    }
}

function upgradeBonusGold() {
    if (gs.gold >= gs.bonusGoldUpgradePrice && gs.bonusGoldLevel != 10) {
        gs.gold -= gs.bonusGoldUpgradePrice;
        gs.bonusGoldLevel++;
        gs.bonusGoldValue++;
        gs.bonusGoldUpgradePrice += (gs.bonusGoldUpgradePrice * priceIncrease) / 100;
        upgradeBonusGoldLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.bonusGoldLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.bonusGoldLevel == 10) {
            upgradeBonusGoldPriceDisplay.style.display = "none";
            upgradeBonusGoldPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-bonus-gold-unlock-button").style.display = "none";
        }
        if (gs.bonusGoldLevel == 10 && gs.multiplyGoldLevel == 10 && gs.goldCompletitionMultiplier == 1) {
            gs.goldCompletitionMultiplier = 2;
            notification("Gold Upgrades Maxed!", "Gold gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gs.gold >= gs.bonusGoldUpgradePrice) && gs.bonusGoldLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeMultiplyGold() {
    if (gs.gold >= gs.multiplyGoldUpgradePrice && gs.multiplyGoldLevel != 10) {
        gs.gold -= gs.multiplyGoldUpgradePrice;
        gs.multiplyGoldLevel++;
        gs.multiplyGoldValue += 0.1;
        gs.multiplyGoldUpgradePrice += (gs.multiplyGoldUpgradePrice * priceIncrease) / 100;
        upgradeMultiplyGoldLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.multiplyGoldLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.multiplyGoldLevel == 10) {
            upgradeMultiplyGoldPriceDisplay.style.display = "none";
            upgradeMultiplyGoldPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-multiply-gold-unlock-button").style.display = "none";
        }
        if (gs.bonusGoldLevel == 10 && gs.multiplyGoldLevel == 10 && gs.goldCompletitionMultiplier == 1) {
            gs.goldCompletitionMultiplier = 2;
            notification("Gold Upgrades Maxed!", "Gold gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gs.gold >= gs.multiplyGoldUpgradePrice) && gs.multiplyGoldLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeTimeLimit() {
    if (gs.gold >= gs.timeLimitUpgradePrice && gs.timeLimitLevel != 10) {
        gs.gold -= gs.timeLimitUpgradePrice;
        gs.timeLimitLevel++;
        gs.timeLimitValue += 2;
        gs.timeLimitUpgradePrice += (gs.timeLimitUpgradePrice * priceIncrease) / 100;
        upgradeTimeLimitLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.timeLimitLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.timeLimitLevel == 10) {
            upgradeTimeLimitPriceDisplay.style.display = "none";
            upgradeTimeLimitPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-time-limit-unlock-button").style.display = "none";

            upgradeTimeLimitTile.style.display = "none";
            upgradeExtraTimeTile.style.display = "flex";
            notification("Time Limit upgrade maxed!", "Extra Time upgrade is now available.");
        }
        checkAllUpgrades();
    } else if (!(gs.gold >= gs.timeLimitUpgradePrice) && gs.timeLimitLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeExtraTime() {
    if (gs.gem >= gs.extraTimeUpgradePrice && gs.extraTimeLevel != 10) {
        gs.gem -= gs.extraTimeUpgradePrice;
        gs.extraTimeLevel++;
        gs.timeLimitValue += 5;
        gs.extraTimeUpgradePrice += (gs.extraTimeUpgradePrice * priceIncrease) / 100;
        upgradeExtraTimeLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.extraTimeLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.extraTimeLevel == 10) {
            upgradeExtraTimePriceDisplay.style.display = "none";
            upgradeExtraTimePriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-extra-time-unlock-button").style.display = "none";

            gs.timeLimitValue = "Infinite";
            document.getElementById("time-container").style.display = "none";
            notification("Extra Time Maxed!", "Time Limit has been removed.");
        }
        checkAllUpgrades();
    } else if (!(gs.gem >= gs.extraTimeUpgradePrice) && gs.extraTimeLevel != 10) {
        upgradeCurrencyType = "gem";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeBonusApples() {
    if (gs.gold >= gs.bonusApplesUpgradePrice && gs.bonusApplesLevel != 10) {
        gs.gold -= gs.bonusApplesUpgradePrice;
        gs.bonusApplesLevel++;
        gs.bonusApplesValue++;
        gs.bonusApplesUpgradePrice += (gs.bonusApplesUpgradePrice * priceIncrease) / 100;
        upgradeBonusApplesLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.bonusApplesLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.bonusApplesLevel == 10) {
            upgradeBonusApplesPriceDisplay.style.display = "none";
            upgradeBonusApplesPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-bonus-apples-unlock-button").style.display = "none";
        }
        checkAllUpgrades();
    } else if (!(gs.gold >= gs.bonusApplesUpgradePrice) && gs.bonusApplesLevel != 10) {
        upgradeCurrencyType = "gold";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeGappleChance() {
    if (gs.gold >= gs.gappleChanceUpgradePrice && gs.gappleChanceLevel != 10) {
        gs.gold -= gs.gappleChanceUpgradePrice;
        gs.gappleChanceLevel++;
        gs.gappleChanceValue++;
        gs.gappleChanceUpgradePrice += (gs.gappleChanceUpgradePrice * priceIncrease) / 100;
        upgradeGappleChanceLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.gappleChanceLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.gappleChanceLevel == 10) {
            upgradeGappleChancePriceDisplay.style.display = "none";
            upgradeGappleChancePriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-gapple-chance-unlock-button").style.display = "none";
            document.getElementById("upgrade-gapple-chance-details-unlock-button").style.display = "none";
            upgradeGappleChanceDetailsButtonDisplay.style.width = "95%";
        }
        checkAllUpgrades();
    } else if (!(gs.gold >= gs.gappleChanceUpgradePrice) && gs.gappleChanceLevel != 10) {
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
    if (gs.gold >= gs.dashUpgradePrice && gs.dashLevel != 1) {
        gs.gold -= gs.dashUpgradePrice;
        gs.dashLevel++;
        gs.dashValue = "Enabled";
        notification("Dashing Unlocked!", "Press 'Shift + Direction' During Gameplay.");
        upgradeDashLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[9];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        document.getElementById("upgrade-dash-details-unlock-button").style.display = "none";
        if (gs.dashLevel == 1) {
            upgradeDashPriceDisplay.style.display = "none";
            upgradeDashPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-dash-unlock-button").style.display = "none";
        }
        checkAllUpgrades();
        dashEnable();
    } else if (!(gs.gold >= gs.dashUpgradePrice) && gs.dashLevel != 1) {
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
    if (gs.gem >= gs.sleepUpgradePrice && gs.sleepLevel != 1) {
        gs.gem -= gs.sleepUpgradePrice;
        gs.sleepLevel++;
        gs.sleepValue = "Awake";
        notification("Miku is now asleep!", "You don't have to worry about losing your belongings.");
        upgradeSleepLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[9];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        document.getElementById("upgrade-sleep-unlock-button").style.display = "none";
        document.getElementById("upgrade-sleep-details-unlock-button").style.display = "none";
        if (gs.sleepLevel == 1) {
            upgradeSleepPriceDisplay.style.display = "none";
            upgradeSleepPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-sleep-unlock-button").style.display = "none";
        }
        checkAllUpgrades();
        mikuSleep();
    } else if (!(gs.gem >= gs.sleepUpgradePrice) && gs.sleepLevel != 1) {
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
    if (gs.gem >= gs.bonusGemsUpgradePrice && gs.bonusGemsLevel != 10) {
        gs.gem -= gs.bonusGemsUpgradePrice;
        gs.bonusGemsLevel++;
        gs.bonusGemsValue++;
        gs.bonusGemsUpgradePrice += (gs.bonusGemsUpgradePrice * priceIncrease) / 100;
        upgradeBonusGemsLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.bonusGemsLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.bonusGemsLevel == 10) {
            upgradeBonusGemsPriceDisplay.style.display = "none";
            upgradeBonusGemsPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-bonus-gems-unlock-button").style.display = "none";
        }
        if (gs.bonusGemsLevel == 10 && gs.multiplyGemLevel == 10 && gs.gemCompletitionMultiplier == 1) {
            gs.gemCompletitionMultiplier = 2;
            notification("Gem Upgrades Maxed!", "Gems gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gs.gem >= gs.bonusGemsUpgradePrice) && gs.bonusGemsLevel != 10) {
        upgradeCurrencyType = "gem";
        notEnoughCurrency();
    }
    updateDisplays();
}

function upgradeMultiplyGem() {
    if (gs.gem >= gs.multiplyGemUpgradePrice && gs.multiplyGemLevel != 10) {
        gs.gem -= gs.multiplyGemUpgradePrice;
        gs.multiplyGemLevel++;
        gs.multiplyGemValue += 0.1;
        gs.multiplyGemUpgradePrice += (gs.multiplyGemUpgradePrice * priceIncrease) / 100;
        upgradeMultiplyGemLevelDisplay.parentNode.parentNode.style.border = "4px solid " + upgradeColors[(gs.multiplyGemLevel)];
        const upgradeSound = new Audio("Audio/upgrade.wav");
        upgradeSound.volume = volumeValue;
        upgradeSound.play();
        if (gs.multiplyGemLevel == 10) {
            upgradeMultiplyGemPriceDisplay.style.display = "none";
            upgradeMultiplyGemPriceDisplay.parentNode.querySelector("img").style.display = "none";
            document.getElementById("upgrade-multiply-gem-unlock-button").style.display = "none";
        }
        if (gs.bonusGemsLevel == 10 && gs.multiplyGemLevel == 10 && gs.gemCompletitionMultiplier == 1) {
            gs.gemCompletitionMultiplier = 2;
            notification("Gem Upgrades Maxed!", "Gems gain has been doubled.");
        }
        checkAllUpgrades();
    } else if (!(gs.gem >= gs.multiplyGemUpgradePrice) && gs.multiplyGemLevel != 10) {
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
}

function draw() {
    if (startMenuVisible == true) {
        startMenuMusic.play();
        startMenuMusic.volume = 0.1 * volumeValue;
    }
    gs.statTimePlayedValue += 1/3600;
    if (statisticsShowing == true) statTimePlayedValueDisplay.textContent = `${Math.floor(gs.statTimePlayedValue)} m, ${Math.floor((gs.statTimePlayedValue * 60) % 60)} s`;

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
    if (appleAmount < gs.bonusApplesValue + 1) {
        drawApple();
    }

    // Time Left
    if (gs.extraTimeLevel == 10) return;

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
    if (gs.gappleChanceValue == 10) {
        nextAppleType = "golden";
    } else {
        if (gs.gappleChanceValue > 0) {
            if (Math.random() < gs.gappleChanceValue / 10) {
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

function notification(text, subtext, length, volume) {
    if (length == undefined) {
        length = 2500;
    }
    
    if (volume == undefined) {
        volume = 0.25 * volumeValue;
    }

    const notificationSound = new Audio("Audio/notification.wav");
    notificationSound.volume = 0.25 * volumeValue * volume;
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
    }, length);
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
                gs.gold += (gs.bonusGoldValue + 1) * gs.multiplyGoldValue * gs.goldCompletitionMultiplier;
                earnedGold += (gs.bonusGoldValue + 1) * gs.multiplyGoldValue * gs.goldCompletitionMultiplier;
                gs.statGoldCollectedValue += (gs.bonusGoldValue + 1) * gs.multiplyGoldValue * gs.goldCompletitionMultiplier;
            } else if (applePositions[i][2] == "golden") {
                const eatGappleSound = new Audio("Audio/eat_gapple.wav");
                eatGappleSound.volume = volumeValue;
                eatGappleSound.play();
                // Gold
                gs.gold += ((gs.bonusGoldValue + 1) * gs.multiplyGoldValue) * 2 * gs.goldCompletitionMultiplier;
                earnedGold += ((gs.bonusGoldValue + 1) * gs.multiplyGoldValue) * 2 * gs.goldCompletitionMultiplier;
                gs.statGoldCollectedValue += ((gs.bonusGoldValue + 1) * gs.multiplyGoldValue) * 2 * gs.goldCompletitionMultiplier;
                // Gems
                gs.gem += (gs.bonusGemsValue + 1) * gs.multiplyGemValue * gs.gemCompletitionMultiplier;
                earnedGem += (gs.bonusGemsValue + 1) * gs.multiplyGemValue * gs.gemCompletitionMultiplier;
                gs.statGemsCollectedValue += (gs.bonusGemsValue + 1) * gs.multiplyGemValue * gs.gemCompletitionMultiplier;
                if (!gs.gemsUnlocked) {
                    gs.gemsUnlocked = true;
                    gs.unlockedGemsOnDay = gs.day;
                    notification("Gem Upgrades Unlocked!", "Access them in the shop.");
                }
            }

            square(applePositions[i][0], applePositions[i][1], snakeHeadSize);

            // Remove apple position from array
            applePositions.splice(i, 1);

            // Check if player unlocked specials
            if (gs.gold >= 200 && !gs.specialsUnlocked) {
                gs.specialsUnlocked = true;
                notification("Special Upgrades Unlocked!", "Access them in the shop.");
            }

            // Animations
            dayGoldDisplay.style.animation = "none";
            dayGoldDisplay.offsetHeight;
            dayGoldDisplay.style.animation = "currency-blink-yellow 200ms";
            earnedGoldDisplay.style.animation = "none";
            earnedGoldDisplay.offsetHeight;
            earnedGoldDisplay.style.animation = "currency-blink-yellow 200ms";

            gs.statApplesCollectedValue++;

            updateDisplays();
        }
    }
}

function keyPressed() {
    stroke(40);
    fill(40);
    square(xPos, yPos, snakeHeadSize);
    if (scene == "day") {
        if (gs.dashValue != "Enabled") {
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
        } else if (gs.dashValue == "Enabled") {
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
        gs.statTilesMovedValue++;

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
    } else if (scene == "shop" && changeShopCooldown == false) {
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
    if (gs.mikuAsleep == true) mikuMikuBeamSound.volume = 0.15 * volumeValue;
    mikuMikuBeamSound.play();

    // Different animation if Miku is asleep
    snakeCanvasDisplay.style.animation = "none";
    snakeCanvasDisplay.offsetHeight;

    if (gs.mikuAsleep == true) {
        snakeCanvasDisplay.style.animation = "miku-miku-beam-sleep-" + direction + " 100ms";
        return;
    } else if (gs.mikuAsleep == false) {
        snakeCanvasDisplay.style.animation = "miku-miku-beam-" + direction + " 100ms";
    }

    // Flashing currencies
    dayGoldDisplay.style.animation = "none";
    dayGoldDisplay.offsetHeight;
    dayGoldDisplay.style.animation = "currency-blink-red 200ms";
    if (gs.gemsUnlocked) {
        dayGemDisplay.style.animation = "none";
        dayGemDisplay.offsetHeight;
        dayGemDisplay.style.animation = "currency-blink-red 200ms";
    }

    console.log("you got miku miku beamed on '" + direction + "' side");

    // Decreasing gold
    gs.gold -= 0.5 * gs.day;
    earnedGold -= 0.5 * gs.day;
    if (gs.gold < 0) {
        lostGold = gs.gold;
        gs.gold = 0;
        earnedGold += 0.5 * gs.day;
        earnedGold -= lostGold + 0.5 * gs.day;
    }

    // Decreasing gems
    if (gs.gemsUnlocked) {
        gs.gem -= 0.5 * gs.day - 0.5 * gs.unlockedGemsOnDay + 0.5;
        earnedGem -= 0.5 * gs.day - 0.5 * gs.unlockedGemsOnDay + 0.5;
        if (gs.gem < 0) {
            lostGem = gs.gem;
            gs.gem = 0;
            earnedGem += 0.5 * gs.day - 0.5 * gs.unlockedGemsOnDay + 0.5;
            earnedGem -= lostGem + 0.5 * gs.day - 0.5 * gs.unlockedGemsOnDay + 0.5;
        }
    }

    gs.statTilesMovedValue--;

    updateDisplays();
}

function dashEnable() {
    document.getElementById("enable-dash-button").style.display = "none";
    document.getElementById("disable-dash-button").style.display = "block";
    gs.dashValue = "Enabled";

    updateDisplays();
}

function dashDisable() {
    document.getElementById("enable-dash-button").style.display = "block";
    document.getElementById("disable-dash-button").style.display = "none";
    gs.dashValue = "Disabled";

    updateDisplays();
}

function mikuSleep() {
    gs.mikuAsleep = true;
    upgradeSleepMikuAsleepDisplay.style.display = "flex";
    upgradeSleepMikuAwakeDisplay.style.display = "none";
    document.getElementById("put-miku-to-sleep-button").style.display = "none";
    document.getElementById("wake-up-miku-button").style.display = "block";
    gs.sleepValue = "Miku is asleep!";

    updateDisplays();
}

function mikuWake() {
    gs.mikuAsleep = false;
    upgradeSleepMikuAsleepDisplay.style.display = "none";
    upgradeSleepMikuAwakeDisplay.style.display = "flex";
    document.getElementById("wake-up-miku-button").style.display = "none";
    document.getElementById("put-miku-to-sleep-button").style.display = "block";
    gs.sleepValue = "Miku is awake!";

    updateDisplays();
}

//! Switching Scenes

function beginDay() {
    // Reset apple positions and time, player position and clear the canvas
    applePositions = [];
    appleAmount = 0;
    timeLeftSeconds = gs.timeLimitValue * 60;

    xPos = canvasWidth / 2 - tileWidth / 2;
    yPos = canvasHeight / 2 - tileHeight / 2;

    fill(40);
    square(0, 0, 880);

    // Tutorial if it's the first/second day
    if (gs.day == 1) {
        gs.mikuAsleep = true;
        timeLeftSeconds += 5 * 60;
    } else if (gs.day == 2) {
        gs.mikuAsleep = false;
        timeLeftSeconds += 5 * 60;
    }

    if (gs.day == 1 && !speedrunMode) {
        notification("Konichiwa!", "Use WASD/IJKL to move around and collect apples.", undefined, 0);
    } else if (gs.day == 2 && !speedrunMode) {
        notification("Watch out!", "If you bump into a wall, Miku will take some of your gold.", undefined, 0);
    }

    statisticsButton.style.display = "none";
    
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

    statisticsButton.style.display = "block";

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
    gs.day++

    changeShopCooldown = true;
    setTimeout(() => {
        changeShopCooldown = false;
    }, 500);

    if (autoSaving && !speedrunMode) saveProgress(false);

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

function startGame(mode) {
    startMenuDisplay.style.display = "none";
    startMenuVisible = false;
    startMenuMusic.pause();

    if (mode == "new") {
        beginDay();
    }
    if (mode == "load") {
        loadGame();
    }
    if (mode == "speedrun") {
        speedrunMode = true;
        autoSaveButton.style.display = "none";
        document.getElementById("top-screen-message").style.display = "block";
        document.getElementById("top-screen-message").textContent = "Speedrun Mode";
        beginDay();
    }
}

function loadGame() {
    objectsToLoad = JSON.parse(localStorage.getItem("gameSave") || {})
    if (objectsToLoad == undefined) {
        notification("No save file found!", "There's no data saved within your browser to load.");
    }
    for (const key of Object.keys(objectsToLoad)) gs[key] = objectsToLoad[key];
    gs.day--;
    nextDay();
    notification("Successfully loaded!", "Last save from your browser has been loaded.");
}

function saveProgress(manual) {
    if (scene == "day") notification("Can't save!", "You can't save during the day.");
    
    localStorage.setItem("gameSave", JSON.stringify(gs));
    if (manual == true) notification("Progress saved!", "Your progress should be saved within your browser now.");
    else if (manual == false) notification("Saved!", "", 500);
}

function autoSave() {
    if (autoSaving) {
        autoSaving = false;
        const controlButtonSound = new Audio("Audio/control_button_off.wav");
        controlButtonSound.volume = volumeValue;
        controlButtonSound.play();
        autoSaveButton.style.background = "#601818";
        autoSaveButton.style.border = "4px solid #b03030";
        notification("Auto Saving Disabled!", "", 300, 0);
    } else {
        autoSaving = true;
        const controlButtonSound = new Audio("Audio/control_button_on.wav");
        controlButtonSound.volume = volumeValue;
        controlButtonSound.play();
        autoSaveButton.style.background = "#206018";
        autoSaveButton.style.border = "4px solid #40b030";
        notification("Auto Saving Enabled!", "", 300, 0);
    }
}

function modeDetailsShow() {
    modeDetails.style.display = "flex";
}

function modeDetailsDisappear() {
    modeDetails.style.display = "none";
}

document.getElementById("new-game-button").addEventListener("mouseover", function() {modeDetailsShow();
    modeDetailsText.textContent = "Play the normal mode to experience all the features. This mode is always up-to-date.";
});

document.getElementById("load-game-button").addEventListener("mouseover", function() {modeDetailsShow();
    modeDetailsText.textContent = "Load the progress from the last save in your browser.";
});

document.getElementById("speedrun-mode-button").addEventListener("mouseover", function() {modeDetailsShow();
    modeDetailsText.textContent = "Try your best to buy all the upgrades from the first version as fast as possible."
});

document.getElementById("new-game-button").addEventListener("mouseout", function() {modeDetailsDisappear();});
document.getElementById("load-game-button").addEventListener("mouseout", function() {modeDetailsDisappear();});
document.getElementById("speedrun-mode-button").addEventListener("mouseout", function() {modeDetailsDisappear();});