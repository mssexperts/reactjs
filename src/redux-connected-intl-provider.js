import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = ({ locale }) => {
  const {
    lang, messages,
  } = locale;

  return {
    key: lang,
    locale: lang,
    messages,
  };
};

export default connect(mapStateToProps)(IntlProvider);
