



function ClickCell(event) {
    if (!isPlaying) { isPlaying = true; GetStarterStatistics(); GLobalTimer() }
    var level = 1
    var p = parseInt(event.target.getAttribute('data-cell'))
    var parent = allTiles[parseInt(event.target.getAttribute('data-cell'))]
    var dataLevel
    if (parent.classList.contains('parent')) { return }
    if (parent.classList.contains('child')) {
        parent.classList.remove('child')
        parent.classList.add('parent')
        parent.setAttribute('data-level', level)
        dataLevel = parseInt(parent.getAttribute('data-level'))
    } else {
        parent.classList.add('parent')
        parent.setAttribute('data-level', level)
        dataLevel = parseInt(parent.getAttribute('data-level'))
    }
    var children = [
        allTiles[p - 1],
        allTiles[p - 2],
        // cellArray[p - 21],
        allTiles[p - 40],
        allTiles[p - 20],
        // cellArray[p - 19],
        allTiles[p + 1],
        allTiles[p + 2],
        // cellArray[p + 21],
        allTiles[p + 40],
        allTiles[p + 20],
        // cellArray[p + 19],
    ]
    
    ClassifyAndActivate(parent, children, dataLevel)
}