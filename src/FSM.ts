import FSMState from "./FSMState";
import FSMnode from "./FSMnode";
import NodeResult from "./NodeResult";

class FSM {
  currentNode: string;
  state: FSMState;
  nodes: { [stateName: string]: FSMnode };
  newStateCallback: (FSMState) => any | undefined;

  constructor(
    initialNode: string,
    nodes: { [nodeName: string]: FSMnode },
    newStateCallback?: (FSMState) => any
  ) {
    if (!nodes[initialNode])
      throw new Error(`initial node "${initialNode}" must be in nodes object`);
    this.currentNode = initialNode;
    this.nodes = nodes;
    this.newStateCallback = newStateCallback;
  }

  async initialize() {
    this.state = {};
    while (
      this.nodes[this.currentNode] &&
      this.nodes[this.currentNode].execute
    ) {
      const { nextState, nextNode }: NodeResult = await this.nodes[
        this.currentNode
      ].execute(this.state);
      this.state = nextState;
      this.currentNode = nextNode;
      if (this.newStateCallback) this.newStateCallback(nextState);
    }
  }
}
