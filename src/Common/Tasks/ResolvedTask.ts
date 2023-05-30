import { BaseTask } from "../BaseTask";

export default class ResolvedTask implements BaseTask {
    constructor(
        public id: string,
        public content: string,
        public tabId: number,
    ) { }
}