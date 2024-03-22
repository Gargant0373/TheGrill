import React, { useRef } from "react";
import { useEffect, useState } from "react";
import p5 from "p5";
import '../styles/ParticleText.css';

interface MyComponentProps {
	styleProp?: React.CSSProperties;
	textSizeProp: number;
}

/*
	The myP5 variable is used to store a p5 instance 
	the p parameter references a p5 instance
	
	@see https://p5js.org/reference/#/p5/p5
	@author https://github.com/MateiDumitrescu1
*/
function ParticleText({ styleProp, textSizeProp }: MyComponentProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const hoverDiv = useRef<HTMLDivElement>(null);
	const myP5 = useRef<p5 | null>(null);
	const flowSpeedRef = useRef<number>(0);
	const colorsRef = useRef<string[]>(["#BC6C25", "#fefae0"]);
	const [flowSpeed, setFlowSpeed] = useState(0);
	const [textWidth, setTextWidth] = useState(0);
	const [colorsUsed, setColorsUsed] = useState(["#BC6C25", "#fefae0"]);
	// Variables to change
	//TODO also play with flowOffset and gravity direction and force    

	// TODO make cursoe change into a fire emoji when hovering over the hover div

	const flowSpeedStep = 10;
	const canvasWidth = 800;
	const canvasHeight = 800;
	const textSize = textSizeProp;
	const text = "The Grill";
	// let colorsUsed = [
	// 	"#BC6C25",
	// 	"#fefae0"
	// ];
	// Variables to change

	const handleButtonDown = () => {
		setFlowSpeed(flowSpeedStep);
	};
	const handleButtonUp = () => {
		setFlowSpeed(0);
	};

	useEffect(() => {
		if (!myP5 || !myP5.current) return;

		if (hoverDiv.current) {
			// THE EVENT LISTENER TRIGGERS TWICE IN PULA MEA NUSH DE CE
			hoverDiv.current.addEventListener("mouseover", (e) => {
				setFlowSpeed(flowSpeedStep);
				setColorsUsed(["#BC6C25", "#fefae0", "#ff0000"]);
				myP5.current.updateFlowSpeed();
				myP5.current.updateColors();
			});
			hoverDiv.current.addEventListener("mouseleave", (e) => {
				setFlowSpeed(0);
				setColorsUsed(["#BC6C25", "#fefae0"]);
				myP5.current.updateFlowSpeed();
				myP5.current.updateColors();
			});
		}

		// Part for the p5JS sketch
		// let myP5; I don't need this anymore, I used a ref instead
		const sketch = (p) => {
			const { floor, min, max, TWO_PI, noise } = p;
			const system = {
				text: text,
				flow: 0,
				topSpeed: 600,
				lifeSpan: 2000,
				flowOffset: 2,
				gravity: {
					direction: 270,
					force: 0,
				},
			};
			p.updateFlowSpeed = () => {
				system.flow = flowSpeedRef.current;
			};
			p.updateColors = () => {
				colors = colorsRef.current;
			};
			let colors = colorsUsed;
			class Particle {
				base_size: number;
				index: number;
				spawn: p5.Vector;
				size: number;
				start: number;
				position: p5.Vector;
				velocity: p5.Vector;
				acceleration: p5.Vector;
				duration: number;
				drag: number;
				color: string;
				constructor(x: number, y: number, size: number, index: number) {
					this.base_size = size;
					this.index = index || 0;
					this.spawn = p.createVector(x, y);
					this.init();
					this.size = 0;
					this.start = 0;
					this.position = p.createVector(0, 0);
					this.velocity = p.createVector(0, 0);
					this.acceleration = p.createVector(0, 0);
					this.duration = 0;
					this.drag = 0;
					this.color = "";
				}

				init() {
					this.size = this.base_size * p.random(0.5, 1.5);
					this.start = p.millis();
					this.position = this.spawn.copy();
					this.velocity = p.createVector(0, 0);
					this.acceleration = p.createVector(0, 0);
					this.duration = system.lifeSpan * p.random(0.2, 1.2);
					this.drag = p.random(0.9, 1);
					this.addForce(
						//TODO add a new keyword if this doesnt work
						p5.Vector.fromAngle(p.random(TWO_PI), p.random(10)),
					);
					this.color = p.random(colors);
				}

				display() {
					let s = 1;
					if (p.millis() - this.start < this.duration * 0.1) {
						s = p.map(p.millis() - this.start, 0, this.duration * 0.1, 0, 1);
					} else if (p.millis() - this.start > this.duration * 0.5) {
						s = p.map(
							p.millis() - this.start,
							this.duration * 0.5,
							this.duration,
							1,
							0,
						);
					}
					p.fill(this.color);
					p.circle(
						this.position.x,
						this.position.y,
						this.size *
						s *
						p.map(this.velocity.mag(), 0, system.topSpeed, 0.5, 1.2),
					);
				}

				update() {
					this.velocity.add(this.acceleration);
					this.velocity.limit(system.topSpeed);
					this.velocity.mult(this.drag);
					this.position.add(this.velocity.copy().mult(1 / p.frameRate()));
					this.acceleration.mult(0);
					if (
						this.position.y > p.height ||
						p.millis() - this.start > this.duration
					) {
						this.init();
					}
				}
				addForce(vector: p5.Vector) {
					this.acceleration.add(vector);
				}
			}
			let particles = [];
			let field = [];
			let fieldStep;
			let gravity;
			function setGravity() {
				gravity = new p5.Vector.fromAngle(
					p.radians(system.gravity.direction),
					system.gravity.force,
				);
			}
			p.setup = () => {
				p.createCanvas(canvasWidth, canvasHeight);
				setGravity();
				p.init();
				p.frameRate(60);
				p.noStroke();
				p.colorMode(p.HSL, 100);
			};
			// p.windowResized = () => {
			// 	p.resizeCanvas(p.windowWidth, p.windowHeight);
			// };
			p.init = () => {
				p.clear();
				p.fill(0);
				// p.textStyle(p.BOLD);
				p.textSize(textSize);
				let textBoxWidth = p.textWidth(system.text);
				setTextWidth(textBoxWidth);
				// text() -> (text, x, y); x and y set the coordinates of the text's bottom-left corner
				p.text(system.text, (p.width - textBoxWidth) / 2, p.height / 2); // Why does textBoxWidth returns 29.something for Matei with textSize 300?

				// Scan the canvas searching for black pixels
				// particles will spawn from there :)
				p.noFill();
				particles = [];
				let step = p.floor(
					max(p.width, p.height) / min(160, min(p.width, p.height)),
				);
				let i = 0;
				for (let x = 0; x < p.width; x += step) {
					for (let y = 0; y < p.height; y += step) {
						let target_x = x + step / 2;
						let target_y = y + step / 2;
						let alpha = p.get(target_x, target_y)[3];
						if (alpha > 0.5) {
							particles.push(new Particle(target_x, target_y, step * 3, i));
							i++;
						}
					}
				}
				field = {};
				p.clear();
				step = fieldStep = p.floor(
					max(p.width, p.height) / min(20, min(p.width, p.height)),
				);
				i = 0;
				for (let x = 0; x < p.width; x += step) {
					for (let y = 0; y < p.height; y += step) {
						i++;
						const a = noise(i) * TWO_PI;
						field[`${x}-${y}`] = a;
						p.translate(x, y);
						p.rotate(a);
						p.rect(-step / 4, -step / 2, step / 2, step);
						p.resetMatrix();
					}
				}

				p.clear();
			};

			p.draw = () => {
				p.clear();
				// p.background(255); // comment this for a cool effect
				particles.forEach((particle, i) => {
					particle.addForce(gravity);
					// search field
					particle.addForce(
						//TODO add a new keyword if this doesnt work
						//new
						p5.Vector.fromAngle(
							field[
							`${particle.position.x - (particle.position.x % fieldStep)}-${particle.position.y - (particle.position.y % fieldStep)
							}`
							] + system.flowOffset,
							system.flow,
						),
					);
					particle.update();
					particle.display();
				});
			};
		};

		if (divRef.current) {
			myP5.current = new p5(sketch, divRef.current);
		}

		return () => {
			myP5.current.remove();
			hoverDiv.current.removeEventListener("mouseover", (e) => { });
			hoverDiv.current.removeEventListener("mouseleave", (e) => { });
		};
	}, [textSizeProp]);
	useEffect(() => {
		if (myP5.current) {
			flowSpeedRef.current = flowSpeed;
			myP5.current.updateFlowSpeed();
		}
		// console.log(flowSpeed);
	}, [flowSpeed]); // This effect depends on flowSpeed
	useEffect(() => {
		if (myP5.current) {
			colorsRef.current = colorsUsed;
			myP5.current.updateColors();
		}
		// console.log(flowSpeed);
	}, [colorsUsed]); // This effect depends on flowSpeed
	return (
		<div style={styleProp} className="container">
			<div ref={divRef}>
				{" "}
			</div>

			{/* <button className="button"
				type="button"
				onMouseDown={handleButtonDown}
				onMouseUp={handleButtonUp}
			>
				press me
			</button> */}
			<div className="hoverDiv" style={{ width: `${textWidth}px`, height: `${textSize}px` }} ref={hoverDiv}>

			</div>
		</div>
	);
}

export default ParticleText;
