import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import { fetchEnterprises, fetchEnterpriseDetailsById, switchEnterprise } from '../../actions/enterprise-action-types';
import SideNavEnterprise from './side-nav-enterprise';
import MenuDropDown from '../common/menu-drop-down';
import NavigationLink from '../common/navigation-link';
import navigationList from '../../../config/navigation-list';
import FormattedMessage from '../common/formatted-message';
import SurveyActivity from '../common/survey-activity';
import User from '../../utils/user';

const { userInfo } = new User();

class LeftNav extends Component {
  static propTypes = {
    enterprises: arrayOf(
      shape({
        expirationDate: string.isRequired,
        isActive: bool.isRequired,
        name: string.isRequired,
      })
    ),
    fetchEnterpriseDetailsById: func.isRequired,
    fetchEnterprises: func.isRequired,
    logOut: func.isRequired,
    push: func.isRequired,
    switchEnterprise: func.isRequired,
    switchEnterpriseDetails: shape({
      logo: string,
      name: string,
    }).isRequired,
    userRole: number,
  };

  state = {
    isToggleLeftNav: false,
    shouldShowBackToAdmin: userInfo().companyId !== userInfo().adminCompanyId,
    shouldShowSideNav: false,
    shouldShowSurveyActivity: false,
  };

  componentDidMount() {
    const { companyId } = userInfo();

    if (companyId) {
      this.props.fetchEnterpriseDetailsById({
        companyId,
        method: 'switchEnterprise',
      });
    }

    this.props.fetchEnterprises();
  }

  toggleLeftNav = () => {
    this.setState({ isToggleLeftNav: !this.state.isToggleLeftNav });
  };

  hideSurveyActivity = (event) => {
    if (!this.surveyActivityMenu.current.contains(event.target)) {
      this.setState({ shouldShowSurveyActivity: false });
    }
  };

  surveyActivityMenu = React.createRef();

  toggleSurveyActivity = () => {
    this.setState({ shouldShowSurveyActivity: !this.state.shouldShowSurveyActivity });
  };

  myProfile = () => {
    this.props.push('/manage-users/user-profile');
  };

  userMenuItems = [
    {
      onClickHandler: this.myProfile,
      text: <FormattedMessage id="myProfile" />,
    },
    {
      onClickHandler: this.props.logOut,
      text: <FormattedMessage id="signOut" />,
    },
  ];

  sideNavEnterprise = React.createRef();

  hideSideNavEnterprise = (event) => {
    if (!this.sideNavEnterprise.current.contains(event.target)) {
      this.setState({ shouldShowSideNav: false });
    }
  };

  toggleSideNavEnterprise = () => {
    this.setState({ shouldShowSideNav: !this.state.shouldShowSideNav });
  };

  handleBackToAdmin = () => {
    const {
      name, logo, adminCompanyId,
    } = userInfo();

    this.props.switchEnterprise({
      companyId: adminCompanyId,
      logo,
      name,
    });

    this.setState({
      shouldShowBackToAdmin: false,
      shouldShowSideNav: false,
    });
  };

  onEnterpriseClick = ({
    companyId, logo, name,
  }) => {
    this.props.switchEnterprise({
      companyId,
      logo,
      name,
    });

    this.setState({
      shouldShowBackToAdmin: true,
      shouldShowSideNav: false,
    });
  };

  render() {
    const {
      isToggleLeftNav, shouldShowSideNav, shouldShowSurveyActivity, shouldShowBackToAdmin,
    } = this.state;

    const {
      userRole,
      enterprises,
      switchEnterpriseDetails: {
        logo, companyId,
      },
    } = this.props;

    return (
      <Fragment>
        <div className={`ez-nav-side-menu ${isToggleLeftNav && 'active'}`}>
          <div className="ez-menu-content">
            <ul>
              <li className="logo_enterprise" ref={this.sideNavEnterprise} onClick={this.toggleSideNavEnterprise}>
                <p>
                  <img src={`${logo || '/assets/images/logo-dummy.jpg'}`} />
                </p>
              </li>
              {navigationList.map(
                ({
                  className, path, src, role, tooltip,
                }) => role.includes(userRole) && <NavigationLink className={className} key={path} path={path} src={src} tooltip={tooltip} />
              )}
              <li>
                <NavLink to="/upload-survey" onClick={this.toggleUploadSurvey}>
                  <img src="/assets/images/file.svg" />
                </NavLink>
                <span className="left-tooltip">
                  <FormattedMessage id="uploadSurvey" />
                </span>
              </li>
            </ul>
            <div className="ez-side-bottom">
              <div className="dropdown" onClick={this.toggleSurveyActivity}>
                <button className="running_man" ref={this.surveyActivityMenu}>
                  <img src={'/assets/images/running.svg'} />
                  <span className="left-tooltip">
                    <FormattedMessage id="activity" />
                  </span>
                </button>
              </div>
              <MenuDropDown items={this.userMenuItems} srcUrl="/assets/images/user.svg" />
            </div>
          </div>
          {userRole === 0 && (
            <SideNavEnterprise
              activeEnterpriseId={companyId || ''}
              closeSideNav={this.toggleSideNavEnterprise}
              enterprise={enterprises}
              handleBackToAdmin={this.handleBackToAdmin}
              handleClickOutside={this.hideSideNavEnterprise}
              isActive={shouldShowSideNav}
              shouldShowBackToAdmin={shouldShowBackToAdmin}
              onEnterpriseClick={this.onEnterpriseClick}
            />
          )}
        </div>
        <SurveyActivity handleClickOutside={this.hideSurveyActivity} isActive={shouldShowSurveyActivity} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  enterprise: {
    enterprises, switchEnterpriseDetails,
  },
}) => ({
  enterprises,
  switchEnterpriseDetails,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchEnterpriseDetailsById,
      fetchEnterprises,
      push,
      switchEnterprise,
    }
  )(LeftNav)
);
