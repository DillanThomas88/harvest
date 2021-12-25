

// temporary-variables------------------------------------


// initial------------------------------------------------

CreateGrid()
SeasonTimer()
ChildrenAreMessyAndGross()
// depricated? ParentHarvest() 
ManageActiveTiles()
WindmillRotate()
FoodHoverIcons()
UniversalButtonsHover()
UpdateStatistics()
GiveSeasonColor()

// events-------------------------------------------------
function ClickTile(event) {
    var target = event.target
    var object = GetClone(target)
    if (object.status == info.class.nuetral) {
        if (info.currentlySelected.type == 'food') {
            var value = ReturnParentValueFromPattern(object)
            object.value = value
            object.status = info.class.parent
            SetClone(object, target)
            ManageActiveTiles()
        } else if (info.currentlySelected.type == info.class.utility) {
            var value = ReturnParentValueFromPattern(object)
            object.value = value
            object.status = info.class.utility
            SetClone(object, target)
        }
    }
}
// logic--------------------------------------------------
function CreateGrid() {
    var gridContainer = document.createElement('div')
    var x = 0
    for (i = 0; i < info.gridWidth; i++) {
        for (let j = 0; j < info.gridHeight; j++) {
            var tile = document.createElement('div')
            tile.setAttribute('id', x)
            tile.classList.add('tile', info.class.nuetral)
            tile.addEventListener('mouseover', MouseOverTile)
            tile.addEventListener('mouseout', MouseOutTile)
            tile.setAttribute('parents', 0)
            tile.setAttribute('value', 0)
            tile.setAttribute('time', 1)
            tile.setAttribute('row', i)
            tile.setAttribute('col', j)
            tile.addEventListener('click', ClickTile)
            // tile.appendChild(settings.foods.beet)
            grid.appendChild(tile)
            Tiles = Tiles.concat(tile)
            x++

        }
        grid.appendChild(gridContainer)
    }

}
function ManageActiveTiles() {
    var children = document.querySelectorAll('.child')
    children.forEach(element => {

        var object = GetClone(element)
        var parents = GetParentCount(object)
        object.parents = parents
        if (object.parents == 0) {
            object.time = 0
        }
        SetClone(object, element)
    });

    function GetParentCount(object) {

        var totalNeighbors = 0
        var neighbors = ReturnPatternObject(object)
        neighbors.forEach(element => {
            // remove after && to prevent parents from being close together-------------------------------------------
            if (Tiles[element].classList.contains(info.class.parent) && Tiles[element].getAttribute('type') == info.classList) { totalNeighbors++ }
        });
        return totalNeighbors
    }
}
function GetClone(element) {

    var status
    var index = parseInt(element.getAttribute('id'))
    var parents = parseInt(element.getAttribute('parents'))
    var value = parseInt(element.getAttribute('value'))
    var time = parseInt(element.getAttribute('time'))
    var row = parseInt(element.getAttribute('row'))
    var col = parseInt(element.getAttribute('col'))
    var type = element.getAttribute('type')
    if (element.classList.contains(info.class.parent)) { status = info.class.parent }
    if (element.classList.contains(info.class.nuetral)) { status = info.class.nuetral }
    if (element.classList.contains(info.class.child)) { status = info.class.child }

    var object = {
        index: index,
        status: status,
        parents: parents,
        value: value,
        row: row,
        col: col,
        time: time,
        type: type

    }
    return object
}
function SetClone(object, target) {
    var parent = GetClone(target)
    if (object.status != parent.status) {
        target.style.removeProperty('color')
        target.classList.replace(parent.status, object.status)
        target.setAttribute('time', object.time)
    }
    if (object.status != info.class.nuetral) {
        target.removeEventListener('mouseover', MouseOverTile)
        target.removeEventListener('mouseout', MouseOutTile)
        target.style.removeProperty('background-color')
    }
    if (object.status == info.class.parent) {
        target.textContent = ''
        AppendSVGTo(target, info.currentlySelected.svg)
        target.setAttribute('time', 0)
        target.setAttribute('parents', 0)
        target.setAttribute('value', object.value)
    } else if (object.status == info.class.child) {
        target.setAttribute('value', 0)
        target.setAttribute('parents', object.parents)
        target.setAttribute('time', object.time)
        target.textContent = object.time

    } else if (object.status == info.class.utility) {
        AppendSVGTo(target, info.utility.sprinkler.svg)
        target.style.removeProperty('color')
        target.setAttribute('parents', 0)
        target.setAttribute('time', 0)
    } else if (object.status == info.class.water) {
        // var wait = setInterval(function(){
        //     clearInterval(wait)
        // },100)
        AppendSVGTo(target, info.utility.water.svg)
        target.setAttribute('parents', object.parents)
        target.style.removeProperty('color')
        target.setAttribute('time', 0)
    } else if (object.status == info.class.nuetral) {
        target.style.removeProperty('color')
        target.textContent = ''
        target.setAttribute('time', 0)
    }
    


    function AppendSVGTo(target, svg) {
        target.appendChild(svg.cloneNode(true))
        var svg = target.querySelector('svg')
        if (info.currentlySelected.type == 'food') { svg.style.fill = info.colors.black}
        else if (info.currentlySelected.type == info.class.utility) { svg.style.fill = info.colors.current }

    }
}
function ReturnParentValueFromPattern(object) {
    var plots = ReturnPatternObject(object)
    var value = 1
    var speed = 40
    var incriment = speed
    plots.forEach(element => {
        // remove first if statement if you want parents to cancel themselves out
        if(Tiles[element].classList.contains(info.class.nuetral)){
            var target = GetClone(Tiles[element])
            if (info.currentlySelected.type == 'food') {
                value += target.value
                target.status = info.class.child
                SetClone(target, Tiles[element])
            }
            else if (info.currentlySelected.type == info.class.utility) {
                value = Wait(target, element, value, incriment)
                incriment += speed
            }
        }

    });
    if (value == undefined) { value = 1 }

    return value

    function Wait(object, element, value, incriment) {
        var wait = setInterval(function () {
            object.status = info.class.water
            value += object.value
            SetClone(object, Tiles[element])
            clearInterval(wait)
        }, incriment)
        return value
    }
}
function ReturnPatternObject(object) {
    var target = GetClone(Tiles[object.index])
    if (object.status == info.class.child) { var pattern = Patterns(object.index, info.shapes.child) }
    else { pattern = Patterns(object.index, info.shapes.currentShape) }

    function Patterns(index, shape) {
        if (shape === info.shapes.I) {
            var a = index - info.gridWidth
            var b = a - info.gridWidth
            var c = b - info.gridWidth
            var positions = [a, b, c]
        } else if (shape === info.shapes.O) {
            var a = index - info.gridWidth
            var b = a + 1
            var c = index + 1
            var positions = [a, b, c]
        } else if (shape === info.shapes.T) {
            var a = index - info.gridWidth
            var b = index - 1
            var c = index + 1
            var positions = [a, b, c]
        } else if (shape === info.shapes.S) {
            var a = index - 1
            var b = a - info.gridWidth
            var c = b - 1
            var positions = [a, b, c]
        } else if (shape === info.shapes.Z) {
            var a = index + 1
            var b = a + info.gridWidth
            var c = b + 1
            var positions = [a, b, c]
        } else if (shape === info.shapes.J) {
            var a = index - info.gridWidth
            var b = index + 1
            var c = index + 2
            var positions = [a, b, c]
        } else if (shape === info.shapes.L) {
            var a = index - info.gridWidth
            var b = index - 1
            var c = index - 2
            var positions = [a, b, c]

        } else if (shape === info.shapes.child) {
            var a = index - 2
            var b = index - 1
            var c = index + 1
            var d = index + 2
            var e = a - info.gridWidth
            var f = e + 1
            var g = e + 2
            var h = e + 3
            var i = e + 4
            var j = e - info.gridWidth
            var k = j + 1
            var l = j + 2
            var m = j + 3
            var n = j + 4
            var o = a + info.gridWidth
            var p = o + 1
            var q = o + 2
            var r = o + 3
            var s = o + 4
            var t = o + info.gridWidth
            var u = t + 1
            var v = t + 2
            var w = t + 3
            var x = t + 4
            var positions = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x]

        } else if (shape === info.shapes.sprinkler) {
            var a = index - info.gridWidth
            var b = a - info.gridWidth
            var c = b - info.gridWidth
            var d = index + 1
            var e = d + 1
            var f = e + 1
            var g = index + info.gridWidth
            var h = g + info.gridWidth
            var i = h + info.gridWidth
            var j = index - 1
            var k = j - 1
            var l = k - 1
            var positions = [a, b, c, d, e, f, g, h, i, j, k, l]
        }
        function CheckRow(index, newindex) {
            var int
            if (Tiles[newindex].getAttribute('row') == index.row) {
                int = newindex
            } else { int = -100 }
            return int
        }
        var pattern = []
        positions.forEach(element => {
            if (element >= 0 && element < info.gridHeight * info.gridWidth) { pattern = pattern.concat(element) }
        });
        return pattern
    }
    return pattern
}

