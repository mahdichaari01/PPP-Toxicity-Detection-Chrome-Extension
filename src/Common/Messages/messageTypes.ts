import { ITask, Task } from "../Tasks";
import ResolvedTask from "../Tasks/ResolvedTask";

enum MessageTypes {
    TasksMessage = 'TaskMessage',
    ResolvedTaskMessage = 'ResolvedTaskMessage',
    ChangedThreshold = 'ChangedThreshold',
    getThreshold = 'getThreshold',
}
interface BaseMessage {
    type: MessageTypes;
}

interface TasksMessage {
    type: MessageTypes.TasksMessage;
    payload: ITask[];
}

interface ResolvedTaskMessage {
    type: MessageTypes.ResolvedTaskMessage;
    payload: ResolvedTask[];
}


type Message = TasksMessage | ResolvedTaskMessage;

export { MessageTypes, BaseMessage, TasksMessage, ResolvedTaskMessage, Message };