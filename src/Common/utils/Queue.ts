interface IQueue<T> {
	dequeue(): T
	enqueue(item: T): void
	dequeueN(n: number): T[]
	size(): number
}

export class Queue<T> implements IQueue<T> {
	private queue: T[] = []
	dequeue(): T {
		return this.queue.shift()!
	}
	enqueue(item: T): void {
		this.queue.push(item)
	}
	dequeueN(n: number): T[] {
		return this.queue.splice(0, n)
	}
	size(): number {
		return this.queue.length
	}
	constructor(items?: T[]) {
		this.queue = items || []
	}
}
