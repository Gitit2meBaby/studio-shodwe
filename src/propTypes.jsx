import PropTypes from 'prop-types';

export const statePropTypes = PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.string),
});
