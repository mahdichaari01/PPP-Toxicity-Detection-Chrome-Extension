export const get = async <V>(key: string) => {
    const result = await chrome.storage.local.get([key]);
    if (!result[key]) throw new Error(`Key ${key} not found in storage`);
    return result[key] as V;
}

export const set = async <V>(key: string, value: V) => {
    try {
        await chrome.storage.local.set({ [key]: value });
    } catch (e) {
        throw new Error(`Error setting ${key} to ${value}: ${e}, contact developer`);
    }
}
