// setup------------------------------------------
ToolBarAppending(allVegetables, info.id.veggies, 'vegetable')
ToolBarAppending(allFruits, info.id.fruits, 'fruit')

// update functions--------------------------------
function UpdateStatistics() {
    yearEL.textContent = info.display.year
    acresEL.textContent = info.display.acres
    pocketEL.textContent = info.display.pocket
    seasonEL.textContent = info.display.currentSeason.name
    decadeEL.textContent = info.display.decade
    taxEL.textContent = info.display.annualTax
    nextSeasonEL.textContent = info.display.seasonClock
    var timer = setInterval(function () {
        clearInterval(timer)
        UpdateStatistics()

    }, 1)
}
function ChildrenAreMessyAndGross() {
    for (let i = 1; i < 20; i++) {
        ChildrenInGroup(i)
    }
    function ChildrenInGroup(int) {
        var x = int
        var gScalCalc = int * 10
        if (int > info.speed.length) { x = info.speed.length }
        var group = document.querySelectorAll("[parents='" + (int) + "']")
        group.forEach(element => {

            var object = GetClone(element)

            object.time++
            if (object.time >= 10) {
                object.time = 1
                // new----------------needs fix!----------add individual counters for veg and fruit---
                if (info.display.pocket > 10000) {
                    var x = info.display.pocket * 0.0001
                    if (info.display.pocket > 10000000) {
                        var x = info.display.pocket * 0.0000001
                        info.vegetable[0].count.textContent = x.toFixed(3) + ' m'
                    } else { info.vegetable[0].count.textContent = x.toFixed(2) + 'k' }
                } else {
                    var x = info.display.pocket * 0.1
                    info.vegetable[0].count.textContent = x.toFixed(1) + 'lbs'
                }
                // -----------------------------------------------------------------------------------
                Tiles[object.index].style.color = info.display.currentSeason.color
                // Tiles[object.index].style.filter = 'grayscale('+ 90 - gScalCalc +'%)'
                var neighbors = ReturnPatternObject(object)
                neighbors.forEach(element => {
                    var neighbor = GetClone(Tiles[element])
                    if (neighbor.status == info.class.parent) { info.display.pocket += 1 }
                });
            } else {
                // keeps numbers colored for longer
                if(int < object.time){
                    Tiles[object.index].style.removeProperty('color')
                    // console.log(int)
                    // Tiles[object.index].style.filter = 'invert('+(40 - (gScalCalc*.5)) +'%)'
                    // Tiles[object.index].style.color = info.colors.black
                } else if (int > info.speed.length) {
                    // Tiles[object.index].style.filter = 'grayscale(0%);'

                }
            }
            SetClone(object, element)
        });
        var time = setInterval(function () {
            if (!info.display.windmill.isRotating) { clearInterval(time); return }
            clearInterval(time)
            ChildrenInGroup(int)
        }, info.speed[x - 1] / info.display.windmill.timeIncriment * info.display.currentSeason.speed)
    }
}
function ParentHarvest() {
    var parentArray = document.querySelectorAll('.parent')
    parentArray.forEach(element => {
        var individualParent = GetClone(element)
        var childArrayIndex = ReturnPatternObject(individualParent)
        childArrayIndex.forEach(element => {
            var individualChild = GetClone(Tiles[element])

            if (individualChild.time == 0) {
                if (Tiles[individualParent.index].style.color != null) {

                    Tiles[individualParent.index].style.color = info.colors.current
                    var timer = setInterval(function () {
                        Tiles[individualParent.index].style.removeProperty('color')
                        clearInterval(timer)
                    }, 1)

                }
            }
        });
    });
    var time = setInterval(function () {
        clearInterval(time)
        ParentHarvest()
    }, 1)
}
function SeasonTimer() {

    var incriment = info.display.windmill.timeIncriment
    var clock = info.display.seasonClock.split(':')

    var timer = setInterval(function () {
        if (info.display.seasonClock == '') {
            info.display.seasonClock = info.seasonLength
            clock = info.display.seasonClock.split(':')
        }
        if (info.display.windmill.timeIncriment != incriment) { clearInterval(timer); SeasonTimer() }
        info.display.windmill.globalTime++
        if (!info.display.windmill.isRotating) { clearInterval(timer) }
        if (info.display.windmill.globalTime >= 80) {
            info.display.windmill.globalTime = info.display.windmill.globalTime - 80
            UpdateClock(clock)
        }

    }, 12 / info.display.windmill.timeIncriment)

    function UpdateClock() {
        clock[1]--
        if (clock[0] == 0 && clock[1] < 0) {
            info.display.seasonClock = ''
            NextSeason()
        } else if (clock[1] < 0) {
            clock[0]--
            clock[1] = 59
            info.display.seasonClock = `${clock[0]}:${clock[1]}`

        } else if (clock[1] < 10) {
            info.display.seasonClock = `${clock[0]}:0${clock[1]}`
        } else {
            info.display.seasonClock = `${clock[0]}:${clock[1]}`
        }
        info.display.totalTimePlayed++
    }
}
function NextSeason() {
    var index = info.display.currentSeason.index + 1
    if (index > 3) {
        index = 0
        info.display.year++
        if (info.display.year > 10) {
            info.display.year = 1
            info.display.decade++
            console.log('decade')
        }
    }
    info.display.currentSeason = info.display.season[index]
    GiveSeasonColor()

}
function GiveSeasonColor() {
    changeSeasonEL.forEach(element => {
        element.style.color = info.display.currentSeason.color
        element.style.fill = info.display.currentSeason.color
    });
    var data = document.querySelectorAll('.data-container')
    data.forEach(element => {
        if (element.querySelector('.change-season') != null) {
            element.querySelector('.change-season').style.borderColor = info.display.currentSeason.color
            element.querySelector('.change-season').style.backgroundColor = info.display.currentSeason.color
        } else { }
    });

    if (info.display.selectedTool == '') { return }
    else {
        info.display.selectedTool.children[0].style.fill = info.display.currentSeason.color
    }
}
function WindmillRotate() {
    var t = setInterval(function () {
        if (info.display.windmill.isRotating == false) { clearInterval(t) }
        info.display.windmill.rotationalDegree = info.display.windmill.rotationalDegree + info.display.windmill.timeIncriment
        if (info.display.windmill.rotationalDegree > 359) {
            info.display.windmill.rotationalDegree = info.display.windmill.rotationalDegree - 360
        }
        bladesEL.style.transform = 'rotate(' + info.display.windmill.rotationalDegree + 'deg)'
    }, 1)

}
function ToolBarAppending(svgArray, infoID, foodType) {
    var svgElement = document.querySelector(infoID)
    var selectedType
    if (foodType == 'vegetable') { selectedType = info.vegetable; selectedType = info.vegetable }
    else { selectedType = info.fruit; selectedType = info.fruit }
    var i = 0
    svgArray.forEach(element => {
        var button = document.createElement('button')
        var clonedSVG = element.cloneNode(true)
        clonedSVG.classList.add('selectables')
        button.append(clonedSVG)
        button.setAttribute('index', i)
        button.setAttribute('type', foodType)
        button.setAttribute('class', 'button')
        button.setAttribute('id', 'regular')

        var dataContainer = document.createElement('div')
        dataContainer.setAttribute('class', 'data-container') //here-----------------------------
        
        var totalGrown = document.createElement('b')
        totalGrown.textContent = 0
        selectedType[i].count = totalGrown
        dataContainer.style = 'position: absolute;'

        var name = document.createElement('b')
        var cost = document.createElement('b')
        var hoverArrow = document.querySelector('#aesthetics').children[0]


        element.setAttribute('class', 'hover')

        totalGrown.style = 'display:flex justify-content: center; align-items: center'
        totalGrown.style.color = info.colors.black
        totalGrown.style.backgroundColor = info.colors.plot
        totalGrown.style.borderBottom = '2px solid ' + info.colors.plot
        totalGrown.style.borderRadius = '2px 2px 0px 0px'
        name.textContent = button.querySelector('title').textContent
        name.style = 'padding-bottom: 6px; border-left: 1px solid ' + info.colors.pit + '; border-right: 1px solid ' + info.colors.pit
        cost.textContent = 'Gathered'
        cost.style = 'padding-top: 6px; border-left: 1px solid ' + info.colors.pit + '; border-right: 1px solid ' + info.colors.pit

        if (selectedType[i].locked == true) {
            totalGrown.textContent = 'locked'
            button.disabled = true
            clonedSVG.style.fill = info.colors.disabled
            totalGrown.style.backgroundColor = info.colors.disabled
            totalGrown.style.borderBottom = '2px solid ' + info.colors.disabled
            button.style.pointerEvents = 'none'
        }
        dataContainer.append(totalGrown)
        dataContainer.append(cost)
        dataContainer.append(name)
        
        button.append(hoverArrow.cloneNode(true))
        button.append(dataContainer)
        buttonHovers.push(button)
        svgElement.append(button)

        i++
    });

}
// listeners---------------------------------------
windmillEL.addEventListener('click', function () {
    info.display.windmill.isRotating = !info.display.windmill.isRotating

    if (info.display.windmill.isRotating == true) {
        slowMillEL.disabled = false
        fastMillEL.disabled = false
        slowMillEL.children[0].style.removeProperty('fill')
        fastMillEL.children[0].style.removeProperty('fill')
        WindmillRotate()
        SeasonTimer()
        ChildrenAreMessyAndGross()
    }
    if (info.display.windmill.isRotating == false) {
        info.display.windmill.timeIncriment = 1
        slowMillEL.disabled = true
        fastMillEL.disabled = true
        slowMillEL.children[0].style.fill = info.colors.disabled
        fastMillEL.children[0].style.fill = info.colors.disabled
    }
    if (info.display.windmill.timeIncriment == 1) {
        slowMillEL.disabled = true
        slowMillEL.children[0].style.fill = info.colors.disabled
    }
})
slowMillEL.addEventListener('click', function () {
    info.display.windmill.timeIncriment = info.display.windmill.timeIncriment * 0.5

    if (info.display.windmill.timeIncriment <= 1) {
        info.display.windmill.timeIncriment = 1
        slowMillEL.disabled = true
        slowMillEL.children[0].style.fill = info.colors.disabled
    }
    if (info.display.windmill.timeIncriment > 1) {
        fastMillEL.disabled = false
        fastMillEL.children[0].style.removeProperty('fill')
    }
})
fastMillEL.addEventListener('click', function () {
    info.display.windmill.timeIncriment = info.display.windmill.timeIncriment * 2

    if (info.display.windmill.timeIncriment >= 4) {
        info.display.windmill.timeIncriment = 4
        fastMillEL.disabled = true
        fastMillEL.children[0].style.fill = info.colors.disabled
    }
    if (info.display.windmill.timeIncriment > 1) {
        slowMillEL.disabled = false
        slowMillEL.children[0].style.removeProperty('fill')
    }
})
settingsEL.addEventListener('click', function(e){
    var target = e.target.children[0]
    info.display.windmill.isRotating = false
    var buttons = document.querySelectorAll('button')
    buttons.forEach(element => {
        element.disabled = true
    });
    var blurElements = Array.from(document.querySelectorAll('.' + info.class.blurElements))
    console.log(blurElements)
    blurElements.forEach(element => {
        
        element.classList.add(info.class.blur)
    });
    var pauseCanvas = document.querySelector(info.id.pauseMenu)
    pauseCanvas.style.display = 'block'
}) 
// listeners functions ----------------------------
function UniversalButtonsHover() {
    var buttons = document.querySelectorAll('.universal-button')
    buttons.forEach(element => {
        element.addEventListener('mouseover', MouseOverUniversals)
        element.addEventListener('mouseout', MouseOutUniversals)
    });
}
function FoodHoverIcons() {
    buttonHovers.forEach(element => {
        element.addEventListener('mouseover', MouseOverSelectables)
        element.addEventListener('mouseout', MouseOutSelectables)
        element.addEventListener('click', ClickSelectables)
    });
}
function ClickSelectables(e) {
    var target = e.target
    var type
    if (info.display.selectedTool != '') {
        var selectedtool = info.display.selectedTool
        selectedtool.children[0].style.removeProperty('fill')
        selectedtool.children[1].style.removeProperty('fill')
        selectedtool.children[1].style.display = 'none'
        selectedtool.disabled = false
        selectedtool = info.display.selectedTool.querySelector('.data-container')
        
        selectedtool.children[0].classList.remove('change-season')
        selectedtool.style.animation = info.animation.selectable.lower
        
        selectedtool.children[0].style.backgroundColor = info.colors.plot
        selectedtool.children[0].style.borderColor = info.colors.plot
        // deselect tool by clicking same icon twice
        if(info.display.selectedTool == target){
             info.display.selectedTool = '' 
             info.currentlySelected = ''
             console.log('returned')
            return
            }
    }
    if (target.getAttribute('type') == 'vegetable') { type = info.vegetable }
    else { type = info.fruit }
    
    var containerChild = target.querySelector('.data-container').style
    containerChild.animation = info.animation.selectable.raise
    containerChild.animationFillMode = 'forwards'
    
    containerChild = target.querySelector('.data-container').children[0]
    containerChild.classList.add('change-season')
    containerChild.style.backgroundColor = info.display.currentSeason.color
    containerChild.style.borderColor = info.display.currentSeason.color
    info.currentlySelected = type[target.getAttribute('index')]
    type[target.getAttribute('index')]
    target.children[0].style.fill = info.display.currentSeason.color
    info.display.selectedTool = target
    var type = info.display.selectedTool.getAttribute('type')
    var index = info.display.selectedTool.getAttribute('index')
    info.addClass = info[type][index].name
    // target.disabled = true
}
function MouseOverSelectables(e) {
    var target = e.target.children[1]
    target.style.removeProperty('display')
}
function MouseOutSelectables(e) {
    var target = e.target.children[1]
    target.style.display = 'none'
}
function MouseOverTile(e) {
    var target = e.target
    // target.style.borderColor = settings.colors.winter
}
function MouseOutTile(e) {
    var target = e.target
    target.style.removeProperty('border-color')
}
function MouseOverUniversals(e) {
    var target = e.target
    target.children[0].style.fill = info.display.currentSeason.color
    if (target.children[1] != null) {
        // target.children[1].style.fill = settings.display.currentSeason.color
    }
}
function MouseOutUniversals(e) {
    var target = e.target
    target.children[0].style.removeProperty('fill')
    if (target.children[1] != null) {
        target.children[1].style.removeProperty('fill')
    }
}