let cvs, ctx, map, view, player
let paintNew = true, timer = 0

function logic() {
	timer++
}

function draw() {
	player.view.show()
	map.show()
	player.show()
	paintNew = false
}

function gameLoop() {
	logic()
	if (paintNew) draw()

	requestAnimationFrame(gameLoop)
}

function keyDown(event) {
	paintNew = true
	if(event.keyCode === 37)	player.rota(-0.05)
	if(event.keyCode === 39)	player.rota( 0.05)
	if(event.keyCode === 38)	player.move(   1)
	if(event.keyCode === 40)	player.move(-0.7)
}

document.addEventListener('keydown',keyDown)

window.onload = function() {
  cvs  		= document.getElementById('Canvas')
	ctx  		= cvs.getContext('2d')
	map  		= new Map()
	player 	= new Player()
	gameLoop()
}