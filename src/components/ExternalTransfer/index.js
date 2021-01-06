import React from "react";
import ParticipantActionsButtons from './ParticipantActionsButtons';
import ParticipantName from './ParticipantName';
import ParticipantStatus from './ParticipantStatus';
import ParticipantStatusContainer from './ParticipantStatusContainer';
import ConferenceMonitor from './ConferenceMonitor';
import TransferDialpad from './TransferDialpad';

export const loadExternalTransferInterface = (flex, manager) => {

	var translationStrings = {
		DIALPADExternalTransferHoverOver: "Add Conference Participant",
		DIALPADExternalTransferPhoneNumberPopupHeader: "Enter phone number to add to the conference",
		DIALPADExternalTransferPhoneNumberPopupTitle: "Phone Number",
		DIALPADExternalTransferPhoneNumberPopupCancel: "Cancel",
		DIALPADExternalTransferPhoneNumberPopupDial: "Dial"
	}
  
	//add translationStrings into manager.strings, preserving anything thats already there - this allows language to be updated outside of updating this plugin
	manager.strings = { ...translationStrings, ...manager.strings }

	flex.WorkerDirectory.Content.add(
		<TransferDialpad key='transfer-dialpad' manager={manager} />,
		{ sortOrder: 999 }
	);

	// This component doesn't render anything to the UI, it just monitors
	// conference changes and takes action as necessary
	flex.CallCanvas.Content.add(<ConferenceMonitor
		key="conference-monitor"
	/>, { sortOrder: 999 });

	const isUnknownParticipant = props => props.participant.participantType === 'unknown';
	const isNotTransferParticipant = props => props.participant.participantType !== 'transfer';

	// This section is for the full width ParticipantCanvas
	flex.ParticipantCanvas.Content.remove('actions', { if: isNotTransferParticipant });
	flex.ParticipantCanvas.Content.add(
		<ParticipantActionsButtons
			key="custom-actions"
		/>, { sortOrder: 10, if: isNotTransferParticipant }
	);
	flex.ParticipantCanvas.Content.remove('name', { if: isUnknownParticipant });
	flex.ParticipantCanvas.Content.add(
		<ParticipantName
			key="custom-name"
		/>, { sortOrder: 1, if: isUnknownParticipant }
	);
	flex.ParticipantCanvas.Content.remove('status');
	flex.ParticipantCanvas.Content.add(
		<ParticipantStatus
			key="custom-status"
		/>, { sortOrder: 2 }
	);

	// This section is for the narrow width ParticipantCanvas, which changes to List Mode,
	// introduced in Flex 1.11.0. ListItem did not exist on ParticipantCanvas before 1.11.0.
	if (flex.ParticipantCanvas.ListItem) {
		flex.ParticipantCanvas.ListItem.Content.remove('statusContainer');
		flex.ParticipantCanvas.ListItem.Content.add(
			<ParticipantStatusContainer
				key="custom-statusContainer"
			/>, { sortOrder: 1 }
		);
		flex.ParticipantCanvas.ListItem.Content.remove('actions', { if: isNotTransferParticipant });
		flex.ParticipantCanvas.ListItem.Content.add(
			<ParticipantActionsButtons
				key="custom-actions"
			/>, { sortOrder: 10, if: isNotTransferParticipant }
		);
	}
}