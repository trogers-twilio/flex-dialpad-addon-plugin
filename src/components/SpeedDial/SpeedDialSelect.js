import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";

import { Caption, StyledSelect } from './SpeedDialSelect.Components';

const speedDialList = [
  {
    id: 'A12345',
    name: 'Washington, DC Time & Temp',
    number: '+12028441212'
  }, {
    id: 'B12345',
    name: 'Seattle, WA Time & Temp',
    number: '+12065268530'
  }, {
    id: 'C12345',
    name: 'Milwaukee, WI Time & Temp',
    number: '+14148441212'
  }
];

class SpeedDialSelect extends React.PureComponent {
  state = {
    selectedSpeedDialId: ''
  }

  handleChange = (event) => {
    const selectedSpeedDialId = event.target.value;
    this.setState({ selectedSpeedDialId });

    const selectedSpeedDial = speedDialList.find(s => s.id === selectedSpeedDialId);

    const dialerPhoneInput = document.querySelector('#dialer-phone-input');
    const nativeInputValueSetter = Object
      .getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      .set;
    const inputEvent = new Event('input', { bubbles: true });

    nativeInputValueSetter.call(dialerPhoneInput, selectedSpeedDial.number);
    dialerPhoneInput.dispatchEvent(inputEvent);
  }

  render() {
    return (
      <div>
        <Caption>Speed Dial</Caption>
        <StyledSelect
          value={this.state.selectedSpeedDialId}
          onChange={this.handleChange}
          displayEmpty
        >
          <MenuItem key="placeholder" value="" disabled>
            Select a speed dial
          </MenuItem>
          {speedDialList.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </div>
    )
  }
}

export default SpeedDialSelect;
