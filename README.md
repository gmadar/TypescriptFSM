Usage Example:

```
const fsm = new FSM("start", {
  "start": new FSMnode(async (state) => {
    return {
      nextState: { light: "red"},
      nextNode: "stop"
    }
  }),
  "stop": new FSMnode(async (state) => {
    await wait(5000)
    return {
      nextState: { light: "green" },
      nextNode: "walk"
    }
  }),
  "walk": new FSMnode(async (state) => {
    await wait(5000)
    return {
      nextState: { light: "orange", counter: 6 },
      nextNode: "wait"
    }
  }),
  "wait": new FSMnode(async (state) => {
    await wait(500)
    if(state.counter === 0){
      return {
        nextState: { light: "red" },
        nextNode: "stop"
      }
    }else if(state.counter % 2 === 0){
      return {
        nextState: { light: "black", counter: state.counter -1 },
        nextNode: "wait"
      }   
    }
    return {
      nextState: { light: "orange", counter: state.counter -1 },
      nextNode: "wait"
    }
  })
},
console.log);

fsm.initialize();
```
