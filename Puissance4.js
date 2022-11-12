function createBoard(row, column){
	content.innerHTML="";
	let table = document.createElement('table');
	for (let r=0; r<row; r++) {
		board[r] = new Array();
		let row = document.createElement('tr');
		row.id = "R"+r;
		for (let c=0; c<column; c++){
			board[r][c] = 0;
			let column = document.createElement('td');
			column.id = "R" + r + "C" + c;
			row.appendChild(column);
		}
		table.appendChild(row);
	}
	content.appendChild(table);
}

function newGame(){
	createBoard(row, column);
	createEvent(row, column);
}

function createEvent(row, column){
	for (let r=0; r<row; r++){
		for (let c=0; c<column; c++){
			let cases = document.getElementById("R" + r + "C" + c);
			cases.addEventListener('click', clickEvent);
		}
	}
}

function clickEvent(){
	let L= Number(this.id.charAt(3));
	let K= row -1;
	while (K> -1){
		if(board[K][L] ==0){
			let caseMin = document.getElementById("R" + K + "C"+ L);
			let div = document.createElement("div");
			div.className = "player";
			caseMin.appendChild(div);
			div.style.backgroundColor = player == 1? "red": "yellow";
			board[K][L] = player;

			verifVictoire(K,L);
			player*=-1;
			K = -1;
		}else {
			K--
		}
	}
}

function verifVictoire(i,j){
	let countLine = 0;
	let h = 0;
	while (h< column) {
		if(board[i][h] == player){
			countLine++;
			h++;
		}else if (board[i][h] !== player && countLine ==4) {
			h++;
		}else {
			countLine = 0;
			h++;
		}
	}

	let countColumn = 0;
	let v = 0;
	while (v< row){
		if(board[v][j] == player) {
			countColumn++;;
			v++;
		}else if (board[v][j] !== player && countLine ==4){
			v++;
		}else {
			countColumn = 0;
			v++;
		}
	} 

	let countDiag = 0;
	let d=-Math.min(i,j);
	while (i + d < row && j + d < column && i + d >= 0 && j + d >= 0){
		if(board[i+d][j+d] == player){
			countDiag++;
			d++;
		} else if (board[i+d][j+d] !== player && countDiag == 4){
			d++;
		}else {
			contDiag = 0;
			d++; 
		}
	}

	let countAntiDiag = 0;
	let a=-Math.min(i, column-1-j);
	while (i + a < row && j - a < column && i + a >= 0 && j + a >= 0){
		if(board[i+a][j-a] == player){
			countAntiDiag++;
			a++;
		}else if(board[i+a][j-a] !== player && countAntiDiag == 4) {
			a++;
		}else {
			contAntiDiag = 0;
			a++;
		}
	}

	if(countLine >= 4 || countColumn >= 4 || countDiag >= 4 || countAntiDiag >=4){
		victoires = true;
		let gagnant = (player == 1) ? "red":"yellow";
		let victoire = document.createElement('div');
		victoire.innerHTML = "<h2>Le vainqueur est : "+gagnant+" </h2>";
		content.appendChild(victoire);
		for (let i=0; i<row; i++){
			for (let j = 0; j<column; j++){
				let cases = document.getElementById('R' + i + 'C' + j);
				cases.style.backgroundColor= "goldenrod";
				cases.removeEventListener('click', clickEvent);
			}
		}
	} else {
		//console.log("Dylan a perdu");
	}
}

let column = 7;
let row = 6;
let board = new Array();
let content = document.getElementById("content");
content.innerHTML= "Puissance 4 en javascript | Auteur Dylan | date de creation le 15/10/2022"
let player = 1;
let button = document.getElementById("newGame");

button.addEventListener("click", function(){
	player = 1;
	newGame();
});

