import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  Row,
  Col,
  ExpandAllButton,
  AccordionSet,
  Accordion,
  MenuSection,
  ConfirmationModal,
} from '@folio/stripes/components';
import {
  useAccordionToggle,
  useModalToggle,
} from '@folio/stripes-acq-components';

import {
  DetailsEditAction,
  DetailsRemoveAction,
} from '../../common/DetailsActions';
import {
  GROUP_ACCORDTION,
  GROUP_ACCORDTION_LABELS,
} from '../constants';
import GroupInformation from './GroupInformation';
import GroupFund from './GroupFund';

const GroupDetails = ({
  group,
  groupSummary,
  fiscalYearsRecords,
  funds,
  onClose,
  editGroup,
  removeGroup,
  selectedFY,
  onSelectFY,
}) => {
  const [isRemoveConfirmation, toggleRemoveConfirmation] = useModalToggle();
  const [expandAll, sections, toggleSection] = useAccordionToggle();

  // eslint-disable-next-line react/prop-types
  const renderActionMenu = useCallback(
    ({ onToggle }) => {
      return (
        <MenuSection id="group-details-actions">
          <DetailsEditAction
            perm="finance.groups.item.put"
            onEdit={editGroup}
            toggleActionMenu={onToggle}
          />
          <DetailsRemoveAction
            perm="finance.groups.item.delete"
            toggleActionMenu={onToggle}
            onRemove={toggleRemoveConfirmation}
          />
        </MenuSection>
      );
    },
    [editGroup, toggleRemoveConfirmation],
  );

  const onRemove = useCallback(
    () => {
      toggleRemoveConfirmation();
      removeGroup();
    },
    [removeGroup, toggleRemoveConfirmation],
  );

  return (
    <Pane
      id="pane-group-details"
      defaultWidth="fill"
      dismissible
      actionMenu={renderActionMenu}
      paneTitle={group.name}
      onClose={onClose}
    >
      <Row end="xs">
        <Col xs={12}>
          <ExpandAllButton
            accordionStatus={sections}
            onToggle={expandAll}
          />
        </Col>
      </Row>

      <AccordionSet
        accordionStatus={sections}
        onToggle={toggleSection}
      >
        <Accordion
          id={GROUP_ACCORDTION.information}
          label={GROUP_ACCORDTION_LABELS[GROUP_ACCORDTION.information]}
        >
          <GroupInformation
            metadata={group.metadata}
            name={group.name}
            code={group.code}
            status={group.status}
            description={group.description}
            acqUnitIds={group.acqUnitIds}
            fiscalYears={fiscalYearsRecords}
            allocated={groupSummary.allocated}
            unavailable={groupSummary.unavailable}
            available={groupSummary.available}
            selectedFiscalYearId={selectedFY.id}
            onSelectFY={onSelectFY}
          />
        </Accordion>
        <Accordion
          id={GROUP_ACCORDTION.fund}
          label={GROUP_ACCORDTION_LABELS[GROUP_ACCORDTION.fund]}
        >
          <GroupFund
            funds={funds}
            fiscalYearId={selectedFY.id}
            groupId={group.id}
          />
        </Accordion>
      </AccordionSet>

      {isRemoveConfirmation && (
        <ConfirmationModal
          id="group-remove-confirmation"
          confirmLabel={<FormattedMessage id="ui-finance.actions.remove.confirm" />}
          heading={<FormattedMessage id="ui-finance.groups.actions.remove.heading" />}
          message={<FormattedMessage id="ui-finance.groups.actions.remove.message" />}
          onCancel={toggleRemoveConfirmation}
          onConfirm={onRemove}
          open
        />
      )}
    </Pane>
  );
};

GroupDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  removeGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  groupSummary: PropTypes.shape({
    allocated: PropTypes.number,
    unavailable: PropTypes.number,
    available: PropTypes.number,
  }),
  fiscalYearsRecords: PropTypes.arrayOf(PropTypes.object),
  funds: PropTypes.arrayOf(PropTypes.object),
  selectedFY: PropTypes.object.isRequired,
  onSelectFY: PropTypes.func.isRequired,
};

GroupDetails.defaultProps = {
  groupSummary: {},
  fiscalYearsRecords: [],
  funds: [],
};

export default GroupDetails;
