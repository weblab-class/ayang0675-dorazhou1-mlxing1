 export const ToCol = n =>String.fromCharCode(n+96)
 export const copyPosition = position=>{
    const newPosition = new Array(8).fill('').map(x=>new Array(8).fill(''))
    for(let rank = 0; rank<8; rank++){
        for(let file=0; file<8;file++){
            newPosition[rank][file]=position[rank][file]
        }
    }
    return newPosition
 }
 export const createPosition = ()=>{
    let position = new Array(8).fill('').map(x=>new Array(8).fill(''))
    position[0][0]='wr'; 
    position[0][1]='wh';
    position[0][2]='wb';
    position[0][3]='wq';
    position[0][4]='wk';
    position[0][5]='wb';
    position[0][6]='wh';
    position[0][7]='wr';
    position[1][0]='wp';
    position[1][1]='wp';
    position[1][2]='wp';
    position[1][3]='wp';
    position[1][4]='wp';
    position[1][5]='wp';
    position[1][6]='wp';
    position[1][7]='wp';

    position[7][7]='br';
    position[7][6]='bh';
    position[7][5]='bb';
    position[7][4]='bk';
    position[7][3]='bq';
    position[7][2]='bb';
    position[7][1]='bh';
    position[7][0]='br';
    position[6][7]='bp';
    position[6][6]='bp';
    position[6][5]='bp';
    position[6][4]='bp';
    position[6][3]='bp';
    position[6][2]='bp';
    position[6][1]='bp';
    position[6][0]='bp';
    return position
 }
 export const getEntangled = () => {
    
    // choose entangled 
    let entangled = new Array(8).fill('').map(x=>new Array(8).fill(''))

    const rank = [0,1];
    const file = [0,1,2,3,4,5,6,7];
    let pairs = []
    rank.forEach( (r) => {
        file.forEach( (f) => {
            pairs.push([r,f])
        })
    });
    let l = 16;


    for(let i=0; i<3; i++) {
        let first = Math.floor(Math.random() * l);
        let firstpair = pairs[first]
        pairs.splice(first, 1);
        l--;
        let secondpair = pairs[Math.floor(Math.random() * l)];
        l--;
        // whites
        entangled[firstpair[0]][firstpair[1]] = 'entangled-w-'+i;
        entangled[secondpair[0]][secondpair[1]] = 'entangled-w-'+i;
        // blacks
        entangled[7-firstpair[0]][firstpair[1]] = 'entangled-b-'+i;
        entangled[7-secondpair[0]][secondpair[1]] = 'entangled-b-'+i;
    }

    return entangled
}