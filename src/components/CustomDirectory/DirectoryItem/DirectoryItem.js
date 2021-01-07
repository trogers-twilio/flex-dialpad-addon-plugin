import * as React from "react";
import {
  templates,
  withTheme
} from '@twilio/flex-ui';
import {
  ButtonContainer,
  CallButton,
  ItemInnerContainer
} from '../CustomDirectoryComponents';
import {
  ItemContainer,
  ItemFirstLine,
  ItemSecondLine,
  WorkerMarginPlaceholder
} from './DirectoryItemComponents';

class DirectoryItem extends React.Component {
  onWarmTransferClick = (e) => {
    this.props.onTransferClick({ mode: "WARM" });
  };

  render() {
    const { item, theme } = this.props;
    return (
      <ItemInnerContainer className="Twilio-WorkerDirectory-Worker" noGrow noShrink>
        <WorkerMarginPlaceholder noGrow noShrink />
        <ItemContainer>
          <ItemFirstLine>{item.name}</ItemFirstLine>
          <ItemSecondLine>{item.number}</ItemSecondLine>
        </ItemContainer>
        <ButtonContainer className="Twilio-WorkerDirectory-ButtonContainer">
          <CallButton
            icon="Call"
            onClick={this.onWarmTransferClick}
            themeOverride={theme.WorkerDirectory.ItemActionButton}
            title={templates.WarmTransferTooltip()}
          />
        </ButtonContainer>
      </ItemInnerContainer>
    )
  }
}

export default withTheme(DirectoryItem);
