import React, { useRef } from "react";
import { useEffect, useState } from "react";
import p5 from "p5";
import '../styles/ParticleText.css';
import { throttle } from 'lodash';
// the myP5 variable is used to store a p5 instance
// the p parameter references a p5 instance
interface MyComponentProps {
	styleProp?: React.CSSProperties;
	textSizeProp: number;
	canvasWidthVal: number;
	scanStepVal: number;
	particleSizeVal: number;
}
/**
 *	ParticleText component handles the navbar title animation.
 *	
 *	@see https://p5js.org/reference/#/p5/p5
 *	@author https://github.com/MateiDumitrescu1
*/
function ParticleText({ styleProp, textSizeProp, canvasWidthVal, scanStepVal, particleSizeVal }: MyComponentProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const hoverDiv = useRef<HTMLDivElement>(null);
	const myP5 = useRef<p5 | null>(null);
	const flowSpeedRef = useRef<number>(0);
	const colorsRef = useRef<string[]>(["#BC6C25", "#fefae0"]);
	const [textWidth, setTextWidth] = useState(0);
	// Variables to change
	//TODO also play with flowOffset and gravity direction and force    

	// TODO make cursor change into a fire emoji when hovering over the hover div

	const flowSpeedStep = 10;
	const canvasWidth = canvasWidthVal;
	const canvasHeight = 800;
	const textSize = textSizeProp;
	const text = "The Grill";
	const scanStep = scanStepVal;
	const particleSize = particleSizeVal;
	const throttleTime = 100;
	// const handleButtonDown = () => {
	// 	setFlowSpeed(flowSpeedStep);
	// };
	// const handleButtonUp = () => {
	// 	setFlowSpeed(0);
	// };

	interface CustomP5 extends p5 {
		updateFlowSpeed?: () => void;
		updateColors?: () => void;
		init(): void;
	}
	interface IParticle {
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
		init(): void;
		display(): void;
		update(): void;
		addForce(vector: p5.Vector): void;
	}
	useEffect(() => {
		const newParticleRender = throttle(() => {
			flowSpeedRef.current = flowSpeedStep;
			colorsRef.current = ["#BC6C25", "#fefae0", "#ff0000"];
			(myP5.current as CustomP5)?.updateFlowSpeed?.();
			(myP5.current as CustomP5)?.updateColors?.();
		}, throttleTime);
		const resetParticleRender = throttle(() => {
			flowSpeedRef.current = 0;
			colorsRef.current = ["#BC6C25", "#fefae0"];
			(myP5.current as CustomP5)?.updateFlowSpeed?.();
			(myP5.current as CustomP5)?.updateColors?.();
		}, throttleTime);
		if (hoverDiv.current) {
			hoverDiv.current.addEventListener("mouseover", newParticleRender);
			// hoverDiv.current.addEventListener("touchstart", () => {
			// 	setFlowSpeed(flowSpeedStep);
			// 	setColorsUsed(["#BC6C25", "#fefae0", "#ff0000"]);
			// 	(myP5.current as CustomP5)?.updateFlowSpeed?.();
			// 	(myP5.current as CustomP5)?.updateColors?.();
			// });
			hoverDiv.current.addEventListener("mouseleave", resetParticleRender);
			// hoverDiv.current.addEventListener("touchend", () => {
			// 	setFlowSpeed(flowSpeedStep);

			// 	setColorsUsed(["#BC6C25", "#fefae0", "#ff0000"]);
			// 	(myP5.current as CustomP5)?.updateFlowSpeed?.();
			// 	(myP5.current as CustomP5)?.updateColors?.();
			// });
		}
		// Part for the p5JS sketch
		// let myP5; I don't need this anymore, I used a ref instead
		const sketch = (p: CustomP5) => {
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
			let colors = colorsRef.current;
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
			let particles: IParticle[] = [];
			let field: Record<string, number> = {};
			let fieldStep: number;
			let gravity: p5.Vector;
			function setGravity() {
				gravity = p5.Vector.fromAngle(
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
				// change the font family
				// p.textFont("Arial");
				//change the font weight to lightest possible avalue
				p.textSize(textSize);
				let textBoxWidth = p.textWidth(system.text);
				setTextWidth(textBoxWidth);
				// text() -> (text, x, y); x and y set the coordinates of the text's bottom-left corner
				p.text(system.text, (p.width - textBoxWidth) / 2, p.height / 2); // Why does textBoxWidth returns 29.something for Matei with textSize 300?

				// Scan the canvas searching for black pixels
				// particles will spawn from there :)
				p.noFill();
				particles = [];
				let step = floor(
					max(p.width, p.height) / scanStep
				);
				let i = 0;
				for (let x = 0; x < p.width; x += step) {
					for (let y = 0; y < p.height; y += step) {
						let target_x = x + step / 2;
						let target_y = y + step / 2;
						let alpha = p.get(target_x, target_y)[3];
						if (alpha > 0.5) {
							particles.push(new Particle(target_x, target_y, step * particleSize, i));
							i++;
						}
					}
				}
				p.clear();
				step = fieldStep = floor(
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
				p.clear(); // Clear the background after each draw 
				// biome-ignore lint/complexity/noForEach: <explanation>
				particles.forEach((particle) => {
					particle.addForce(gravity);
					// search field
					particle.addForce(

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
			if (myP5.current) {
				myP5.current.remove();
			}
			if (hoverDiv.current) {
				hoverDiv.current.removeEventListener("mouseover", newParticleRender);
				hoverDiv.current.removeEventListener("mouseleave", resetParticleRender);
			}
		};
	}, [textSizeProp]);
	return (
		<div style={styleProp} className="container">
			<div ref={divRef}>
				{" "}
			</div>

			<div className="hoverDiv" style={{ width: `${textWidth}px`, height: `${textSize}px` }} ref={hoverDiv}>

			</div>
		</div>
	);
}

export default ParticleText;
