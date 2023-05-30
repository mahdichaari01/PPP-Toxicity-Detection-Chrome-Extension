import { MessageTypes, ResolvedTaskMessage, Task, TasksMessage } from "../../Common";

export const handleTaskMessage = (message: TasksMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (!sender.tab) return;
    if (!sender.tab.id) return;
    console.log(message);
    // @ts-ignore
    const tasks = message.payload.map(task => new Task(task.id, task.content, sender.tab.id));
    chrome.tabs.sendMessage<ResolvedTaskMessage>(sender.tab?.id,
        {
            type: MessageTypes.ResolvedTaskMessage,
            payload: tasks.map(task => (task.resolve((Math.random() * 100).toString())))
        }).then(() => console.log('resolved tasks')).catch(err => console.log(err));
};