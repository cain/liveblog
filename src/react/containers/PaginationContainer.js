import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from '../actions/apiActions';
import * as userActions from '../actions/userActions';

class PaginationContainer extends Component {
  render() {
    const { page, pages, getEntriesPaginated, paginationType } = this.props;
    const isLastPage = page === pages;

    if (paginationType === 'loadMore') {
      return (
        <div className={`liveblog-pagination liveblog-pagination-type-${paginationType}`}>
          {!isLastPage &&
          <button
            className="liveblog-btn liveblog-pagination-btn liveblog-pagination-load-more"
            data-tgev="event10"
            data-tgev-metric="ev"
            data-tgev-label="load-more"
            data-tgev-container="live-coverage"
            data-tgev-order="1"
            onClick={() => getEntriesPaginated(page + 1)}
          >
              Load More
          </button>}
        </div>
      );
    }
    return (
      <div className={`liveblog-pagination liveblog-pagination-type-${paginationType}`}>
        <div>
          <button
            disabled={page === 1}
            className="liveblog-btn liveblog-pagination-btn liveblog-pagination-first"
            onClick={() => getEntriesPaginated(1, 'first')}
          >
            First
          </button>
          <button
            disabled={page === 1}
            className="liveblog-btn liveblog-pagination-btn liveblog-pagination-prev"
            onClick={() => getEntriesPaginated((page - 1), 'last')}
          >
            Prev
          </button>
        </div>
        <span className="liveblog-pagination-pages">{page} of {pages}</span>
        <div>
          <button
            disabled={isLastPage}
            className="liveblog-btn liveblog-pagination-btn liveblog-pagination-next"
            onClick={() => getEntriesPaginated((page + 1), 'first')}
          >
            Next
          </button>
          <button
            disabled={isLastPage}
            className="liveblog-btn liveblog-pagination-btn liveblog-pagination-last"
            onClick={() => getEntriesPaginated(pages, 'first')}
          >
            Last
          </button>
        </div>
      </div>
    );
  }
}

PaginationContainer.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  getEntriesPaginated: PropTypes.func,
  paginationType: PropTypes.string,
};

const mapStateToProps = state => ({
  page: state.pagination.page,
  pages: state.pagination.pages,
  paginationType: state.config.paginationType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...apiActions,
    ...userActions,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer);
