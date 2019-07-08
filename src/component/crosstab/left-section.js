/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import difference from 'lodash/difference';
import isEqual from 'lodash/isEqual';
import intersectionWith from 'lodash/intersectionWith';
import { push } from 'connected-react-router';
import { array, arrayOf, string, bool, func, shape, number } from 'prop-types';
import { connect } from 'react-redux';
import Sortable from 'react-sortablejs';
import { fetchCrosstabAllReport, updateFilters, updateTreeDetails } from '../../actions/crosstab-action-types';
import TreeNode from './tree-node';
import ContainerTreeNode from './container-tree-node';
import FormattedMessage from '../common/formatted-message';
import Crosstab from '../../utils/crosstab';

const { nodeTree } = new Crosstab();

class LeftSection extends Component {
  static propTypes = {
    dictionary: arrayOf(
      shape({
        code: string.isRequired,
        expression: string,
        id: number.isRequired,
        title: string.isRequired,
      })
    ),
    fetchCrosstabAllReport: func.isRequired,
    pivotTableSectionIsHidden: bool.isRequired,
    push: func.isRequired,
    reportDisplaySettings: shape({
      dataItems: shape({
        aud: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        columnPercentage: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        index: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        rowPercentage: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        totalColumn: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        totalRow: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
        weight: shape({
          displayOrder: number,
          includeInReport: bool,
          title: string,
        }),
      }),
      weightFile: string,
    }),
    treeDetails: shape({
      columns: array.isRequired,
      filters: array.isRequired,
      rows: array.isRequired,
      weight: array.isRequired,
    }),
    updateFilters: func.isRequired,
    updateTreeDetails: func.isRequired,
  };

  materializeInput = (nextData) => {
    const attrOptions = [];

    Object.keys(nextData).forEach((attr) => {
      attrOptions.push(nextData[attr].title);
    });

    return attrOptions;
  };

  sendPropUpdate = (command) => {
    const {
      treeDetails,
      treeDetails: {
        columns, rows, filters, weight,
      },
      dictionary,
    } = this.props;

    let treeNodes = [];

    treeNodes = nodeTree(dictionary);

    if (Object.keys(command)[0] === 'columns') {
      const updatedDroppedNode = this.droppedAtrribute(command.columns.$set, columns);

      const updatedTreeDetails = {
        ...treeDetails,
        columns: updatedDroppedNode.map((node) => treeNodes.filter((tree) => tree.title === node)[0]),
      };

      this.props.updateTreeDetails(Array.isArray(updatedTreeDetails) ? this.props.treeDetails : updatedTreeDetails);
    }

    if (Object.keys(command)[0] === 'rows') {
      const updatedDroppedNode = this.droppedAtrribute(command.rows.$set, rows);

      const updatedTreeDetails = {
        ...treeDetails,
        rows: updatedDroppedNode.map((node) => treeNodes.filter((tree) => tree.title === node)[0]),
      };

      this.props.updateTreeDetails(Array.isArray(updatedTreeDetails) ? this.props.treeDetails : updatedTreeDetails);
    }

    if (Object.keys(command)[0] === 'filters') {
      const updatedDroppedNode = this.droppedAtrribute(command.filters.$set, filters);

      const updatedTreeDetails = {
        ...treeDetails,
        filters: updatedDroppedNode.map((node) => treeNodes.filter((tree) => tree.title === node)[0]),
      };

      this.props.updateTreeDetails(Array.isArray(updatedTreeDetails) ? this.props.treeDetails : updatedTreeDetails);
    }

    if (Object.keys(command)[0] === 'weight') {
      const updatedDroppedNode = this.droppedAtrribute(command.weight.$set, weight);

      const updatedTreeDetails = {
        ...treeDetails,
        weight: updatedDroppedNode.map((node) => treeNodes.filter((tree) => tree.title === node)[0]),
      };

      this.props.updateTreeDetails(Array.isArray(updatedTreeDetails) ? this.props.treeDetails : updatedTreeDetails);
    }

    this.props.fetchCrosstabAllReport({ calculate: false });
  };

  droppedAtrribute = (droppedElement, columns) => {
    let treeNodes = [];

    treeNodes = nodeTree(this.props.dictionary);
    const nodeTreeTitle = treeNodes.map((node) => node.title);

    const droppedNode = intersectionWith(droppedElement, nodeTreeTitle, isEqual);

    const currentDroppedNode = difference(droppedNode, columns.map((item) => item.title));

    const childNodes = this.props.dictionary.filter((tree) => tree.title === currentDroppedNode[0]);

    let filteredDroppedNode = [];

    let sortedDroppedNode = [];

    if (childNodes[0]) {
      if (childNodes[0].nodes) {
        filteredDroppedNode = difference(columns.map((tree) => tree.title), childNodes[0].nodes.map((node) => node.title));

        sortedDroppedNode = [...filteredDroppedNode, ...currentDroppedNode];
      } else {
        sortedDroppedNode = droppedNode;
      }
    } else {
      const droppedAttrNodes = nodeTree(columns).map((item) => item.title);

      const isChildNode = droppedAttrNodes.includes(currentDroppedNode[0]);

      if (isChildNode) {
        sortedDroppedNode = columns.map((item) => item.title);
      } else {
        sortedDroppedNode = [...droppedNode];
      }
    }

    const updatedDroppedNode = sortedDroppedNode.map((dropNode) => {
      const parentNode = intersectionWith([dropNode], this.props.dictionary.map((tree) => tree.title), isEqual);

      if (parentNode.length) {
        return parentNode[0];
      }

      return dropNode;
    });

    return updatedDroppedNode;
  };

  propUpdater = (key) => (value) => this.sendPropUpdate({ [key]: { $set: value } });

  makeDnDCell = (items, onChange, classes) => (
    <Sortable
      className={classes}
      options={{
        filter: '.pvtFilter',
        ghostClass: 'pvtPlaceholder',
        group: 'shared',
        preventOnFilter: false,
      }}
      tag="div"
      onChange={onChange}
    >
      {items.map((tree) => (
        <ContainerTreeNode node={tree} />
      ))}
    </Sortable>
  );

  makeTreeCell = () => this.props.dictionary.map((tree) => <TreeNode node={tree} />);

  render() {
    const {
      treeDetails: {
        columns, filters, rows, weight,
      },
      pivotTableSectionIsHidden,
      reportDisplaySettings: { weightFile },
    } = this.props;

    const unusedAttrsCell = this.makeTreeCell();

    const colAttrsCell = this.makeDnDCell(columns, this.propUpdater('columns'), 'pvtAxisContainer pvtHorizList pvtCols');

    const filterAttrsCell = this.makeDnDCell(filters, this.propUpdater('filters'), 'pvtAxisContainer pvtHorizList pvtfilters');

    const rowAttrsCell = this.makeDnDCell(rows, this.propUpdater('rows'), 'pvtAxisContainer pvtVertList pvtRows');

    const weightCell = this.makeDnDCell(weight, this.propUpdater('weight'), 'pvtAxisContainer pvtVertList pvtRows');

    return (
      <Fragment>
        {pivotTableSectionIsHidden && (
          <div className="ct-bar-left left-space">
            <h3>
              <img src={'/assets/images/all-crosstab.svg'} /> <FormattedMessage id="allFields" />
            </h3>
            <div className="dictinory-attr">{unusedAttrsCell}</div>
          </div>
        )}
        {pivotTableSectionIsHidden && (
          <div className="pvtUi right_crosstab_table">
            <h3>
              <img src={'/assets/images/columns-crosstab.svg'} />
              <FormattedMessage id="filters" />
            </h3>
            {filterAttrsCell}
            <h3>
              <img src={'/assets/images/columns-crosstab.svg'} />
              <FormattedMessage id="columns" />
            </h3>
            {colAttrsCell}
            <h3>
              <img src={'/assets/images/row-crosstab.svg'} />
              <FormattedMessage id="rows" />
            </h3>
            {rowAttrsCell}
            {typeof weightFile !== 'undefined' && weightFile.length === 0 && (
              <Fragment>
                <h3>
                  <img src={'/assets/images/row-crosstab.svg'} />
                  <FormattedMessage id="weight" />
                </h3>
                {weightCell}
              </Fragment>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ crosstab: { treeDetails } }) => ({ treeDetails });

export default connect(
  mapStateToProps,
  {
    fetchCrosstabAllReport,
    push,
    updateFilters,
    updateTreeDetails,
  }
)(LeftSection);
