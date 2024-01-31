export const getRookMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us==='w'?'b':'w'

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
    const enemy = us==='w'?'b':'w'

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
            if(position?.[x]?.[y] === undefined) break
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
    const enemy = us==='w'?'b':'w'

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
        if(!position?.[rank + dir[0]]?.[file + dir[1]]?.startsWith(us))moves.push([rank + dir[0], file + dir[1]])
    })
    console.log(moves)
    return moves
}

export const getPawnMoves = ({position,prevPosition,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us==='w'?'b':'w'
    const one = (us==='w')?1:-1
    if(position?.[rank+one]?.[file] !=undefined && position?.[rank+one]?.[file] === "") {
        moves.push([rank+one,file]);
        if(rank===(one===1?1:6) && position?.[rank+2*one]?.[file] === "") {
            moves.push([rank+2*one,file]);
        }
    }

    if(position?.[rank+one]?.[file+one]!=undefined && position[rank+one][file+one].startsWith(enemy)) {
        moves.push([rank+one,file+one]);
    }

    if(position?.[rank+one]?.[file-one]!=undefined && position[rank+one][file-one].startsWith(enemy)) {
        moves.push([rank+one,file-one]);
    }
    const enemyPawn = (one==1?'bp':'wp')
    //console.log(prevPosition)
    if(prevPosition){
        //console.log(prevPosition)
        if(rank === (one==1?4:3)){

            if(position?.[rank]?.[file-1] === enemyPawn && position?.[rank+2*one]?.[file-1] === ''
            && prevPosition?.[rank]?.[file-1] === '' && prevPosition?.[rank+2*one]?.[file-1] === enemyPawn
            )moves.push([rank+one,file-1])

            if(position?.[rank]?.[file+1] === enemyPawn && position?.[rank+2*one]?.[file+1] === ''
            && prevPosition?.[rank]?.[file+1] === '' && prevPosition?.[rank+2*one]?.[file+1] === enemyPawn
            )moves.push([rank+one,file+1])
        }
    }
    return moves
}

export const getQueenMoves = ({position,piece,rank,file}) => {
    const moves =[]
    const us = piece[0]
    const enemy = us==='w'?'b':'w'

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
            if(position?.[x]?.[y] === undefined) break
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

export const getKingMoves = ({position, castleDirection, piece,rank,file}) => {
    
    const moves =[]
    const us = piece[0]
    const enemy = us==='w'?'b':'w'

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

    /*const getEnemyMoves = () => {
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

    enemyMoves = getEnemyMoves()*/

    direction.forEach(dir => {
        if(!position?.[rank + dir[0]]?.[file + dir[1]]?.startsWith(us))moves.push([rank + dir[0], file + dir[1]])
    })
    
    if(file !== 4 || rank % 7 !==0 || castleDirection ==='none'){
        return moves
    }
    if(piece.startsWith('w')){
        console.log("looking")
        console.log(castleDirection)
        if(['left','both'].includes(castleDirection) && !position[0][3] &&  !position[0][2] && !position[0][1] && position[0][0] ==='wr'){
            moves.push([0,2])
        }
        if(['right','both'].includes(castleDirection) && !position[0][5] &&  !position[0][6] && position[0][7]==='wr'){
            console.log("found!")
            moves.push([0,6])
        }
    }
    else{
        if(['left','both'].includes(castleDirection) && !position[7][3] &&  !position[7][2] && !position[7][1] && position[7][0] ==='br'){
            moves.push([7,2])
        }
        if(['right','both'].includes(castleDirection) && !position[7][5] &&  !position[7][6] && position[7][7]==='br'){
            moves.push([7,6])
        }
    }
    return moves
}
export const getCastleDirections = ({castleDirection, piece, rank, file}) =>{
    rank = Number(rank)
    file = Number(file)
    console.log('its ')
    console.log(piece)
    const direction = castleDirection[piece[0]];
    if(piece.endsWith('k'))return 'none'
    if(file==0){
        if(direction ==='both')return 'right'
        if(direction ==='left') return 'none'
    }
    if(file ==7){
        if(direction =='both') return 'left'
        if(direction =='right') return 'none'
    }

}
