import { ITask, MessageTypes, Task } from "../Common";
import { MessagingService } from "./MessagingService";
import { Scheduler, IScheduler } from "./Scheduler";
import { IBackend } from "../Common/Backend";
export class App {
    private scheduler: IScheduler<Task> = new Scheduler<Task>();
    private backend: IBackend;
    private maxTasks: number;
    private messagingService: MessagingService;
    constructor(backend: IBackend, maxTasks: number = 10) {
        this.maxTasks = maxTasks;
        this.backend = backend;
        this.messagingService = new MessagingService(this.scheduler, this.loop);
    }
    public start() {
        this.messagingService.listen();
        this.loop();
    }
    public loop = async () => {
        // console.log('loop');
        if (this.scheduler.hasTasks()) {
            const tasks = this.scheduler.getTasks(this.maxTasks);
            const result = await this.backend.sendMessage<{ id: string, content: string }[], { id: string, result: number }[]>(tasks.map((task) => ({ id: task.id, content: task.content })));
            console.log(result);
            //construct a message from result and the tasks
            tasks.sort((a, b) => a.id.localeCompare(b.id));
            result.sort((a, b) => a.id.localeCompare(b.id));
            for (let i = 0; i < tasks.length; i++)
                this.messagingService.sendMessages(tasks[i].tabId, { type: MessageTypes.ResolvedTaskMessage, payload: { id: tasks[i].id, result: result[i].result*100 } });
            // this.messagingService.sendMessages(result);
            this.loop();
        }

    }
}

