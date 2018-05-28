import React from 'react';
import PropTypes from 'prop-types';
import { formattedTime, simpleFormatTime } from '../utils/utils';

const Event = ({ event, click, utcOffset, dateFormat, shouldDivide }) => (
  <React.Fragment>
    <li className="liveblog-event">
      <div className="liveblog-event-body">
        <div className="liveblog-event-meta">
          {simpleFormatTime(event.entry_time, utcOffset, 'h:m a')}
        </div>
        <div>
          <span
            className="liveblog-event-content"
            onClick={click}
            dangerouslySetInnerHTML={{ __html: event.key_event_content }}
          />
        </div>
      </div>
    </li>
    {shouldDivide &&
    <li className="liveblog-event liveblog-event-body-divider">
      {formattedTime(event.entry_time, utcOffset, dateFormat)}
    </li>}
  </React.Fragment>
);

Event.propTypes = {
  event: PropTypes.object,
  click: PropTypes.func,
  onDelete: PropTypes.func,
  canEdit: PropTypes.bool,
  utcOffset: PropTypes.string,
  dateFormat: PropTypes.string,
  shouldDivide: PropTypes.bool,
};

export default Event;
