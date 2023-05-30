import { Message, MessageTypes } from "./messageTypes";
export type messageHandler= (message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void
export type messageHandlers = Map<MessageTypes, messageHandler>;

export const messageRouter = (handlers: messageHandlers) => (message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    const handler = handlers.get(message.type);
    if (handler) {
        handler(message, sender, sendResponse);
    }
}