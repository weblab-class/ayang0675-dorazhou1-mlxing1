export const getRookMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us=='w'?'b':'w'

    const direction = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1],
    ]
    direction.forEach(dir => {
        for(let i=1;i<8; i++){
            const x= rank + (i*dir[0])
            const y= file + (i*dir[1])
            if(position?.[x]?.[y] == undefined) break
            if(position[x][y].startsWith(enemy)) {
                moves.push([x,y])
                break;
            }
            if(position[x][y].startsWith(us)) {
                break;
            }
            moves.push([x,y])
        }
    })
    console.log(moves)
    return moves
}

export const getBishopMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us=='w'?'b':'w'

    const direction = [
        [1,1],
        [1,-1],
        [-1,1],
        [-1,-1],
    ]
    direction.forEach(dir => {
        for(let i=1;i<8; i++){
            const x= rank + (i*dir[0])
            const y= file + (i*dir[1])
            if(position?.[x]?.[y] == undefined) break
            if(position[x][y].startsWith(enemy)) {
                moves.push([x,y])
                break;
            }
            if(position[x][y].startsWith(us)) {
                break;
            }
            moves.push([x,y])
        }
    })
    console.log(moves)
    return moves
}


export const getKnightMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us=='w'?'b':'w'

    const direction = [
        [1,2],
        [1,-2],
        [-1,2],
        [-1,-2],
        [2,1],
        [2,-1],
        [-2,1],
        [-2,-1]
    ]
    direction.forEach(dir => {
        moves.push([rank + dir[0], file + dir[1]])
    })
    console.log(moves)
    return moves
}

export const getPawnMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us=='w'?'b':'w'

    if(position[rank+1][file] == "") {
        moves.push([rank+1,file]);
        if(position[rank+2][file] == "") {
            moves.push([rank+2,file]);
        }
    }

    if(position[rank+1][file+1].startsWith(enemy)) {
        moves.push([rank+1,file+1]);
    }

    if(position[rank+1][file-1].startsWith(enemy)) {
        moves.push([rank+1,file-1]);
    }
    
    return moves
}

export const getQueenMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us=='w'?'b':'w'

    const direction = [
        [1,1],
        [1,-1],
        [-1,1],
        [-1,-1],
        [-1,0],
        [1,0],
        [0,-1],
        [0,1],
    ]
    direction.forEach(dir => {
        for(let i=1;i<8; i++){
            const x= rank + (i*dir[0])
            const y= file + (i*dir[1])
            if(position?.[x]?.[y] == undefined) break
            if(position[x][y].startsWith(enemy)) {
                moves.push([x,y])
                break;
            }
            if(position[x][y].startsWith(us)) {
                break;
            }
            moves.push([x,y])
        }
    })
    console.log(moves)
    return moves
}

export const getKingMoves = ({position,piece,rank,file}) => {
    
    const moves =[]
    const us = piece[0]
    const enemy = us=='w'?'b':'w'

    const direction = [
        [1,1],
        [1,-1],
        [-1,1],
        [-1,-1],
        [-1,0],
        [1,0],
        [0,-1],
        [0,1],
    ]

    const getEnemyMoves = () => {
        enemyMoves = []
        const findPiece = (piece) => {
            pieces = []
            for(let i=0;i<8; i++) {
                for(let j=0;j<8;j++) {
                    if(position[i][j]==piece) {
                        pieces.push([i,j]);
                    }
                }
            }
        }
        bishopPos = findPiece(enemy+'b')
        bishopPos.forEach(pos => {
            enemyMoves.append(getBishopMoves(position, enemy+'b',pos[0], pos[1]))
        })
        knightPos = findPiece(enemy+'h')
        knightPos.forEach(pos => {
            enemyMoves.append(getBishopMoves(position, enemy+'h',pos[0], pos[1]))
        })
        kingPos = findPiece(enemy+'k')
        kingPos.forEach(pos => {
            enemyMoves.append(getBishopMoves(position, enemy+'k',pos[0], pos[1]))
        })
        pawnPos = findPiece(enemy+'p')
        pawnPos.forEach(pos => {
            enemyMoves.append(getBishopMoves(position, enemy+'p',pos[0], pos[1]))
        })
        queenPos = findPiece(enemy+'q')
        queenPos.forEach(pos => {
            enemyMoves.append(getBishopMoves(position, enemy+'q',pos[0], pos[1]))
        })
        rookPos = findPiece(enemy+'r')
        rookPos.forEach(pos => {
            enemyMoves.append(getBishopMoves(position, enemy+'r',pos[0], pos[1]))
        })
        return enemyMoves
    }

    enemyMoves = getEnemyMoves()

    direction.forEach( dir => {
        if(!position[rank+dir[0]][file+dir[1]].startsWith(us) && !enemyMoves.includes([rank+dir[0],file+dir[1]])) {
            moves.push([rank+1,file+1]);
        }
    })
}
