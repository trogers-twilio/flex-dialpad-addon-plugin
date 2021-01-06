import React from 'react';
import { Actions, ConnectingAnimation, Dialer, withTaskContext, withTheme } from '@twilio/flex-ui';

import {
  CallAnimation,
  CallButton,
  CallControls,
  Caption,
  CloseDialpadButton,
  DialerContainer,
  ShowDialpadButton,
} from './TransferDialpad.Components';
import ConferenceService from '../../helpers/ConferenceService';

class TransferDialpad extends React.PureComponent {
  state = {
    inProgress: false,
    showDialpad: false
  }

  componentDidUpdate() {
    if (!this.props.isOpen && this.state.showDialpad) {
      this.setState({ showDialpad: false });
    }
  }

  toggleDialpad = () => {
    this.setState({ showDialpad: !this.state.showDialpad });
  }

  handleDial = async (phoneNumber) => {
    console.debug('TransferDialpad, handleDial, phoneNumber:', phoneNumber);

    this.setState({ inProgress: true });

    await this.addConferenceParticipant(phoneNumber);

    this.setState({ inProgress: false });
    
    Actions.invokeAction('HideDirectory');
  }

  addConferenceParticipant = async (phoneNumber) => {
    const to = phoneNumber

    const { manager, task } = this.props;
    const conference = task && (task.conference || {});
    const { conferenceSid } = conference;

    const mainConferenceSid = task.attributes.conference ? 
      task.attributes.conference.sid : conferenceSid;

    let from;
    if (this.props.phoneNumber) {
      from = this.props.phoneNumber
    } else {
      from = manager?.serviceConfiguration?.outbound_call_flows?.default.caller_id;
    }

    // Adding entered number to the conference
    console.log(`Adding ${to} to conference`);
    let participantCallSid;
    try {
      participantCallSid = await ConferenceService.addParticipant(mainConferenceSid, from, to);
      ConferenceService.addConnectingParticipant(mainConferenceSid, participantCallSid, 'unknown');
    } catch (error) {
      console.error('Error adding conference participant:', error);
    }
  }

  render() {
    return this.state.showDialpad
      ? this.renderDialpad()
      : this.renderDialpadButton();
  }

  renderDialpadButton = () => {
    return (
      <ShowDialpadButton
        onClick={this.toggleDialpad}
      >Dial a Number
      </ShowDialpadButton>
    );
  }

  renderDialpad = () => {
    const { inProgress } = this.state;
    const { theme } = this.props;

    return (
      <DialerContainer>
        <CloseDialpadButton
          onClick={this.toggleDialpad}
        >Back to Directory
        </CloseDialpadButton>
        <Caption>Enter a Number</Caption>
        <Dialer
          defaultCountryAlpha2Code="US"
          onDial={this.handleDial}
          hideActions
          disabled={inProgress}
        />
        <CallControls>
          <CallButton
            icon="Call"
            disabled={inProgress}
            onClick={this.handleDial}
            themeOverride={theme?.Dialer?.CallButton}
          />
          {inProgress && (
            <CallAnimation>
              <ConnectingAnimation sizeMultiplier={2} />
            </CallAnimation>
          )}
        </CallControls>
      </DialerContainer>
    );
  }
}

export default withTaskContext(withTheme(TransferDialpad));
