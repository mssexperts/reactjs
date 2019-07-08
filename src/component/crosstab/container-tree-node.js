import React, { Component, Fragment } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import Sortable from 'react-sortablejs';

class ContainerTreeNode extends Component {
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
          <ContainerTreeNode node={node} />
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
        <h4 className="main_tree" className={className} data-id={title} onClick={this.toggle}>
          <span>{title}</span>
        </h4>
        <Sortable
          className=""
          options={{
            filter: '.pvtFilter',
            ghostClass: 'pvtPlaceholder',
            group: 'shared',
            preventOnFilter: false,
          }}
          tag="div"
          onChange={() => false}
        >
          <ul className="child_tree col-row-ul" style={style}>
            {childNodes}
          </ul>
        </Sortable>
      </Fragment>
    );
  }
}

export default ContainerTreeNode;
