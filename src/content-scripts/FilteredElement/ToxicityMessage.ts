export const ToxicityMessage = (percetage: string, text: string) => {
    const element = document.createElement('template')
    element.innerHTML = `
        <span class="deletedText">
        <span class="icon">Levitate</span> detected ${percetage}% toxicity in this message.
        </span>
    `.replace(/\s+/g, ' ').trim()
    return element.content.firstChild as HTMLElement
};