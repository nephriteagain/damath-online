/**
 * @description flips board 180 degree if player is blue
 */
export function boardStyleFlip(
    board: HTMLDivElement,
    horizontalNums: HTMLDivElement,
    verticalNums: HTMLDivElement,
    ) : void {

    board.style.transform = 'rotate(180deg)'
    const boxes = board.childNodes
    boxes.forEach(box => {
        if (box.nodeType === 1) {
        const el = box as HTMLDivElement
        el.style.transform = 'rotate(-180deg)'
        }
    })    

    verticalNums.style.left = 'auto'
    verticalNums.style.right = '-3rem'
    horizontalNums.style.bottom = 'auto'
    horizontalNums.style.top = '-3.2rem'
}

/**
 * @description changes title based on player turns
 */
export function titleTurnChanger(playerTurn: string, userId: string) : void{
    if (playerTurn === userId) {
        document.title = 'your turn'
      } else {
        document.title = "opponent's turn"
    }
}