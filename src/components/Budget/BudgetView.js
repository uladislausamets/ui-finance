import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import _ from 'lodash';
import PropTypes from 'prop-types';
import queryString from 'query-string';
// Components and Pages
import Layer from '@folio/stripes-components/lib/Layer';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import IfInterface from '@folio/stripes-components/lib/IfInterface';
import Button from '@folio/stripes-components/lib/Button';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import BudgetPane from './BudgetPane';

class BudgetView extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    onCloseEdit: PropTypes.func,
    parentResources: PropTypes.shape({}),
    parentMutator: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.connectedBudgetPane = this.props.stripes.connect(BudgetPane);
  }

  render() {
    const initialValues = this.getData();
    const query = location.search ? queryString.parse(location.search) : {};
    const detailMenu = (<PaneMenu>
      <IfPermission perm="budget.item.put">
        <IconButton
          icon="edit"
          id="clickable-editbudget"
          style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
          onClick={this.props.onEdit}
          href={this.props.editLink}
          title="Edit Budget"
        />
      </IfPermission>
    </PaneMenu>);

    if (!initialValues) {
      return (
        <Pane id="pane-budgetdetails" defaultWidth={this.props.paneWidth} paneTitle="Budget View" lastMenu={detailMenu} dismissible onClose={this.props.onClose}>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane id="pane-budgetdetails" defaultWidth={this.props.paneWidth} paneTitle={_.get(initialValues, ['name'], '')} lastMenu={detailMenu} dismissible onClose={this.props.onClose}>
        <Row>
          <Col xs={3}>
            <KeyValue label="name" value={_.get(initialValues, ['name'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label="code" value={_.toString(_.get(initialValues, ['code'], ''))} />
          </Col>
        </Row>
        <Layer isOpen={query.layer ? query.layer === 'edit' : false} label="Edit Budget Dialog">
          <this.connectedBudgetPane
            stripes={this.props.stripes}
            initialValues={initialValues}
            onSubmit={(record) => { this.update(record); }}
            onCancel={this.props.onCloseEdit}
            parentResources={this.props.parentResources}
            parentMutator={this.props.parentMutator}
          />
        </Layer>
      </Pane>
    )
  }

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const budget = (parentResources.records || {}).records || [];
    if (!budget || budget.length === 0 || !id) return null;
    return budget.find(u => u.id === id);
  }

  update(data) {
    this.props.parentMutator.records.PUT(data).then(() => {
      this.props.onCloseEdit();
    });
  }
}

export default BudgetView;