import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import Icon from '@folio/stripes-components/lib/Icon';
import stripesForm from '@folio/stripes-form';
import { ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import List from '@folio/stripes-components/lib/List';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
// Components and Utils
import css from './css/BudgetForm.css';
import { Required } from '../../Utils/Validate';

class BudgetForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    deleteBudget: PropTypes.func,
    parentResources: PropTypes.object,
    parentMutator: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      fund_status_dd: [
        { label: "-- Select --", value: "" },
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Pending', value: 'Pending' },
      ],
      currency_dd: [
        { label: "-- Select --", value: "" },
        { label: 'Canadian Dollar', value: 'CAD' },
        { label: 'U.S. Dollar', value: 'USD' },
      ],
      ledger_dd: []
    }
    this.getLedger = this.getLedger.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const showDeleteButton = initialValues.id ? true : false;
    return (
      <div style={{ margin: "0 auto", padding: '0' }} className={css.BudgetForm}>
        <Row>
          <Col xs={8} style={{ margin: "0 auto", padding: '0' }}>
            <Row>
              <Col xs={6}>
                <Field label="Name" name="name" id="name" validate={[Required]} component={TextField} fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Budget Status" name="fund_status" id="fund_status" component={Select} fullWidth dataOptions={this.state.fund_status_dd} />
              </Col>
              <Col xs={6}>
                <Field label="Code" name="code" id="code" validate={[Required]} component={TextField} fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Limit ENC Ppercent" name="limit_enc_percent" id="limit_enc_percent" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Limit EXP Percent" name="limit_exp_percent" id="limit_exp_percent" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Allocation" name="allocation" id="allocation" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Awaiting Payment" name="awaiting_payment" id="awaiting_payment" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Available" name="available" id="available" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Encumbered" name="encumbered" id="encumbered" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Expenditures" name="expenditures" id="expenditures" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Over encumbrance" name="over_encumbrance" id="over_encumbrance" component={TextField} type="number" fullWidth />
              </Col>
              <Col xs={6}>
                <Field label="Fund" name="fund_id" id="fund_id" component={Select} fullWidth dataOptions={this.state.allocation_from} disabled />
              </Col>
              <Col xs={6}>
                <Field label="Fiscal Year" name="fiscal_year_id" id="fiscal_year_id" component={Select} fullWidth dataOptions={this.state.allocation_from} disabled />
              </Col>
              <Col xs={6}>
                <Field label="Tags" name="tags" id="tags" component={Select} fullWidth dataOptions={this.state.allocation_to} disabled />
              </Col>
            </Row>
            <IfPermission perm="fund.item.delete">
              <Row end="xs">
                <Col xs={12}>
                  {
                    showDeleteButton &&
                    <Button type="button" onClick={() => { this.props.deleteBudget(initialValues.id) }}>Remove</Button>
                  }
                </Col>
              </Row>
            </IfPermission>
          </Col>
        </Row>
      </div>
    ) 
  }

  getLedger() {
    const { parentResources } = this.props;
    const ledgers = (parentResources.ledger || {}).records || [];
    if (!ledgers || ledgers.length === 0) return null;
    let newArr = [];
    Object.keys(ledgers).map((key) => {
      let obj = {
        label: ledgers[key].name,
        value: _.toString(ledgers[key].id)
      };
      newArr.push(obj);
      if (Number(key) === ledgers.length) {
        return newArr;
      }
    });
    return newArr;
  }
}

export default BudgetForm;