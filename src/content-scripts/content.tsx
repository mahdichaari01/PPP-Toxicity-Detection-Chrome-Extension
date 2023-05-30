import {
  ITask,
  MessageTypes,
  ResolvedTaskMessage,
  Task,
  TasksMessage,
  listen,
  messageHandler,
} from "../Common";
import {
  getThreshold,
  handleThresholdChange,
} from "../Common/PersistedValues/Threshold";
import { ToxicityMessage } from "./FilteredElement/ToxicityMessage";
import "./content.css";
// const handlers = new Map<MessageTypes, messageHandler>();

// handlers.set(MessageTypes.ResolvedTaskMessage, (message, sender, f) => {
//   console.log(message);
// });

// handlers.set(MessageTypes.ChangedThreshold, (message, sender, f) => {
//   console.log(message);
// });

// listen(handlers);

// document.body.innerHTML = ToxicityMessage(36.7, "hello").outerHTML;

// chrome.runtime.sendMessage(
//   { type: MessageTypes.getThreshold },
//   function (response) {
//     console.log(response);
//   }
// );

async function bootstrap() {
  // const threshold = await getThreshold();
  let threshold = await getThreshold();

  //setup Task store
  const store = new Array<{ id: String; node: HTMLElement }>();

  //setup handlers
  const handlers = new Map<MessageTypes, messageHandler>();
  handlers.set(MessageTypes.ResolvedTaskMessage, (message, sender, f) => {
    console.log(message);
    // if (message.type !== MessageTypes.ResolvedTaskMessage) return;
    // message.payload.forEach((item) => {
    //   const { id, content } = item;
    //   const index = store.findIndex((x) => x.id === id);
    //   if (index === -1) return;
    //   const node = store[index].node;
    //   if (parseInt(content) >= threshold)
    //     node.innerHTML = ToxicityMessage(content, node.innerText).outerHTML;
    //   store.splice(index, 1);
    // });
  });
  listen(handlers);

  //setup observer
  const observer = new MutationObserver((mutations) => {
    let temp = new Array<ITask>();
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length === 0) return;
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const found = node.querySelectorAll(
            'div[dir="auto"]:not(:has([dir="auto"]))'
          );
          if (found.length === 0) return;
          found.forEach((x) => {
            if (x instanceof HTMLElement) {
              // console.log(x);
              store.push({ id: x.innerText, node: x });
              const item = { id: x.innerText, content: x.innerText };
              // console.log(item);
              temp.push(item);
              // temp.push(new Task(x.innerText, x.innerText, 0));
            }
          });
        }
      });
    });
    if (temp.length === 0) return;
    chrome.runtime.sendMessage({
      type: MessageTypes.TasksMessage,
      payload: temp,
    } as TasksMessage);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });
}
handleThresholdChange((newThreshold) => {
  console.log("threshold changed");
});
bootstrap();
