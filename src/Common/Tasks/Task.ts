import ResolvedTask from "./ResolvedTask";

export class Task extends ResolvedTask {
    resolve(result: string) {
        return new ResolvedTask(this.id, result.slice(0,4), this.tabId);
    }
}

export interface ITask{
    id: string;
    content: string;
}