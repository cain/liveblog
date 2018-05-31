import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as eventsActions from '../actions/eventsActions';

import Event from '../components/Event';
import { daysAgo, formattedTime } from '../utils/utils';

class EventsContainer extends Component {
  renderEvents() {
    const { deleteEvent, jumpToEvent, canEdit, utcOffset, dateFormat } = this.props;

    const events = Object.values(this.props.events);

    const shouldDivide = (event, i) =>
      event &&
      (events.length - 1 === i ||
      daysAgo(event.entry_time, utcOffset) !==
      daysAgo(events[i + 1].entry_time, utcOffset));

    return (
      <div>
        <h2 className="widget-title">Key Events</h2>
        <ul className="liveblog-events">
          {events.length &&
            <li className="liveblog-event liveblog-event-body-divider">
              {formattedTime(events[0].entry_time, utcOffset, dateFormat)}
            </li>
          }
          {events.map((event, i) =>
            <Event
              key={i}
              event={event}
              click={() => jumpToEvent(event.id)}
              onDelete={() => deleteEvent(event)}
              canEdit={canEdit}
              utcOffset={utcOffset}
              dateFormat={dateFormat}
              shouldDivide={shouldDivide(event, i)}
            />,
          )}
        </ul>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(
      this.renderEvents(),
      this.props.container,
    );
  }
}

EventsContainer.propTypes = {
  getEvents: PropTypes.func,
  deleteEvent: PropTypes.func,
  jumpToEvent: PropTypes.func,
  events: PropTypes.object,
  container: PropTypes.any,
  canEdit: PropTypes.bool,
  utcOffset: PropTypes.string,
  dateFormat: PropTypes.string,
};

const mapStateToProps = state => ({
  dateFormat: state.config.date_format,
  utcOffset: state.config.utc_offset,
  events: state.events.entries,
  canEdit: state.config.is_liveblog_editable === '1',
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...eventsActions,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
