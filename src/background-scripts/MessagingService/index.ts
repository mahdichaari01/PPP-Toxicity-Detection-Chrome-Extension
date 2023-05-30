import { MessageTypes, Task, TasksMessage } from "../../Common";
import { IScheduler } from "../Scheduler";


export type messageHandler= (message: TasksMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void

export class MessagingService {
    constructor(private scheduler: IScheduler<Task>, private notify: () => void) { };
    sendMessages<T>(tabid: number, message: T): void {
        chrome.tabs.sendMessage(tabid, message);
    };
    listen(): void{
        chrome.runtime.onMessage.addListener(this.handleReceivedMessage);
    };
    handleReceivedMessage: messageHandler = (message, sender, sendResponse) => {
        if (message.type === MessageTypes.TasksMessage && sender.tab && sender.tab.id) {
            // @ts-ignore
            this.scheduler.addTasks(message.payload.map((task)=>new Task(task.id,task.content,sender.tab.id)), sender.tab.id);
            this.notify();
        }
    }

}