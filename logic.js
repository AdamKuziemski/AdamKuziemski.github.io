class LogicCheck {
  #parameterLength = (callbacks) => Math.max(...callbacks.map(cb => cb.length));
  #hasIdenticalValues = (comparedValues) => new Set(comparedValues).size === 1;
  
  #generateTruthTable = (n) => Array.from(Array(2 ** n)).map(
    (_, i) => Array.from(Array(n)).map((_, j) => !!(i & (2 ** j)))
  );
  
  #forAllPredicates = (predicates, propositionalVariables) => predicates.map(
    predicate => predicate(...propositionalVariables)
  );
  
  isTheSameReasoning = (predicates) => this.#generateTruthTable(this.#parameterLength(predicates))
    .every((row) => this.#hasIdenticalValues(this.#forAllPredicates(predicates, row)));
}

const logos = new LogicCheck();
