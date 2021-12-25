// HTML elements------------------------------------
const grid = document.querySelector('#grid')
const seasonEL = document.querySelector('#currentseason')
const decadeEL = document.querySelector('#decade')
const yearEL = document.querySelector('#year')
const nextSeasonEL = document.querySelector('#nextseason')
const statsEL = document.querySelector('#stats')
const taxEL = statsEL.children[0]
const acresEL = statsEL.children[2]
const avgIncomeEL = statsEL.children[5]
const pocketEL = statsEL.children[7]
const changeSeasonEL = document.querySelectorAll('.change-season')
const pauseEL = document.querySelector('#pause')
const slowSpeedEL = document.querySelector('#regular')
const defaultSpeedEL = document.querySelector('#fast')
const fastSpeedEL = document.querySelector('#veryfast')
const bladesEL = document.querySelector('#blades')
const windmillEL = document.querySelector('#windmill')
const slowMillEL = document.querySelector('#slowbutton')
const fastMillEL = document.querySelector('#fastbutton')
const settingsEL = document.querySelector('#settings')

var allVegetables = Array.from(document.querySelector('#vegetables').children)
var allFruits = Array.from(document.querySelector('#fruits').children)


// variables--------------------------------------
var Tiles = []
var buttonHovers = []
var info = AllGameInformation()


// preSetup----------------------------------------
slowMillEL.disabled = true
slowMillEL.children[0].style.fill = info.colors.disabled


function AllGameInformation() {
    var info = {
        seasonLength: '1:30',
        gameStarted: false,
        gridHeight: 20,
        gridWidth: 40,
        global: 1000,
        display: {
            currentSeason: '-',
            seasonClock: '',
            seasonTime: 0,
            decade: 1,
            year: 1,
            annualTax: 0,
            acres: 0,
            acreCost: 0,
            pocket: 0,
            totalTimePlayed: 0,
            selectedTool: '',
            windmill: {
                isRotating: true,
                rotationalDegree: 0,
                timeIncriment: 1,
                globalTime: 0,
            },
            season: [
                spring = {
                    index: 0,
                    name: 'SPRING',
                    color: '#7effa5',
                    speed: 1,
                    conversion: 2264,
                },
                summer = {
                    index: 1,
                    name: 'SUMMER',
                    color: '#7ef4ff',
                    speed: 1.5,
                    conversion: 1709,
                },
                autumn = {
                    index: 2,
                    name: 'AUTUMN',
                    color: '#ff9c7e',
                    speed: 2.7,
                    conversion: 982,
                },
                winter = {
                    index: 3,
                    name: 'WINTER',
                    color: '#ffffff',
                    speed: 4.6,
                    conversion: 475,
                }
            ],
        },
        addClass: '',
        currentlySelected: '',
        shapes: {
            currentShape: '',
            I: 'I',
            O: 'O',
            T: 'T',
            S: 'S',
            Z: 'Z',
            J: 'J',
            L: 'L',
            child: 'child',
            sprinkler: 'sprinkler',
        },
        colors: {
            black: '#252525',
            hover: '#3b3b3b',
            disabled: '#414141',
            lightgrey: '#25252578',
            grey: '#252525a6',
            darkgrey: '#252525ce',
            yellow: '#fbe66d',
            spring: '#7effa5',
            summer: '#7ef4ff',
            autumn: '#ff9c7e',
            winter: '#ffffff',
            pit: '#6b6b6b',
            plot: '#808080'
        },
        vegetable: [
            wheat = {
                type: 'food',
                name: 'wheat',
                locked: false,
                unlockPrice: 100,
                perIndividual: 5,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[0]
            },
            corn = {
                type: 'food',
                name: 'corn',
                locked: false,
                unlockPrice: 100,
                perIndividual: 5,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[1]
            },
            lettuce = {
                type: 'food',
                name: 'lettuce',
                locked: true,
                unlockPrice: 100,
                perIndividual: 5,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[2]
            },
            carrot = {
                type: 'food',
                name: 'carrot',
                locked: true,
                unlockPrice: 100,
                perIndividual: 55,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[3]
            },
            broccoli = {
                type: 'food',
                name: 'broccoli',
                locked: true,
                unlockPrice: 100,
                perIndividual: 3,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[4]
            },
            beet = {
                type: 'food',
                name: 'beet',
                locked: true,
                unlockPrice: 100,
                perIndividual: 2,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[5]
            },
            garlic = {
                type: 'food',
                name: 'garlic',
                locked: true,
                unlockPrice: 100,
                perIndividual: 8,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[6]
            },
            coffebeans = {
                type: 'food',
                name: 'coffeebeans',
                locked: true,
                unlockPrice: 100,
                perIndividual: 22,
                demolish: 500,
                totalgrown: 0,
                svg: allVegetables[7]
            },
        ],
        fruit: [
            orange = {
                type: 'food',
                name: 'orange',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[0]
            },
            pear = {
                type: 'food',
                name: 'pear',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[1]
            },
            lemon = {
                type: 'food',
                name: 'lemon',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[2]
            },
            apple = {
                type: 'food',
                name: 'apple',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[3]
            },
            banana = {
                type: 'food',
                name: 'banana',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[4]
            },
            strawberry = {
                type: 'food',
                name: 'strawberry',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[5]
            },
            cherry = {
                type: 'food',
                name: 'cherry',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[6]
            },
            goldenberry = {
                type: 'food',
                name: 'goldenberry',
                locked: true,
                unlockPrice: 100,
                perIndividual: 78,
                demolish: 500,
                totalgrown: 0,
                svg: allFruits[7]
            },
        ],
        utility: {
            sprinkler: {
                type: 'utility',
                name: 'sprinkler',
                unlockPrice: 100000,
                firstUpgrade: 250000,
                secondUpgrade: 500000,
                thirdUpgrade: 1000000,
                taxes: 10000,
                demolish: 1000,
                // svg: svgs.children[9].children[0],
            },
            water: {
                type: 'utility',
                name: 'water',
                // svg: svgs.children[10].children[0],
            },
        },
        class: {
            nuetral: 'nuetral',
            child: 'child',
            parent: 'parent',
            utility: 'utility',
            water: 'water',
            blurElements: 'blur-elements',
            blur: 'blur'
        },
        id: {
            veggies: '#allVegetables',
            fruits: '#allFruits',
            pauseMenu: '#pause-canvas',            
        },
        speed: [
            594,
            336,
            208,
            128,
            80,
            48,
            32,
            16,
        ],
        animation: {
            selectable: {
                lower: 'lower-data .05s linear',
                raise: 'raise-data .05s linear'
            },
        },
    }
    info.shapes.currentShape = info.shapes.O
    info.display.currentSeason = info.display.season[0]
    return info
}
// retrieve local storage -------------------------

