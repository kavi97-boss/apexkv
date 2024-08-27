'use client';
import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

let started = false;
let pathSearchStarted = false;
let pathFound = false;

function page() {
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [finished, setFinished] = useState<boolean>(false);
	const [isPathSearchStarted, setIsPathSearchStarted] = useState<boolean>(false);

	const sketchRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function sketch(p: p5) {
			const CELL = 40;
			let cols: number, rows: number;
			let canvasWidth = window.innerWidth - (window.innerWidth % CELL) - CELL,
				canvasHeight = window.innerHeight - (window.innerHeight % CELL) - CELL;

			let grid: Cell[][] = [];

			let currentCell: Cell;
			let visitedCells: Cell[] = [];

			let pathCells: Cell[] = [];
			let currentPathCell: Cell;

			let startCell: Cell;
			let endCell: Cell;

			class Cell {
				x: number;
				y: number;

				wall_t: boolean;
				wall_b: boolean;
				wall_l: boolean;
				wall_r: boolean;

				visited: boolean;
				is_start: boolean;
				is_end: boolean;
				is_path: boolean;
				visited_path: boolean;

				constructor(x: number, y: number) {
					this.x = x;
					this.y = y;

					this.wall_t = true;
					this.wall_b = true;
					this.wall_l = true;
					this.wall_r = true;

					this.visited = false;
					this.is_start = false;
					this.is_end = false;
					this.is_path = false;
					this.visited_path = false;
				}
				show() {
					p.noFill();

					let pos_x = this.x * CELL;
					let pos_y = this.y * CELL;

					if (this.is_start) {
						p.noStroke();
						p.fill(152, 62, 200);
						p.rect(pos_x + 4, pos_y + 4, CELL - 8);
					}
					if (this.is_end) {
						p.noStroke();
						p.fill(200, 185, 128);
						p.rect(pos_x + 4, pos_y + 4, CELL - 8);
					}

					p.stroke(255);
					if (this.wall_t) p.line(pos_x, pos_y, pos_x + CELL, pos_y); // top
					if (this.wall_b) p.line(pos_x, pos_y + CELL, pos_x, pos_y + CELL); // bottom
					if (this.wall_l) p.line(pos_x, pos_y, pos_x, pos_y + CELL); // left
					if (this.wall_r) p.line(pos_x + CELL, pos_y, pos_x + CELL, pos_y); // right
				}
				highlightPath() {
					let pos_x = this.x * CELL;
					let pos_y = this.y * CELL;

					if (this.is_path) {
						p.noStroke();
						if (this.is_start) {
							p.fill(152, 62, 200);
							p.rect(pos_x + 4, pos_y + 4, CELL - 8);
						} else if (this.is_end) {
							p.fill(200, 185, 128);
							p.rect(pos_x + 4, pos_y + 4, CELL - 8);
						} else {
							p.fill(36, 127, 246);
							p.circle(pos_x + CELL / 2, pos_y + CELL / 2, CELL - 30);
						}
					}
				}

				cellVisited() {
					this.visited = true;
				}

				checkNeighbours() {
					let neighbors: Cell[] = [];

					let top = this.y - 1 >= 0 ? grid[this.y - 1][this.x] : undefined;
					let bottom = this.y + 1 < rows ? grid[this.y + 1][this.x] : undefined;
					let left = this.x - 1 >= 0 ? grid[this.y][this.x - 1] : undefined;
					let right = this.x + 1 < cols ? grid[this.y][this.x + 1] : undefined;

					if (top && !top.visited) neighbors.push(top);
					if (bottom && !bottom.visited) neighbors.push(bottom);
					if (left && !left.visited) neighbors.push(left);
					if (right && !right.visited) neighbors.push(right);

					if (neighbors.length > 0) {
						let chosenCell = neighbors[p.floor(p.random(0, neighbors.length))];

						this.removeWalls(this, chosenCell);

						return chosenCell;
					} else {
						return undefined;
					}
				}

				getNextPathNeighbours() {
					let neighbors: Cell[] = [];

					let top = this.y - 1 >= 0 ? grid[this.y - 1][this.x] : undefined;
					let bottom = this.y + 1 < rows ? grid[this.y + 1][this.x] : undefined;
					let left = this.x - 1 >= 0 ? grid[this.y][this.x - 1] : undefined;
					let right = this.x + 1 < cols ? grid[this.y][this.x + 1] : undefined;

					if (!this.wall_t && top && !top.visited_path) neighbors.push(top);
					if (!this.wall_b && bottom && !bottom.visited_path) neighbors.push(bottom);
					if (!this.wall_l && left && !left.visited_path) neighbors.push(left);
					if (!this.wall_r && right && !right.visited_path) neighbors.push(right);

					if (neighbors.length > 0) {
						let chosenCell = neighbors[p.floor(p.random(0, neighbors.length))];
						return chosenCell;
					} else {
						return undefined;
					}
				}

				removeWalls(a: Cell, b: Cell) {
					let x = a.x - b.x;
					let y = a.y - b.y;
					// going right
					if (x === 1) {
						a.wall_l = false;
						b.wall_r = false;
					}
					// going left
					else if (x === -1) {
						a.wall_r = false;
						b.wall_l = false;
					}
					// going down
					if (y === 1) {
						a.wall_t = false;
						b.wall_b = false;
					}
					// going up
					else if (y === -1) {
						a.wall_b = false;
						b.wall_t = false;
					}
				}

				highlight() {
					let pos_x = this.x * CELL;
					let pos_y = this.y * CELL;
					p.noStroke();
					p.fill(158, 27, 27);
					p.rect(pos_x, pos_y, CELL);
				}
			}

			p.setup = () => {
				p.createCanvas(canvasWidth, canvasHeight).parent(sketchRef.current as HTMLDivElement);
				p.frameRate(100);
				cols = p.floor(canvasWidth / CELL);
				rows = p.floor(canvasHeight / CELL);

				for (let j = 0; j < rows; j++) {
					grid.push([]);
					for (let i = 0; i < cols; i++) {
						const cell = new Cell(i, j);
						grid[j][i] = cell;
					}
				}

				currentCell = grid[p.floor(p.random(0, rows))][p.floor(p.random(0, cols))];
				visitedCells.push(currentCell);

				startCell = grid[0][0];
				startCell.is_start = true;

				endCell = grid[rows - 1][cols - 1];
				endCell.is_end = true;

				pathCells.push(startCell);
				currentPathCell = startCell;

				pathCells = [startCell];
				currentPathCell = startCell;
				pathFound = false;
				// Reset all visited_path flags
				for (const cellList of grid) {
					for (const cell of cellList) {
						cell.visited_path = false;
						cell.is_path = false;
					}
				}
				startCell.is_path = true;
			};

			p.draw = () => {
				p.background(0);
				for (const cellList of grid) {
					for (const cell of cellList) {
						cell.show();
						cell.highlightPath();
					}
				}
				currentCell.cellVisited();
				if (visitedCells.length > 0) {
					currentCell.highlight();
				} else {
					started = false;
					setIsStarted(false);
					setFinished(true);
				}
				if (started) {
					let next = currentCell.checkNeighbours();
					if (next) {
						next.cellVisited();
						currentCell = next;
						visitedCells.push(currentCell);
					} else {
						let removedCell = visitedCells.pop();
						if (removedCell) {
							currentCell = removedCell;
						}
					}
				}

				// Pathfinding algorithm
				if (pathSearchStarted && !pathFound) {
					if (currentPathCell === endCell) {
						pathFound = true;
					} else {
						let nextPathCell = currentPathCell.getNextPathNeighbours();
						if (nextPathCell) {
							nextPathCell.is_path = true;
							nextPathCell.visited_path = true;
							pathCells.push(nextPathCell);
							currentPathCell = nextPathCell;
						} else {
							if (pathCells.length > 1) {
								// prevent removing start cell
								let removedPathCell = pathCells.pop();
								if (removedPathCell) {
									removedPathCell.is_path = false; // Mark the cell as not being part of the path anymore
									currentPathCell = pathCells[pathCells.length - 1];
								}
							}
						}
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
			<h1>Maze Generator</h1>
			<div>
				<div ref={sketchRef} className="w-full h-full bg-white"></div>
			</div>
			{!finished ? (
				<button
					className="px-4 py-1 rounded-full shadow-md bg-indigo-600 text-white"
					onClick={() => {
						started = !started;
						setIsStarted(!isStarted);
					}}
				>
					{isStarted ? 'Pause' : 'Start'}
				</button>
			) : (
				<button
					className="px-4 py-1 rounded-full shadow-md bg-indigo-600 text-white"
					onClick={() => {
						pathSearchStarted = !pathSearchStarted;
						setIsPathSearchStarted(!isPathSearchStarted);
					}}
				>
					{isPathSearchStarted ? 'Stop Pathfinding' : 'Start Pathfinding'}
				</button>
			)}
		</div>
	);
}

export default page;
