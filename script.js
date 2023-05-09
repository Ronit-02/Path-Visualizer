let main = document.querySelector(".main");
let rowcount = 26;
let columncount = 68;
let flag = false;
let borderflag = false;
let startflag = false;
let endflag = false;
let solved = false;
let startpoint = '';
let endpoint = '';
let visited = {};
let path = {};

function Start_point() {
    startflag = true;
    flag = false;
    borderflag = false;
    endflag = false;
    document.getElementById("status").innerHTML = "Set the Start Point";
}
function Border() {
    borderflag = true;
    startflag = false;
    flag = false;
    endflag = false;
    document.getElementById("status").innerHTML = "Set the border";
}
function End_point() {
    startflag = false;
    flag = false;
    borderflag = false;
    endflag = true;
    document.getElementById("status").innerHTML = "Set the End Point";
}
main.onmousedown = () => {
    flag = true;
}
main.onmouseup = () => {
    flag = false;
}

// BFS
async function bfs(i, j,idprev) {
    await new Promise(resolve => setTimeout(resolve, 20));
    let id = "" + i + ',' + j;
    
    if (id in visited) {
        return 1;
    }
    if (j >= columncount || i >= rowcount || j < 0 || i < 0) {
        return 1;
    }
    
    if (document.getElementById(id).classList.contains("borderblock")||document.getElementById(id).classList.contains("solblock")) {
        return 1;
    }
    path[id]=idprev;
    if (document.getElementById(id).classList.contains("enderblock")) {
        solved = true;
        document.getElementById("status").innerHTML = "done!";
        let nex=id;
        console.log(path);
        while(nex!=path[nex]){
            
            document.getElementById(nex).classList.remove("movementblock");
            document.getElementById(nex).classList.add("solblock");
            document.getElementById(nex).style.animationPlayState = "running";
            nex=path[nex];
        }
        console.log(path);
        return 0;
    }
    document.getElementById(id).style.animationPlayState = "running";
    visited[id] = 1;
    if (!solved)
        bfs(i, Number(j) + 1,id);
    if (!solved)
        bfs(i, Number(j) - 1,id);
    if (!solved)
        bfs(Number(i) + 1, j,id);
    if (!solved)
        bfs(Number(i) - 1, j,id);
    if (solved) {
        return 0;       
    } 
    return 1;
}

// DFS
async function dfs(i, j,idprev) {
    await new Promise(resolve => setTimeout(resolve, 10));
    let id = "" + i + ',' + j;
    
    if (id in visited) {
        return 1;
    }
    if (j >= columncount || i >= rowcount || j < 0 || i < 0) {
        return 1;
    }
    
    if (document.getElementById(id).classList.contains("borderblock")) {
        return 1;
    }
    path[id]=idprev;
    if (document.getElementById(id).classList.contains("enderblock")) {
        solved = true;
        document.getElementById("status").innerHTML = "dONE";
        let nex=id;
        console.log(path);
        while(nex!=path[nex]){
            
            document.getElementById(nex).classList.remove("movementblock");
            document.getElementById(nex).classList.add("solblock");
            document.getElementById(nex).style.animationPlayState = "running";
            nex=path[nex];
        }
        console.log(path);
        return 0;
    }
    document.getElementById(id).style.animationPlayState = "running";
    visited[id] = 1;

    await new Promise(function(resolve) {
        resolve(dfs(Number(i)-1,j,id));
    });
    await new Promise(function(resolve) {
        if(!solved)
            resolve(dfs(i,Number(j)+1,id));
    });
    await new Promise(function(resolve) {
        if(!solved)
            resolve(dfs(Number(i)+1,j,id));
    });
    await new Promise(function(resolve) {
        if(!solved)
            resolve(dfs(i,Number(j)-1,id));
    });
    if (solved) {
        return 0;
    } 
    return 1;
}

// BFS Queue
async function bfsq(i, j,idprev) {
    
    let id = "" + i + ',' + j;
    q=[id];
    let visited = {};
    while(q!=[]){
        let [r,c] = q.shift().split(",");
        id = "" + r + ',' + c;
        visited[id] = 1;
        
        if(document.getElementById(id).classList.contains("enderblock")){
            solved=true;
            document.getElementById("status").innerHTML = "dONE";
            break;
        }
        if (document.getElementById(id).classList.contains("borderblock")||document.getElementById(id).classList.contains("solblock")) {
            continue;
        }
        document.getElementById(id).style.animationPlayState = "running";
        c=Number(c)+1;
        if (!(c >= columncount || r >= rowcount || c < 0 || r < 0)) {
            ins = "" + r + ',' +c;
            if (!(ins in visited)) {
                q.push(ins);
                visited[ins] = 1;
                path[ins]=id;
            }
            
        }
        c=c-2;
        if (!(c >= columncount || r >= rowcount || c < 0 || r < 0)) {
            ins = "" + r + ',' +c;
            if (!(ins in visited)) {
                q.push(ins);
                visited[ins] = 1;
                path[ins]=id;
            }
            
        }
        c=c+1;
        r=Number(r)+1;
        if (!(c >= columncount || r >= rowcount || c < 0 || r < 0)) {
            ins = "" + r + ',' +c;
            if (!(ins in visited)) {
                q.push(ins);
                visited[ins] = 1;
                path[ins]=id;
            }
            
        }
        r=r-2;
        if (!(c >= columncount || r >= rowcount || c < 0 || r < 0)) {
            ins = "" + r + ',' +c;
            if (!(ins in visited)) {
                q.push(ins);
                visited[ins] = 1;
                path[ins]=id;
            }
            
        }
        r=r+1;
        await new Promise(resolve => setTimeout(resolve, 0));
       
    }
        
        if (solved==true){
            let nex=id;
            console.log(path);
            while(nex!=path[nex]){
                
                document.getElementById(nex).classList.remove("movementblock");
                document.getElementById(nex).classList.add("solblock");
                document.getElementById(nex).style.animationPlayState = "running";
                nex=path[nex];
            }
            console.log(path);
            return 0;
        }
    return 1;
}

// Dijkstra
async function Dijkstra(i, j,idprev) {
    
    let id = "" + i + ',' + j;
    queue=[id];
    let visit = {};
    let weight=[1];
    while(queue!=[]){
        let [row,col] = queue.shift().split(",");
        let temp=weight.shift();
        id = "" + row + ',' + col;
        visit[id] = 1;        
        if(document.getElementById(id).classList.contains("enderblock")){
            solved=true;
            document.getElementById("status").innerHTML = "dONE";
            break;
        }
        if (document.getElementById(id).classList.contains("borderblock")||document.getElementById(id).classList.contains("solblock")) {
            continue;
        }
        document.getElementById(id).style.animationPlayState = "running";
        row=Number(row)+1;
        if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
            temp_id = "" + row + ',' +col;
            if (!(temp_id in visit)) {
                queue.push(temp_id);
                weight.push(temp+1);
                visit[temp_id] = 1;
                path[temp_id]=id;
            }
            
        }
        row=row-1;
        col=Number(col)-1;
        if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
            temp_id = "" + row + ',' +col;
            if (!(temp_id in visit)) {
                queue.push(temp_id);
                weight.push(temp+1);
                visit[temp_id] = 1;
                path[temp_id]=id;
            }
            
        }
        row=row-1;
        col=col+1;
        if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
            temp_id = "" + row + ',' +col;
            if (!(temp_id in visit)) {
                queue.push(temp_id);
                weight.push(temp+1);
                visit[temp_id] = 1;
                path[temp_id]=id;
            }
            
        }
        row=row+1
        col=col+1;
        if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
            temp_id = "" + row + ',' +col;
            if (!(temp_id in visit)) {
                queue.push(temp_id);
                weight.push(temp+1);
                visit[temp_id] = 1;
                path[temp_id]=id;
            }
            
        }
        await new Promise(resolve => setTimeout(resolve, 1));
       
    }
    if (solved==true){
        let nex=id;
        console.log(path);
        while(nex!=path[nex]){
            
            document.getElementById(nex).classList.remove("movementblock");
            document.getElementById(nex).classList.add("solblock");
            document.getElementById(nex).style.animationPlayState = "running";
            nex=path[nex];
        }
        console.log(path);
        return 0;
    }
}

const dropDown = (algo) => {
    document.getElementById('dropbtn').innerHTML = algo
}

const Solve = () => {
    document.getElementById("status").innerHTML = "Solving the maze";
    borderflag = false;
    arr = startpoint.split(',');
    let id = "" + arr[0] + ',' + arr[1];
    const algo = document.getElementById('dropbtn').innerHTML;
    if (algo=="BFS"){
        bfs(arr[0], arr[1],id);
    }
    else if(algo=="BFSq"){
        bfsq(arr[0], arr[1],id);
    }
    else if(algo=="DFS"){
        dfs(arr[0], arr[1],id);
    }
    else if(algo=="Dijkstra"){
        Dijkstra(arr[0], arr[1],id);
    }  

}

for (let i = 0; i < rowcount; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    main.appendChild(row);
    for (let j = 0; j < columncount; j++) {
        let block = document.createElement("div");
        block.id = "" + i + "," + j;
        block.classList.add("movementblock");
        block.onmouseover = () => {
            if (flag && borderflag) {
                block.classList.remove("movementblock");
                block.classList.add("borderblock");
                block.style.animationPlayState = "running";
                console.log(block.id);
            }
        };
        block.onclick = () => {
            if (borderflag) {
                block.classList.remove("movementblock");
                block.classList.add("borderblock");
                block.style.animationPlayState = "running";
                console.log(block.id);
            }
            else if (block.id != startpoint && startpoint && startflag && document.getElementById(block.id).classList.contains("movementblock")) {
                block.classList.remove("movementblock");
                block.classList.add("starterblock");
                block.style.animationPlayState = "running";
                document.getElementById(startpoint).style.animationPlayState = "paused";
                document.getElementById(startpoint).classList.remove("starterblock");
                document.getElementById(startpoint).classList.add("movementblock");
                startpoint = block.id;
                console.log(block.id, startpoint);
            }
            else if (block.id != startpoint && startflag && document.getElementById(block.id).classList.contains("movementblock")) {
                block.classList.remove("movementblock");
                block.classList.add("starterblock");
                block.style.animationPlayState = "running";
                startpoint = block.id;
                console.log(block.id, startpoint);
            }
            else if (block.id != endpoint && endpoint && endflag && document.getElementById(block.id).classList.contains("movementblock")) {
                block.classList.remove("movementblock");
                block.classList.add("enderblock");
                block.style.animationPlayState = "running";
                document.getElementById(endpoint).style.animationPlayState = "paused";
                document.getElementById(endpoint).classList.remove("enderblock");
                document.getElementById(endpoint).classList.add("movementblock");
                endpoint = block.id;
                console.log(block.id, endpoint);
            }
            else if (block.id != endpoint && endflag && document.getElementById(block.id).classList.contains("movementblock")) {
                block.classList.remove("movementblock");
                block.classList.add("enderblock");
                block.style.animationPlayState = "running";
                endpoint = block.id;
                console.log(block.id, endpoint);
            }
        };
        row.appendChild(block);
    }
}