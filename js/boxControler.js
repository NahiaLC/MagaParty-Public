let boxes = [];

function setTabletop(box){
    boxes = box;
    let elem = document.querySelector('#box-content');
    let maxline = 6, startcolum = 1; endcolum = 15; numbox = 1;

    const delay = () => new Promise(resolve => setTimeout(resolve, 50));
    (async () => {
        // Vuelta hacia abajo
        for(let i=1; i<=maxline; i++){
            let row = document.createElement("div");
            row.classList.add('row');
            row.classList.add('l_'+i);
            elem.appendChild(row);

            
            if (i%2!==0) {
                i > 1 && i < 6 ? startcolum = 10 : startcolum = 1;
                for(let j=startcolum+1; j<=endcolum; j++){
                    if((i>1 && i<6 && (j<7 || j>9)) || (i==1 && j!==startcolum)){ // No generar casillas
                        createBox(elem, numbox, i, j);
                        numbox++;
                        await delay();
                    }
                }        
            } else {
                i > 1 && i < 6 ? startcolum = 10 : startcolum = 1;
                for(let j=endcolum-1; j>=startcolum; j--){
                    if((i>1 && i<6 && (j<7 || j>9)) || (i==6 && j!==endcolum)){ // No generar casillas
                        createBox(elem, numbox, i, j);
                        numbox++;
                        await delay();
                    }
                }
            }
        }
        // Vuelta hacia arriba
        for(let i=maxline-1; i>1; i--){
            if (i%2===0) {
                i > 1 && i < 6 ? endcolum = 6 : endcolum = 15;
                for(let j=endcolum-1; j>=startcolum; j--){
                    if(i>1 && i<6 && (j<7 || j>9)){ // No generar casillas
                        createBox(elem, numbox, i, j);
                        numbox++;
                        await delay();
                    }
                }        
            } else {
                i > 1 && i < 6 ? endcolum = 6 : endcolum = 15;
                for(let j=startcolum+1; j<=endcolum; j++){
                    if(i>1 && i<6 && (j<7 || j>9)){ // No generar casillas
                        createBox(elem, numbox, i, j);
                        numbox++;
                        await delay();
                    }
                }
            }
        }
    })();
}
function createBox(elem, numB, line, colum){
    let box = document.createElement("div");
        box.id = "_"+numB;
        box.classList.add('box');
        box.classList.add(getRandomBox());
        box.classList.add('c_'+colum);
        if(hiddenBox){
            box.classList.add('hidden');
        }
        setTimeout(() => {elem.querySelector('.l_'+line).appendChild(box);}, 5000);
}
function getRandomBox(){
    let ok=false;
    let num, box;
    do{
        num = Math.floor(Math.random()*boxes.length);if(num===boxes.length){num=boxes.length-1;}
        if(boxes[num].split(':')[1] > 0){
            box = boxes[num].split(':')[0];
            boxes[num] = boxes[num].split(':')[0] + ":" + (boxes[num].split(':')[1] - 1)
            ok = true;
        }
    }while(!ok);

    return box;
}