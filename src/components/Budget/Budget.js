import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import ReactRouterPropTypes from 'react-router-prop-types';

import BudgetView from './BudgetView/BudgetViewContainer';
import BudgetForm from './BudgetForm/BudgetFormContainer';

const Budget = ({ match: { path } }) => (
  <Switch>
    <Route
      path={`${path}/:budgetId/view`}
      render={
        ({ history, match }) => (
          <BudgetView
            history={history}
            match={match}
          />
        )
      }
    />
    <Route
      path={`${path}/:budgetId/edit`}
      render={
        ({ history, match }) => (
          <BudgetForm
            history={history}
            match={match}
          />
        )
      }
    />
  </Switch>
);

Budget.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Budget;
