import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Person } from './person';

@Injectable()
export class PersonService {
	constructor() {}

	data = [
		{
			name: 'Alexander',
			age: 47,
			gender: 'male',
			married: true,
			imgUrl: '/assets/images/alex.jpg'
		},
		{ name: 'Brunhilde', age: 27, gender: 'female', married: false },
		{ name: 'Susi', age: 37, gender: 'female', married: false }
	];

	getPersons(): Observable<Person[]> {
		return of(this.data).pipe(delay(2000));
	}
}
