import { BaseTask } from "../BaseTask";
import { MessageTypes } from "../Messages";

export default class ResolvedTask implements BaseTask {
    constructor(
        public id: string,
        public content: string,
        public tabId: number,
    ) { }
}

export interface IResolvedMessage {

    id: string;
    result: number;

}