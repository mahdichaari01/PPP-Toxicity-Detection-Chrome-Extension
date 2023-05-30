interface ILIFOQueue<T> {
	enqueue(item: T): void
	dequeue(): T
	peek(): T
	size(): number
}

export class LIFOQueue<T> implements ILIFOQueue<T> {
	private queue: T[] = []
	enqueue(item: T): void {
		const alreadyExistant = this.queue.findIndex((i) => i === item)
		if (alreadyExistant === -1) {
			this.queue.push(item)
		} else {
			this.queue.splice(alreadyExistant, 1)
			this.queue.push(item)
		}
	}
	dequeue(): T {
		return this.queue.splice(this.queue.length - 1, 1)[0]
	}
	peek(): T {
		return this.queue[this.queue.length - 1]
	}
	size(): number {
		return this.queue.length
	}
}
