import { HardWorker } from "./modules/hard-worker.js"

const hardWorker = new HardWorker()

hardWorker.name = 'Alexandr'
hardWorker.age = 20
hardWorker.salary = 9999

console.log(hardWorker.toObject())
