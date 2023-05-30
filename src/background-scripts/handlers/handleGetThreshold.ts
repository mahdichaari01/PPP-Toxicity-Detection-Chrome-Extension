import { GetThresholdMessage } from "../../Common";

export const handleGetThreshold = (message: GetThresholdMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    sendResponse(3);
}