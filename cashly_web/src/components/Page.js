import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';

function Page({ children, title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
