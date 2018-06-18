import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as eventsActions from '../actions/eventsActions';

import Event from '../components/Event';
import { timeAgo } from '../utils/utils';

class EventsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
    };
  }

  parseEvents(events) {
    if (this.state.expand) {
      return events;
    }
    return events.slice(0, 3);
  }

  toggleExpand() {
    this.setState({ expand: !this.state.expand });
  }

  renderEvents() {
    const { deleteEvent, jumpToEvent, canEdit, utcOffset, dateFormat } = this.props;
    const { expand } = this.state;

    const events =
      Object.keys(this.props.events).map(o => this.props.events[o]);

    const canExpand = events.length > 3;

    const shouldDivide = (event, i) =>
      event &&
      (i === 0 ||
      timeAgo(event.entry_time, utcOffset) !==
      timeAgo(this.parseEvents(events)[i - 1].entry_time, utcOffset));


    if (events.length < 1) {
      return '';
    }

    return (
      <div>
        <h2 className="widget-title">Highlights</h2>
        <ul className="liveblog-events">
          {this.parseEvents(events).map((event, i) =>
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
        {canExpand && <div className="liveblog-events-expand">
          <button
            className={`liveblog-events-expand-button ${expand ? 'expand-up' : 'expand-down'}`}
            data-tgev="event10"
            data-tgev-metric="ev"
            data-tgev-label="highlight-expand"
            data-tgev-container="live-coverage"
            data-tgev-order="1"
            onClick={() => this.toggleExpand()}>
            <svg width="20" height="10" viewBox="0 0 17.5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.0002 5.34055L1.65775 0L0 1.61151L8.0002 8.56357L16
                1.61151L14.3427 0L8.0002 5.34055Z"
                transform="translate(0.718262 0.718262)"
                fill="#0570E7"/>
            </svg>
          </button>
          <div className="expand-line"></div>
        </div>}
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
