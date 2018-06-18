import React from 'react';
import PropTypes from 'prop-types';
import { formattedTime, timestampLogic, timeAgo } from '../utils/utils';

const Event = ({ event, click, utcOffset, dateFormat, shouldDivide }) => (
  <React.Fragment>
    {shouldDivide && timeAgo(event.entry_time, utcOffset, 'hour') > 4 &&
    <li className="liveblog-event liveblog-event-body-divider">
      {formattedTime(event.entry_time, utcOffset, dateFormat)}
    </li>}
    <li className="liveblog-event">
      <div className="liveblog-event-body">
        <div className="liveblog-event-meta">
          {timestampLogic(event.entry_time, utcOffset, true)}
        </div>
        <div>
          <span
            className="liveblog-event-content"
            data-tgev="event10"
            data-tgev-metric="ev"
            data-tgev-label="highlight-link"
            data-tgev-container="live-coverage"
            data-tgev-order="1"
            onClick={click}
            dangerouslySetInnerHTML={{ __html: event.headline || event.key_event_content }}
          />
        </div>
      </div>
    </li>
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
