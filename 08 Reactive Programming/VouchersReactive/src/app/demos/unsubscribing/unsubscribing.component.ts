import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, Observable, of, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-unsubscribing',
	templateUrl: './unsubscribing.component.html',
	styleUrls: [ './unsubscribing.component.scss' ]
})
export class UnsubscribingComponent implements OnInit, OnDestroy {
	constructor() {
		this.destroying.next(false);
	}

	mouseSubs: Subscription;
	result: { X: number; Y: number } = { X: 0, Y: 0 };
	destroying: BehaviorSubject<boolean> = new BehaviorSubject(false);

	ngOnInit() {
		this.subscribeScreen();
	}

	ngOnDestroy() {
		this.destroying.next(true);
	}

	subscribeScreen() {
		let pad = document.querySelector('.signPad');
		let mouse = fromEvent(pad, 'mousemove').pipe(
			map((evt: MouseEvent) => {
				return { X: evt.clientX, Y: evt.clientY };
			})
		);

		this.mouseSubs = mouse.pipe(takeUntil(this.destroying)).subscribe((point) => {
			this.result = point;
			console.log('Mouse Moved @: ', point);
		});
	}

	unsubscribeMouseEvt() {
		this.mouseSubs.unsubscribe();
		console.log('unsubscribed from Mouse Event');
	}
}
