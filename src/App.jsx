import React, {useEffect, useRef, useState} from "react";


function App() {

	const [edit, setEdit] = useState(false);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	const polygon = useRef(p);

	const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle", {
		radius: 4, cx: 590, cy: 250, height: "100px", width: "100px",
		stroke: "white", fill: "dodgerblue"
	});


	const user = useRef(circle);
	let keydown = false;

	useEffect(() => {
		const k = (evt) => {
			if(edit) {
				if(evt.key === ' ') {
					document.getElementById('map').appendChild(polygon.current.cloneNode());
					polygon.current.points.clear();
				} else if(evt.ctrlKey && evt.key === 'z') {
					if(polygon.current.points.length)
						polygon.current.points.removeItem(polygon.current.points.length - 1);

				}
			} else if(!keydown) {
				keydown = true;
				if(evt.key === 'ArrowDown') {
					setY(y + 1);
				} else if(evt.key === "ArrowUp") {
					setY(y - 1);
				} else if(evt.key === "ArrowLeft") {
					setX(x - 1);
				} else if(evt.key === "ArrowRight") {
					setX(x + 1);
				}
			}
		}
		window.addEventListener('keydown', k);

		return () => {
			window.removeEventListener('keydown', k)
		}
	});

	const handleOnClick = (evt) => {
		if(!edit) return;

		const svg = document.getElementById('map');
		let point = svg.createSVGPoint();
		point.x = evt.pageX; point.y = evt.pageY;
		polygon.current.points.appendItem(point);
	}

	useEffect(() => {
		document.getElementById('map').appendChild(p);
		document.getElementById('map').appendChild(user.current);
	}, [p, circle]);


	useEffect(() => {
		const polygons = document.querySelectorAll('polygon');
		polygons.forEach((p) => {
			if(p.points.length) {
				let x = 0, y = 0;
				for(let i of Object.values(p.points)) {
					x += i.x; y += i.y;
				}
				x /= p.points.length; x = Number.parseInt(x);
				y /= p.points.length; y = Number.parseInt(y);

				const node = document.createElementNS("http://www.w3.org/2000/svg", "circle", {
					radius: '4px', cx: x, cy: y, width: "100px", height: "100px"
				});
				node.style.zIndex = 10;
				document.getElementById('map').appendChild(node);
			}
		})
	}, []);


	return (
		<div style={{
			width: "100vw", height: "100vh", margin: 0, overflow: "auto", background: "rgb(18 22 33)"
		}}>
			<svg
				// viewBox={`${x + 590 - 100},${y + 250 - 100} 200, 200`}
				onClick={handleOnClick} id={"map"} width={"100vw"} height={"100vh"} style={{
				position: "fixed", cursor: edit ? "pointer" : "default", overflow: "auto"
			}}>
				<circle cx={590} cy={250} transform={`translate(${x}, ${y})`} r="4" height="100px" width="100px" stroke={"white"} fill={"dodgerblue"} />
				<polygon points="544 230 535 247 567 255 576 228"></polygon>
				<polygon points="509 260 526 264 532 254 563 259 544 310 490 302 488 305 539 314 508 261 492 300 533 307"></polygon>
				<polygon points="461 364 510 373 535 318 488 307"></polygon>
				<polygon points="460 370 507 380 502 402 507 414 502 423 440 409"></polygon>
				<polygon points="447 414 427 453 480 463 497 427"></polygon>
				<polygon points="478 469 476 478 460 484 421 475 429 457"></polygon>
				<polygon points="417 478 459 490 452 505 409 496 407 501 449 510"></polygon>
				<polygon points="403 503 449 514 432 550 389 539"></polygon>
				<polygon points="386 544 379 560 421 571 429 554"></polygon>
				<polygon points="377 565 371 580 411 593 418 576"></polygon>
				<polygon
					points="361 585 343 624 373 632 374 630 393 630 398 627 400 623 403 621 407 619 412 619 413 614 416 607 411 597"></polygon>
				<polygon
					points="468 608 506 616 512 607 525 610 529 618 518 623 518 635 522 652 495 655 490 651 476 651 468 647 462 644 459 637 459 629"></polygon>
				<polygon points="471 605 477 589 513 596 504 612"></polygon>
				<polygon points="515 592 480 584 487 568 523 575"></polygon>
				<polygon points="524 572 491 563 482 553 493 528 500 525 508 521 517 501 553 511"></polygon>
				<polygon points="519 496 557 506 563 489 527 480"></polygon>
				<polygon points="535 459 529 475 565 484 573 467"></polygon>
				<polygon points="546 437 539 452 576 464 583 447"></polygon>
				<polygon points="546 433 583 441 593 424 557 414"></polygon>
				<polygon points="566 393 560 410 593 419 602 403"></polygon>
				<polygon
					points="568 389 647 407 652 397 659 389 671 388 683 388 684 352 665 349 662 344 663 332 652 337 641 335 622 334 607 337 594 347 599 366 586 374 575 375"></polygon>
				<polygon points="665 331 666 346 684 349 683 331"></polygon>
				<polygon points="688 331 686 372 712 372 713 332"></polygon>
				<polygon points="718 327 718 369 746 368 747 329"></polygon>
				<polygon points="752 322 753 365 775 364 776 324"></polygon>
				<polygon points="780 318 782 361 812 362 811 321"></polygon>
				<polygon points="815 318 844 315 844 357 817 356"></polygon>
				<polygon points="848 312 874 312 877 351 846 352"></polygon>
				<polygon points="520 624 524 650 583 642 576 617"></polygon>
				<polygon points="582 616 588 644 616 640 609 613"></polygon>
				<polygon points="612 612 618 636 646 633 640 612"></polygon>
				<polygon points="644 608 649 630 678 630 670 603"></polygon>
				<polygon points="672 603 684 628 709 627 701 598"></polygon>
				<polygon points="733 575 741 625 768 620 761 576"></polygon>
				<polygon points="761 575 773 624 801 624 789 571"></polygon>
				<polygon points="797 576 807 616 830 616 822 569"></polygon>
				<polygon points="829 572 835 613 859 613 861 566"></polygon>
				<polygon points="892 509 892 524 964 527 964 509"></polygon>
				<polygon points="892 486 892 502 968 504 963 486"></polygon>
				<polygon points="890 464 892 482 955 479 955 463"></polygon>
				<polygon points="891 439 891 456 956 454 956 439"></polygon>
				<polygon points="958 430 959 414 965 410 965 397 889 395 888 428"></polygon>
				<polygon className={"dest"} points="891 388 892 373 965 370 965 391"></polygon>
				<polygon points="883 335 880 363 965 365 964 350 939 343 928 329 916 314 881 310"></polygon>
				<polygon points="912 279 924 271 940 252 970 240 970 213 899 209 894 248 906 249 910 271"></polygon>
				<polygon points="904 270 907 252 879 253 877 271"></polygon>
				<polygon points="873 271 875 236 850 233 845 272"></polygon>
				<polygon points="844 275 843 237"></polygon>
				<polygon points="817 234 842 237 844 276 815 278"></polygon>
				<polygon points="812 283 783 282 783 247 810 249"></polygon>
				<polygon points="748 285 773 282 776 246 756 247"></polygon>
				<polygon points="740 252 718 252 718 284 741 288"></polygon>
				<polygon points="689 255 686 296 714 297 712 258"></polygon>
				<polygon
					points="670 257 682 257 682 291 657 292 649 286 628 288 618 278 614 268 615 258 614 250 609 248 614 237 616 228 666 231"></polygon>
				<polygon points="1023 209 1023 242 1048 251 1058 259 1069 268 1069 277 1113 273 1109 210"></polygon>
				<polygon points="1115 227 1117 270 1141 273 1140 232"></polygon>
				<polygon points="1148 230 1146 276 1174 277 1172 228"></polygon>
				<polygon points="1178 229 1180 280 1205 283 1203 231"></polygon>
				<polygon points="1212 211 1237 211 1242 284 1217 281"></polygon>
				<polygon points="1241 213 1248 285 1274 281 1268 211"></polygon>
				<polygon points="1273 212 1301 212 1302 289 1279 292"></polygon>
				<polygon points="1306 209 1305 292 1335 286 1351 284 1374 271 1374 255 1375 245 1368 226 1363 209"></polygon>
				<polygon points="1072 314 1065 328 1051 338 1033 347 1021 347 1022 363 1111 364 1111 313"></polygon>
				<polygon points="1023 366 1087 373 1087 415 1023 410"></polygon>
				<polygon points="1030 418 1030 437 1094 433 1095 413"></polygon>
				<polygon points="1033 438 1033 459 1076 455 1075 443"></polygon>
				<polygon points="1078 458 1074 438 1095 439 1103 459"></polygon>
				<polygon points="1060 462 1059 476 1105 481 1105 462"></polygon>
				<polygon points="1023 484 1025 507 1104 505 1104 481"></polygon>
				<polygon points="1024 513 1023 533 1106 534 1103 510"></polygon>
				<polygon
					points="1032 535 1086 543 1091 552 1119 554 1119 615 1092 607 1060 612 1032 605 1019 584 1023 571 1026 557 1025 545"></polygon>
				<polygon points="1426 210 1425 223 1410 221 1405 212"></polygon>
				<polygon points="1413 232 1435 220 1433 211 1493 211 1499 227 1425 246"></polygon>
				<polygon points="1426 254 1501 233 1510 244 1436 264"></polygon>
				<polygon points="1523 255 1537 288 1456 308 1424 307 1415 285 1433 275"></polygon>
				<polygon points="1451 310 1461 334 1552 312 1542 293"></polygon>
				<polygon points="1463 335 1476 355 1559 331 1553 321"></polygon>
				<polygon points="1477 361 1483 376 1569 353 1561 335"></polygon>
				<polygon points="1483 383 1489 392 1577 369 1573 358"></polygon>
				<polygon points="1488 403 1486 414 1491 424 1591 398 1582 383"></polygon>
				<polygon points="1496 428 1504 445 1602 420 1593 403"></polygon>
				<polygon points="1509 445 1509 465 1608 444 1601 430"></polygon>
				<polygon points="1509 469 1527 507 1533 529 1549 533 1576 524 1641 511 1616 452"></polygon>
				<polygon points="1553 533 1559 553 1654 529 1646 514"></polygon>
				<polygon points="1563 557 1569 574 1662 551 1650 529"></polygon>
				<polygon points="1574 575 1581 600 1668 569 1656 552"></polygon>
				<polygon
					points="1577 609 1582 622 1590 644 1594 668 1605 667 1626 669 1639 675 1650 674 1699 663 1727 657 1693 577"></polygon>
				<polygon points="1278 547 1307 552 1307 631 1278 630"></polygon>
				<polygon points="1311 550 1314 628 1370 639 1375 564"></polygon>
				<polygon points="1376 586 1378 633 1403 638 1403 614 1401 601 1400 590"></polygon>
				<polygon points="1407 587 1416 607 1419 611 1408 643 1471 653 1536 659 1528 626 1511 590 1504 569"></polygon>
				<polygon points="1435 579 1499 569 1488 546 1431 561"></polygon>
				<polygon points="1380 545 1480 520 1463 481 1364 502"></polygon>
				<polygon points="1391 545 1418 554 1424 568 1493 542 1488 526"></polygon>
				<polygon points="1351 479 1355 497 1461 478 1457 462"></polygon>
				<polygon points="1446 460 1444 438 1339 462 1350 474"></polygon>
				<polygon points="1343 454 1342 448 1346 443 1342 433 1433 414 1442 431"></polygon>
				<polygon points="1336 413 1342 430 1430 413 1425 393"></polygon>
				<polygon points="1353 387 1337 388 1329 403 1340 411 1360 406"></polygon>
				<polygon points="1358 388 1366 403 1401 393 1396 372"></polygon>
				<polygon points="1397 374 1401 391 1421 389 1415 376 1405 375"></polygon>
				<polygon points="1159 569 1158 619 1173 615 1176 575"></polygon>
				<polygon points="1181 575 1182 616 1236 621 1237 581"></polygon>
				<polygon points="1118 379 1119 311 1143 314 1149 378"></polygon>
				<polygon points="1150 320 1148 402 1179 401 1170 316"></polygon>
				<polygon points="1177 321 1180 401 1213 399 1207 320"></polygon>
				<polygon points="1213 324 1217 395 1247 396 1236 322"></polygon>
				<polygon points="1248 331 1245 399 1270 397 1273 332"></polygon>
				<polygon points="1280 331 1279 395 1300 398 1307 329"></polygon>
				<polygon points="1309 391 1302 346 1331 350 1338 384 1333 394"></polygon>
				<polygon
					points="972 278 979 274 989 273 1000 272 1010 272 1013 279 1019 287 1023 295 1014 300 1000 304 988 306 977 302 971 296 971 285 972 280"></polygon>
			</svg>
			<button onClick={() => setEdit(!edit)} className={"material-symbols-outlined"} style={{
				borderRadius: "100%", padding: "1rem", position: "fixed", margin: "2rem", bottom: 0, right: 0,
				color: "white", background: "dodgerblue", border: "none", zIndex: 10, cursor: "pointer"
			}}>{!edit ? 'edit' : 'cancel'}</button>
		</div>
	)
}

export default App;