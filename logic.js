class LogicCheck {
  #parameterLength = (callbacks) => Math.max(...callbacks.map(cb => cb.length));
  #hasIdenticalValues = (comparedValues) => new Set(comparedValues).size === 1;
  
  #generateTruthTable = (n) => Array.from(Array(2 ** n)).map(
    (_, i) => Array.from(Array(n)).map((_, j) => !!(i & (2 ** j)))
  );

  #printTruthTable = (predicates, propositionalVariables, results) => {
    console.table(predicates.map((p, i) => {
      const predicateBody = p.toString();
      const varsStart = predicateBody.indexOf('(');
      const varsEnd = predicateBody.indexOf(')');
      const variables = predicateBody.slice(varsStart + 1, varsEnd).split(',').map(v => v.trim());
      const row = variables.reduce((rowData, v, k) => {
        rowData[v] = propositionalVariables[k];
        return rowData;
      }, {});
      row.predicate = predicateBody;
      row.result = results[i];
      return row;
    }));
  };

  #forAllPredicates = (predicates, propositionalVariables, printTable) => {
    const results = predicates.map(predicate => predicate(...propositionalVariables));

    if (printTable) {
      this.#printTruthTable(predicates, propositionalVariables, results);
    }

    return results;
  }
  
  isTheSameReasoning = (predicates, printTable = false) => this.#generateTruthTable(this.#parameterLength(predicates))
    .every((row) => this.#hasIdenticalValues(this.#forAllPredicates(predicates, row, printTable)));
}

const logos = new LogicCheck();
