import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';

import { fiscalYearsResource } from '../resources';
import { getFiscalYearsForSelect } from '../utils';

import FiscalYearField from './FiscalYearField';

function FiscalYearFieldContainer({ resources, name, required, label, disabled }) {
  const fiscalYears = getFiscalYearsForSelect(resources);

  return (
    <FiscalYearField
      dataOptions={fiscalYears}
      label={label}
      name={name}
      required={required}
      disabled={disabled}
    />
  );
}

FiscalYearFieldContainer.manifest = Object.freeze({
  fiscalYears: fiscalYearsResource,
});

FiscalYearFieldContainer.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  resources: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

FiscalYearFieldContainer.defaultProps = {
  label: <FormattedMessage id="ui-finance.budget.fiscalYear" />,
  required: false,
  disabled: false,
};

export default stripesConnect(FiscalYearFieldContainer);
