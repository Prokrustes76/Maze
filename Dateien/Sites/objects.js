class Map {
	constructor() {
		this.area    = [[1,1,1,1,1,1,1,1,1,1],
										[1,0,0,0,0,0,0,1,0,1],
										[1,0,1,0,1,0,0,1,0,1],
										[1,0,1,0,1,1,1,1,0,1],
										[1,0,1,0,0,0,0,0,0,1],
										[1,0,1,1,0,1,1,1,1,1],
										[1,0,0,1,0,0,0,0,0,1],
										[1,1,1,1,0,1,0,1,0,1],
										[1,0,0,0,0,1,0,1,0,1],
										[1,1,1,1,1,1,1,1,1,1]]
		this.heigth	= this.area.length
		this.width	= this.area[0].length
	}

	show() {
		ctx.fillStyle = '#ccc'
		for (let i = 0; i < this.heigth; i++)
			for (let j = 0; j < this.width; j++){
				if (this.area[i][j] === 1) {
					ctx.fillRect(690+j*10,10+i*10,10,10)
				}
			}
	}

	checkCollision(x,y) {
		x = Math.floor(x/10)
		y = Math.floor(y/10)
		if (x < 0 || x > 9 || y < 0 || y > 9 || this.area[y][x] === 1)
			return true
		
		return false
	}
}

class View {

	berechneDistanz(dir) {
		for (let i = 0; i <120; i +=0.1) {
			if (map.checkCollision(player.x + Math.cos(dir) * i, player.y + Math.sin(dir) * i))
			return Math.min((1/i)*10,1)
		}
	}

	background(z) {
		if (z === 1) {
			for(let i = 0; i < 300; i += 3) {
			let a = Math.floor(Math.abs(i-150))
			ctx.fillStyle = `rgb(${a},${a},${a})`
			ctx.fillRect(30,10+i,630,3)
			}
		}
		ctx.fillStyle = '#555'
		if (z === 2) {
			ctx.fillRect(0,0,800,10)
			ctx.fillRect(0,10,30,300)
			ctx.fillRect(660,10,170,300)
			ctx.fillRect(0,310,800,600)
			ctx.strokeStyle = 'white'
			ctx.strokeRect(30,10,630,300)
		}
	}

	show() {
		this.background(1)
		for (let i = -45; i < 45; i += 0.1) { 
			let wert = this.berechneDistanz(player.direction + i/180*Math.PI)
			let a = Math.pow(wert,1.2) * 200 + 25
			a = `rgb(${a},${a},${a})`
			ctx.fillStyle = a
			wert /= Math.cos(i/360*Math.PI)
			wert *= 150 
			ctx.fillRect(30 + (i+45) * (630/90), 160-+wert, 1.2, wert*2)
		}
		this.background(2)
	}
}

class Player {
	constructor() {
		this.x 			= 65
		this.y 			= 85
		this.size		= 3
		this.direction	= 1.5 * Math.PI
		this.view		= new View()
	}

	show() {
		ctx.save()
		ctx.translate(this.x + 690, this.y + 10)
		ctx.rotate(this.direction)
		for (let i = 0; i < 2; i++) {
			ctx.fillStyle = i === 0 ? 'black' : 'orange'
			ctx.beginPath();
			ctx.arc(0, 0, this.size, (0.5 + i) * Math.PI, (1.5 + i) * Math.PI);
			ctx.fill();
		}
		ctx.restore()
	}

	rota(angle) {
		this.direction = (this.direction + angle) % (2 * Math.PI)
	}

	move(direction) {
		let x = Math.cos(this.direction) * direction
		let y = Math.sin(this.direction) * direction
		if (map.checkCollision(x+this.x,y+this.y)) 
			return
		this.x += x
		this.y += y
	}
}