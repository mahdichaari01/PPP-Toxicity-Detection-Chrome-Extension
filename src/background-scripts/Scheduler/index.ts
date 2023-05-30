import { Queue, LIFOQueue } from '../../Common/utils'
type PriorityLeveType = number | string

export interface IScheduler<T> {
	addTasks(task: T[], priorityLevel: PriorityLeveType): void
	// setHighPriority(priorityLevel: PriorityLeveType): void
	// getScheduler(): IScheduler<ITask>
	getTasks(n: number): T[]
	hasTasks(): boolean
}

export class Scheduler<T> implements IScheduler<T> {
	//store and priorityLevels are private
	//tasks are indexed by priorityLevel, they are processed in FIFO order
	private store: Map<PriorityLeveType, Queue<T>> = new Map()
	private priorityLevels: LIFOQueue<PriorityLeveType> =
		new LIFOQueue<PriorityLeveType>()
	addTasks(tasks: T[], priorityLevel: PriorityLeveType): void {
		this.priorityLevels.enqueue(priorityLevel)
		if (!this.store.has(priorityLevel)) {
			this.store.set(priorityLevel, new Queue<T>())
		}
		const queue = this.store.get(priorityLevel)
		if (!queue) throw new Error('Queue not found')
		tasks.forEach((task) => { queue.enqueue(task) })
	}

	getTasks(n: number): T[] {
		const tasks: T[] = []
		while (tasks.length < n) {
			const priorityLevel = this.priorityLevels.peek();
			if (!priorityLevel) break;
			const queue = this.store.get(priorityLevel)
			if (!queue) this.priorityLevels.dequeue()
			else {
				const task = queue.dequeue()
				if (!task) {
					this.priorityLevels.dequeue()
					continue;
				}
				tasks.push(task)
			}
		}
		return tasks
	}

	// getTasks(n: number): T[] {
	// 	const tasks: T[] = [];
	// 	this.priorityLevels.forEach((priorityLevel) => {
	// 		const queue = this.store.get(priorityLevel);
	// 		while (tasks.length < n) {
	// 			const task = queue.dequeue();
	// 			if (!task) break;
	// 			tasks.push(task);
	// 		}
	// 	}
	// }
	changePriorityLevel(priorityLevel: PriorityLeveType): void {
		this.priorityLevels.enqueue(priorityLevel)
	}
	hasTasks(): boolean {
		let count = 0;
		this.store.forEach((queue) => {
			count += queue.size()
		})
		return count > 0
	}
}
