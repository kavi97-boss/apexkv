'use client';
import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

class RubikCube {
	faces = {
		top: [
			['w', 'w', 'w'],
			['w', 'w', 'w'],
			['w', 'w', 'w'],
		],
		bottom: [
			['y', 'y', 'y'],
			['y', 'y', 'y'],
			['y', 'y', 'y'],
		],
		front: [
			['b', 'b', 'b'],
			['b', 'b', 'b'],
			['b', 'b', 'b'],
		],
		back: [
			['g', 'g', 'g'],
			['g', 'g', 'g'],
			['g', 'g', 'g'],
		],
		left: [
			['o', 'o', 'o'],
			['o', 'o', 'o'],
			['o', 'o', 'o'],
		],
		right: [
			['r', 'r', 'r'],
			['r', 'r', 'r'],
			['r', 'r', 'r'],
		],
	};

	rotateFace(face: string[][]) {
		let f1 = face[0][1];
		let f2 = face[0][2];
		let f3 = face[0][3];
		let f4 = face[1][1];
		let f5 = face[1][2];
		let f6 = face[1][3];
		let f7 = face[2][1];
		let f8 = face[2][2];
		let f9 = face[2][3];

		return [
			[f7, f4, f1],
			[f8, f5, f2],
			[f9, f6, f3],
		];
	}

	rotateTop() {
		let topFront = this.faces.front[0];
		let topBack = this.faces.back[0];
		let topLeft = this.faces.left[0];
		let topRight = this.faces.right[0];

		this.faces.front[0] = topRight;
		this.faces.back[0] = topLeft;
		this.faces.left[0] = topFront;
		this.faces.right[0] = topBack;

		this.faces.top = this.rotateFace(this.faces.top);
	}

	rotateBottom() {
		let bottomFront = this.faces.front[2];
		let bottomBack = this.faces.back[2];
		let bottomLeft = this.faces.left[2];
		let bottomRight = this.faces.right[2];

		this.faces.front[2] = bottomRight;
		this.faces.back[2] = bottomLeft;
		this.faces.left[2] = bottomFront;
		this.faces.right[2] = bottomBack;

		this.faces.bottom = this.rotateFace(this.faces.top);
	}

	rotateFront() {}
}

function Page() {
	const sketchRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function sketch(p: p5) {
			let colors = {
				top: p.color('#ffffff'),
				bottom: p.color('#ffff00'),
				left: p.color('#ff0000'),
				right: p.color('#fc9003'),
				front: p.color('#00ff00'),
				back: p.color('#0000ff'),
			};

			let isRotating = {
				top: false,
				bottom: false,
				left: false,
				right: false,
				front: false,
				back: false,
			};

			let ang = {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				front: 0,
				back: 0,
			};

			class Cubie {
				pos: p5.Vector;
				len: number;
				constructor(x: number, y: number, z: number, len: number) {
					this.pos = p.createVector(x, y, z);
					this.len = len;
				}

				show() {
					p.fill(255);
					p.stroke(0);
					p.strokeWeight(2);
					p.push();
					p.translate(this.pos.x, this.pos.y, this.pos.z);

					p.beginShape(p.QUADS);
					let r = this.len / 2;

					// z fixed
					// back
					p.fill(colors.back);
					p.vertex(-r, -r, -r);
					p.vertex(r, -r, -r);
					p.vertex(r, r, -r);
					p.vertex(-r, r, -r);

					// front
					p.fill(colors.front);
					p.vertex(-r, -r, r);
					p.vertex(r, -r, r);
					p.vertex(r, r, r);
					p.vertex(-r, r, r);

					// x fixed
					// left
					p.fill(colors.left);
					p.vertex(-r, -r, -r);
					p.vertex(-r, r, -r);
					p.vertex(-r, r, r);
					p.vertex(-r, -r, r);

					// right
					p.fill(colors.right);
					p.vertex(r, -r, -r);
					p.vertex(r, r, -r);
					p.vertex(r, r, r);
					p.vertex(r, -r, r);

					// y fixed
					// bottom
					p.fill(colors.bottom);
					p.vertex(-r, r, -r);
					p.vertex(r, r, -r);
					p.vertex(r, r, r);
					p.vertex(-r, r, r);

					// top
					p.fill(colors.top);
					p.vertex(-r, -r, -r);
					p.vertex(r, -r, -r);
					p.vertex(r, -r, r);
					p.vertex(-r, -r, r);

					p.endShape();

					// p.box(this.len);
					p.pop();
				}
			}

			class RubikCube {
				cubes: Cubie[][][] = [
					[[], [], []],
					[[], [], []],
					[[], [], []],
				];

				constructor() {
					for (let i = 0; i < dim; i++) {
						for (let j = 0; j < dim; j++) {
							for (let k = 0; k < dim; k++) {
								let len = 100;
								let offset = (len * (dim - 1)) / 2;
								let x = len * i - offset;
								let y = len * j - offset;
								let z = len * k - offset;
								this.cubes[i][j][k] = new Cubie(x, y, z, len);
							}
						}
					}
				}

				show() {
					for (let i = 0; i < dim; i++) {
						for (let j = 0; j < dim; j++) {
							for (let k = 0; k < dim; k++) {
								this.cubes[i][j][k].show();
							}
						}
					}
				}

				rotateTop() {
					// let a = this.cubes[0][0][0];
					p.rotateY(ang.top);
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							let cube = this.cubes[i][0][j];
							cube.show();
						}
					}
				}
				rotateFront() {
					// let a = this.cubes[0][0][0];
					p.rotateZ(ang.front);
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							let cube = this.cubes[i][j][0];
							cube.show();
						}
					}
				}
			}

			let canvasWidth = window.innerWidth,
				canvasHeight = window.innerHeight;
			let dim = 3;
			let rubikCube = new RubikCube();

			p.setup = () => {
				p.createCanvas(canvasWidth, canvasHeight, p.WEBGL).parent(sketchRef.current as HTMLDivElement);
				p.angleMode(p.DEGREES);
				p.normalMaterial();
			};

			p.draw = () => {
				p.background(50);

				p.orbitControl();

				p.rotateX(-30);
				p.rotateY(135);

				rubikCube.show();
				if (isRotating.top) {
					if (ang.top % 90 !== 0) {
						ang.top += 3;
					}
					rubikCube.rotateTop();
				}
				if (isRotating.front) {
					if (ang.front % 90 !== 0) {
						ang.front += 3;
					}
					rubikCube.rotateFront();
				}
			};

			p.keyPressed = (event: { key: string }) => {
				if (event.key === 't') {
					isRotating.top = true;
					if (ang.top % 90 === 0) {
						ang.top += 3;
					}
				} else if (event.key === 'f') {
					isRotating.front = true;
					if (ang.front % 90 === 0) {
						ang.front += 3;
					}
				}
			};
		}
		if (typeof window !== 'undefined') {
			const myP5 = new p5(sketch);

			// Cleanup function to remove the sketch when the component is unmounted
			return () => {
				myP5.remove();
			};
		}
	}, []);
	return (
		<div>
			{/* <h1>Rubik Cube Solver</h1> */}
			<div>
				<div ref={sketchRef} className="w-full h-full bg-white"></div>
			</div>
		</div>
	);
}

export default Page;
