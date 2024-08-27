'use client';
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

let isStarted = false;

function main(p: p5, sketchRef: React.MutableRefObject<HTMLDivElement | null>) {
	const CELL = 60;

	const board = [
		[7, 8, 0, 4, 0, 0, 1, 2, 0],
		[6, 0, 0, 0, 7, 5, 0, 0, 9],
		[0, 0, 0, 6, 0, 1, 0, 7, 8],
		[0, 0, 7, 0, 4, 0, 2, 6, 0],
		[0, 0, 1, 0, 5, 0, 9, 3, 0],
		[9, 0, 4, 0, 6, 0, 0, 0, 5],
		[0, 7, 0, 3, 0, 0, 0, 1, 2],
		[1, 2, 0, 0, 0, 7, 4, 0, 0],
		[0, 4, 9, 2, 0, 6, 0, 0, 7],
	];

	let currentCell: { x: number; y: number } = { x: 0, y: 0 };
	let currentNumber: number = 0;
	let currentCellNumber: number = 0;
	let emptyCellList: { x: number; y: number }[] = [];
	let nonEmptyCellList: { x: number; y: number }[] = [];

	function drawcell(x: number, y: number, text: number, isEmpty: boolean) {
		p.strokeWeight(1);
		p.fill(255);
		p.square(x * CELL, y * CELL, CELL);
		p.fill(0);
		if (isEmpty) p.fill(200, 100, 34);
		p.text(text.toString(), x * CELL - CELL / 2 + CELL, y * CELL - CELL / 2 + CELL);
	}

	function drawEmptyCells() {
		for (let i = 0; i < emptyCellList.length; i++) {
			const pos = emptyCellList[i];
			const text = board[pos.y][pos.x];
			drawcell(pos.x, pos.y, text, true);
		}
	}

	function drawNonEmptyCells() {
		for (let i = 0; i < nonEmptyCellList.length; i++) {
			const pos = nonEmptyCellList[i];
			const text = board[pos.y][pos.x];
			drawcell(pos.x, pos.y, text, false);
		}
	}

	function checkNumberIsValid(position: { x: number; y: number }, newNumber: number): boolean {
		let row = board[position.y];

		// check if the number is in current row
		for (let i = 0; i < row.length; i++) {
			if (newNumber === row[i]) {
				return false;
			}
		}

		// check if the number is in current collumn
		for (let i = 0; i < row.length; i++) {
			if (newNumber === board[i][position.x]) {
				return false;
			}
		}

		let startPosX = p.floor(position.x / 3) * 3,
			startPosY = p.floor(position.y / 3) * 3;

		for (let y = startPosY; y < startPosY + 3; y++) {
			for (let x = startPosX; x < startPosX + 3; x++) {
				if (board[y][x] === newNumber) {
					return false;
				}
			}
		}

		return true;
	}

	p.setup = () => {
		p.createCanvas(CELL * 9, CELL * 9).parent(sketchRef.current as HTMLDivElement);
		p.textSize(24);
		p.textAlign(p.CENTER, p.CENTER);
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (board[i][j] === 0) {
					emptyCellList.push({ x: j, y: i });
				} else {
					nonEmptyCellList.push({ x: j, y: i });
				}
			}
		}

		currentCellNumber = 0;
		currentCell = emptyCellList[currentCellNumber];
		currentNumber = board[currentCell.y][currentCell.x];
	};

	p.draw = () => {
		// p.frameRate(10);
		p.background(0);
		drawNonEmptyCells();
		drawEmptyCells();

		p.strokeWeight(4);
		p.line(0, 2, CELL * 9, 2);
		p.line(0, CELL * 9 - 2, CELL * 9, CELL * 9 - 2);
		p.line(2, 0, 2, CELL * 9);
		p.line(CELL * 9 - 2, 0, CELL * 9 - 2, CELL * 9);

		p.line(CELL * 3, 0, CELL * 3, CELL * 9);
		p.line(CELL * 6, 0, CELL * 6, CELL * 9);
		p.line(0, CELL * 3, CELL * 9, CELL * 3);
		p.line(0, CELL * 6, CELL * 9, CELL * 6);

		if (isStarted) {
			if (currentCellNumber < emptyCellList.length && currentCellNumber >= 0) {
				currentNumber += 1;
				if (currentNumber <= 9) {
					if (checkNumberIsValid(currentCell, currentNumber)) {
						board[currentCell.y][currentCell.x] = currentNumber;
						currentCellNumber += 1;
						if (currentCellNumber < emptyCellList.length) {
							currentCell = emptyCellList[currentCellNumber];
							currentNumber = board[currentCell.y][currentCell.x];
						}
					} else {
						board[currentCell.y][currentCell.x] = currentNumber;
					}
				} else {
					board[currentCell.y][currentCell.x] = 0;
					currentNumber = 0;
					currentCellNumber -= 1;
					if (currentCellNumber >= 0) {
						currentCell = emptyCellList[currentCellNumber];
						currentNumber = board[currentCell.y][currentCell.x];
					}
				}
			} else {
				isStarted = false;
			}
		}
	};
}

function SudokuSolver() {
	const sketchRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function sketch(p: p5) {
			main(p, sketchRef);
		}
		const myP5 = new p5(sketch);

		// Cleanup function to remove the sketch when the component is unmounted
		return () => {
			myP5.remove();
		};
	}, []);

	return <div ref={sketchRef} className="w-full h-full bg-white"></div>;
}

function page() {
	return (
		<div>
			<h1>Sudoku solver</h1>
			<SudokuSolver />
			<button
				onClick={() => {
					isStarted = true;
				}}
				className="py-2 px-4 rounded-full bg-indigo-600 text-white"
			>
				Start Solving
			</button>
		</div>
	);
}

export default page;
