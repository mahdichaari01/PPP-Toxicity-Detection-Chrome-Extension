import {App} from "./background-scripts/App";
import { BackendFactory, FakeBackendFactory, IBackend } from "./Common/Backend";

const MAX_TASKS = 30;
//const backend = BackendFactory<{ id: string, content: string }[], { id: string, result: number }[]>('http://localhost:3000'); 
const FakeBackend = FakeBackendFactory<{ id: string, content: string }[], { id: string, result: number }[]>("",(tasks)=>tasks.map((task)=>({id:task.id,result:Math.random()*100})));

// const app=new App(backend,MAX_TASKS);
const app = new App(FakeBackend, MAX_TASKS);
app.start();
console.log('started');
console.log(app)