let main = document.querySelector(".main");
let rowcount = 24;
let columncount = Math.floor(window.innerWidth / 27);
let flag = false;
let borderflag = false;
let startflag = false;
let endflag = false;
let solved = false;
let startpoint = '';
let endpoint = '';
let visited = {};
let path = {};

// Resizing grid according to viewport
window.addEventListener("resize", () => {
    const width = window.innerWidth;
    
    columncount = Math.floor(width / 28);
    console.log(columncount)
    render()
});

function Start_point() {
    startflag = true;
    flag = false;
    borderflag = false;
    endflag = false;
    document.getElementById("status").innerHTML = "Select start point";
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
    document.getElementById("status").innerHTML = "Select end point";
}
main.onmousedown = () => {
    flag = true;
}
main.onmouseup = () => {
    flag = false;
}

// BFS
async function bfs(i, j, idprev) {

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
    if (document.getElementById(id).classList.contains("endblock")) {
        solved = true;
        document.getElementById("status").innerHTML = "done!";
        let next=id;
        console.log(path);
        while(next!=path[next]){
            
            document.getElementById(next).classList.remove("movementblock");
            document.getElementById(next).classList.add("solblock");
            document.getElementById(next).style.animationPlayState = "running";
            next=path[next];
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
async function dfs(i, j, idprev) {

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
    if (document.getElementById(id).classList.contains("endblock")) {
        solved = true;
        document.getElementById("status").innerHTML = "done!";
        let next=id;
        console.log(path);
        while(next!=path[next]){
            
            document.getElementById(next).classList.remove("movementblock");
            document.getElementById(next).classList.add("solblock");
            document.getElementById(next).style.animationPlayState = "running";
            next=path[next];
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
async function bfsq(i, j, idprev) {
    
    let id = "" + i + ',' + j;
    q=[id];
    let visited = {};
    while(q!=[]){
        let [r,c] = q.shift().split(",");
        id = "" + r + ',' + c;
        visited[id] = 1;
        
        if(document.getElementById(id).classList.contains("endblock")){
            solved=true;
            document.getElementById("status").innerHTML = "done!";
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
            let next=id;
            console.log(path);
            while(next!=path[next]){
                
                document.getElementById(next).classList.remove("movementblock");
                document.getElementById(next).classList.add("solblock");
                document.getElementById(next).style.animationPlayState = "running";
                next=path[next];
            }
            console.log(path);
            return 0;
        }
    return 1;
}

// Dijkstra
async function Dijkstra(i, j, idprev) {
    
    let id = "" + i + ',' + j;
    queue=[id];
    let visit = {};
    let weight=[1];
    while(queue!=[]){
        let [row,col] = queue.shift().split(",");
        let temp=weight.shift();
        id = "" + row + ',' + col;
        visit[id] = 1;        
        if(document.getElementById(id).classList.contains("endblock")){
            solved=true;
            document.getElementById("status").innerHTML = "done!";
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
        await new Promise(resolve => setTimeout(resolve, 10));
       
    }
    if (solved==true){
        let next=id;
        console.log(path);
        while(next!=path[next]){
            
            document.getElementById(next).classList.remove("movementblock");
            document.getElementById(next).classList.add("solblock");
            document.getElementById(next).style.animationPlayState = "running";
            next=path[next];
        }
        console.log(path);
        return 0;
    }
}

async function BiSearch (i, j, stId, x, y, endId) {

    await new Promise(resolve => setTimeout(resolve, 20));

    let id = "" + i + ',' + j;
    
    if (id in visited) {
        return 1;
    }
    if (j >= columncount || i >= rowcount || j < 0 || i < 0) {
        return 1;
    }
    
    if (document.getElementById(id).classList.contains("borderblock") || document.getElementById(id).classList.contains("solblock")) {
        return 1;
    }
    path[id] = stId;

    if (document.getElementById(id).classList.contains("endblock")) {
        solved = true;
        document.getElementById("status").innerHTML = "done!";
        let next=id;
        console.log("Path is ",path);
        while(next!=path[next]){
            
            console.log("next", next)
            console.log("path[next]", path[next])
            document.getElementById(next).classList.remove("movementblock");
            document.getElementById(next).classList.add("solblock");
            document.getElementById(next).style.animationPlayState = "running";
            next=path[next];
            // await new Promise(resolve => setTimeout(resolve, 20));
        }
        // console.log(path);
        return 0;
    }
    document.getElementById(id).style.animationPlayState = "running";
    visited[id] = 1;
    if (!solved)
        BiSearch(i, Number(j) + 1,id);
    if (!solved)
        BiSearch(i, Number(j) - 1,id);
    if (!solved)
        BiSearch(Number(i) + 1, j,id);
    if (!solved)
        BiSearch(Number(i) - 1, j,id);
    if (solved) {
        return 0;       
    } 
    return 1;
}

const dropDown = (text) => {
    document.getElementById('dropbtn').textContent = text
}
// const dropDown2 = (text) => {
//     document.getElementById('dropbtn').innerHTML = text
// }

async function Solve() {
    
    let start = Date.now();
  
    document.getElementById("status").innerHTML = "Solving the maze";
    borderflag = false;

    st = startpoint.split(',');
    let stId = "" + st[0] + ',' + st[1];
    
    end = endpoint.split(',');
    let endId = "" + end[0] + ',' + end[1];

    const algo = document.getElementById('dropbtn').textContent;
    console.log(algo)
  
    if (algo=="BFS"){
      await new Promise(function(resolve) {
          resolve(bfs(st[0], st[1], stId));
      });
    }
    else if(algo=="BFS Queue"){
      await new Promise(function(resolve) {
          resolve(bfsq(st[0], st[1], stId)); 
      });
    }  
    else if(algo=="DFS"){
      await new Promise(function(resolve) {
          resolve(dfs(st[0], st[1], stId));
      });
    }
    else if(algo=="Dijkstra"){
      await new Promise(function(resolve) {
          resolve(Dijkstra(st[0], st[1], stId)); 
      }); 
    } 
    else if(algo=="Bidirectional Search"){
        await new Promise(function(resolve) {
            resolve(BiSearch(st[0], st[1], stId, end[0], end[1], endId)); 
        }); 
    } 

    let timeTaken = Date.now() - start
    console.log("Time taken", timeTaken)
    document.getElementById('timer').innerHTML = timeTaken + "ms"; 

    console.log(columncount)
}

const render = () => {

    // clearing and re-rendering entire grid
    main.innerHTML = ''

    let grid = document.createElement("div")
    grid.classList.add("grid")
    main.appendChild(grid)

    console.log("rendering...")
    console.log(columncount)

    for (let i = 0; i < rowcount; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        grid.appendChild(row); 
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
                    block.classList.add("endblock");
                    block.style.animationPlayState = "running";
                    document.getElementById(endpoint).style.animationPlayState = "paused";
                    document.getElementById(endpoint).classList.remove("endblock");
                    document.getElementById(endpoint).classList.add("movementblock");
                    endpoint = block.id;
                    console.log(block.id, endpoint);
                }
                else if (block.id != endpoint && endflag && document.getElementById(block.id).classList.contains("movementblock")) {
                    block.classList.remove("movementblock");
                    block.classList.add("endblock");
                    block.style.animationPlayState = "running";
                    endpoint = block.id;
                    console.log(block.id, endpoint);
                }
            };
            row.appendChild(block);
        }
    }
}

render()