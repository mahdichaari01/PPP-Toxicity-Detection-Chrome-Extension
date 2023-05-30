import { messageHandlers, messageRouter } from "./messageRouter";

export const listen = (handlers: messageHandlers) => {
    chrome.runtime.onMessage.addListener(messageRouter(handlers));
}