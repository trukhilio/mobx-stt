import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';

import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends Component{
    state ={
      isEditing: false
    };
    render(){
        const { item } = this.props;
        return this.state.isEditing ? (
            this.renderEditable()
            ) : (
            <li className='item'>
                {item.image && <div><img src={item.image} alt="p"/></div>}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={this.onToggleEdit}>&#9998;</button>
                </span>
            </li>
        )
    }

    renderEditable() {
        return (
            <li className='item'>
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.onSaveEdit}>&#9745;</button>
                <button onClick={this.onCancelEdit}>&#x274E;</button>
            </li>
        )
    }

    onToggleEdit = () => {
        this.setState({
            isEditing: true,
            clone: clone(this.props.item)
        })
    };

    onCancelEdit = () => {
        this.setState({ isEditing: false })
    };

    onSaveEdit = () => {
      applySnapshot(this.props.item, getSnapshot(this.state.clone));
      this.setState({
          isEditing: false,
          clone: null,
      })
    }
}

export default observer(WishListItemView)
