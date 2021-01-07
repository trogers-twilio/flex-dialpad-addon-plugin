import * as React from "react";
import { templates, withTaskContext, Actions } from '@twilio/flex-ui';
import {
  TabContainer, InputContainer, StyledInput, ItemContainer
} from './CustomDirectoryComponents';
import DirectoryItem from './DirectoryItem';
import ConferenceService from '../../helpers/ConferenceService';

const directoryEntries = [
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

class CustomDirectory extends React.Component {
  state = {
    searchTerm: ''
  }

  filteredDirectory = () => {
    const { searchTerm } = this.state;
    return directoryEntries.filter(entry => {
      if (!searchTerm) {
        return true;
      }
      return entry.name
        ? entry.name.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
    })
  }

  onSearchInputChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  onTransferClick = item => async payload => {
    const { mode } = payload;
    const { number } = item;

    switch (mode) {
      case 'WARM': {
        await this.addConferenceParticipant(number);
        break;
      }
      default: {
        console.warn('CustomDirectory, onTransferClick, unhandled mode:', mode);
      }
    }

    Actions.invokeAction('HideDirectory');
  }

  addConferenceParticipant = async (phoneNumber) => {
    const { task } = this.props;

    // Adding entered number to the conference
    console.log(`Adding ${phoneNumber} to conference`);
    try {
      await ConferenceService.addParticipant(task, phoneNumber);
    } catch (error) {
      console.error('Error adding conference participant:', error);
    }
  }

  render() {
    return (
      <TabContainer key="custom-directory-container">
        <InputContainer key="custom-directory-input-container">
          <StyledInput
            key="custom-directory-input-field"
            onChange={this.onSearchInputChange}
            placeholder={templates.WorkerDirectorySearchPlaceholder()}
          />
        </InputContainer>
        <ItemContainer
          key="custom-directory-item-container"
          className="Twilio-WorkerDirectory-Workers"
          vertical
        >
          {console.warn('Directory entries:', this.filteredDirectory())}
          {this.filteredDirectory().map(item => {
            console.warn('Directory item:', item);
            return (
              <DirectoryItem
                item={item}
                key={item.id}
                onTransferClick={this.onTransferClick(item)}
              />
            );
          })}
        </ItemContainer>
      </TabContainer>
    )
  }
}

export default withTaskContext(CustomDirectory);
