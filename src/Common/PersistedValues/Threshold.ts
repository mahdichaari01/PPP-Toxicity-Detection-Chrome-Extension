import { get, set } from "../Storage/Storage"

export const  getThreshold = async() => {
    return await get<number>('threshold');
}

export const setThreshold = async (threshold: number) => {
    await set('threshold', threshold)
}

export const handleThresholdChange = (callback: (threshold: number) => void): void => {
    chrome.storage.local.onChanged.addListener((changes) => {
        if (changes.threshold) {
            callback(changes.threshold.newValue as number)
        }
    });
}