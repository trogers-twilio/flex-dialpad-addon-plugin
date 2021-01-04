import React from 'react';
import SpeedDialSelect from './SpeedDialSelect';

export const loadSpeedDialInterface = (flex, manager) => {
  flex.OutboundDialerPanel.Content.add(<SpeedDialSelect key="speed-dial-select" flex={flex} manager={manager} />)
};
