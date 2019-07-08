import React, { Component } from 'react';
import { func, string } from 'prop-types';
import moment from 'moment';
import IconCalendar from 'react-datepicker';
import FormattedMessage from './formatted-message';
import 'react-datepicker/dist/react-datepicker.css';

class Calender extends Component {
  static propTypes = {
    dateField: func.isRequired,
    name: string.isRequired,
    startDate: string,
  };

  state = { showCalender: false };

  handleChange = (event) => {
    this.toggleCalender();

    this.props.dateField(event);
  };

  calenderImage = React.createRef();

  toggleCalender = () => {
    this.setState({ showCalender: !this.state.showCalender });
  };

  onClickOutside = (event) => {
    if (!this.calenderImage.current.contains(event.target)) {
      this.setState({ showCalender: false });
    }
  };

  render() {
    const {
      startDate, name,
    } = this.props;

    const { showCalender } = this.state;

    return (
      <div className="text-field ez-calender">
        <label className="ez-label ez-top-margin ">
          <FormattedMessage id="enterpriseLifecycleEndDate" />
        </label>
        <input readOnly className="ez-input" placeholder="Select date" value={startDate} />
        <img ref={this.calenderImage} src={'/assets/images/calendar.svg'} onClick={this.toggleCalender} />
        {showCalender && (
          <IconCalendar
            inline
            minDate={moment()}
            shouldCloseOnSelect={true}
            onChange={(value) => this.handleChange({
              name,
              value,
            })
            }
            onClickOutside={this.onClickOutside}
          />
        )}
      </div>
    );
  }
}

export default Calender;
