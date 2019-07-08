import Storage from './storage';

let getElementCode = [];

let totalNodes = [];

class Crosstab {
  static crosstabInfo = () => {
    const crosstabDetails = Storage.get('crosstab');

    return crosstabDetails;
  };

  static getCodeValue = (dictionaryElements, cols) => {
    const codeValue = cols.map((col) => {
      const { code } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.title === col)[0];

      return code;
    });

    return codeValue;
  };

  static rowsAndColumnsList = (dictionaryElements, data) => {
    const {
      columns, rows, weight, filters, sheetId,
    } = data;

    const col = JSON.parse(columns);
    const row = JSON.parse(rows);
    const weighted = JSON.parse(weight);
    const filtered = JSON.parse(filters);

    const columnsList = col.map((value) => {
      const { title } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.code === value)[0];

      return title;
    });

    const rowsList = row.map((value) => {
      const { title } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.code === value)[0];

      return title;
    });

    const weightList = weighted.map((value) => {
      const { title } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.code === value)[0];

      return title;
    });

    const filtersList = filtered.map((value) => {
      const { title } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.code === value)[0];

      return title;
    });

    return {
      calculate: false,
      columns: columnsList || [],
      filters: filtersList || [],
      rows: rowsList || [],
      sheetId,
      weight: weightList || [],
    };
  };

  static mapTitleWithCode = (dictionaryElements, code) => {
    const { title } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.code === code)[0];

    return title;
  };

  static mapCodeWithTitle = (dictionaryElements, title) => {
    const { code } = dictionaryElements.filter((dictionaryElement) => dictionaryElement.title === title)[0];

    return code;
  };

  getNodes = (data) => {
    const { nodes } = data;

    totalNodes.push(data);

    if (nodes) {
      nodes.forEach((item) => {
        this.getNodes(item);
      });
    }
  };

  nodeTree = (updatedTree) => {
    totalNodes = [];

    updatedTree.forEach((item) => {
      this.getNodes(item);
    });

    return totalNodes;
  };

  elementCode = (data, updatedTree) => {
    const node = updatedTree.filter((item) => item.title === data.title)[0];

    if (!node.nodes.length) {
      getElementCode.push(node.code);
    }

    if (node.nodes.length) {
      node.nodes.forEach((item) => {
        this.elementCode(item, updatedTree);
      });
    }
  };

  getRowsAndColumnsCode = (element, updatedTree) => {
    getElementCode = [];

    element.forEach((item) => {
      this.elementCode(item, updatedTree);
    });

    return getElementCode;
  };
}

export default Crosstab;
