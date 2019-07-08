import React, { Component, Fragment } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import Sortable from 'react-sortablejs';

class TreeNode extends Component {
  static propTypes = {
    node: shape({
      nodes: arrayOf(
        shape({
          code: string.isRequired,
          id: number.isRequired,
          title: string.isRequired,
        })
      ),
    }),
    title: string,
  };

  state = { visible: true };

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  onChange = () => false;

  render() {
    let childNodes;
    let className;

    const {
      node: {
        nodes, title,
      },
    } = this.props;

    if (nodes != null) {
      childNodes = nodes.map((node, index) => (
        <li key={index}>
          <TreeNode node={node} />
        </li>
      ));

      className = 'toggleable';
      if (nodes.length) {
        if (this.state.visible) {
          className += ' toggleable-up';
        } else {
          className += ' toggleable-down';
        }
      }
    }

    let style;

    if (!this.state.visible) {
      style = { display: 'block' };
    } else {
      style = { display: 'none' };
    }

    return (
      <Fragment>
        <Sortable
          className="table_tree"
          options={{
            filter: '.pvtFilterBox',
            ghostClass: 'pvtPlaceholder',
            group: 'shared',
            preventOnFilter: false,
          }}
          tag="div"
          onChange={this.onChange}
        >
          <h4 className="main_tree" className={className} data-id={title} onClick={this.toggle}>
            <span className="pvtAttr ">{title}</span>
          </h4>
        </Sortable>
        <ul className="child_tree" style={style}>
          {childNodes}
        </ul>
      </Fragment>
    );
  }
}

export default TreeNode;
