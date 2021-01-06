import styled from 'react-emotion';
import { getBackgroundWithHoverCSS, IconButton } from '@twilio/flex-ui';

const ButtonContainer = styled('div')`
  border-radius: 5px;
  cursor: pointer;
  display: block;
  font-weight: bold;
  font-size: 10px;
  height: 30px;
  letter-spacing: 2px;
  line-height: 30px;
  margin: 12px;
  text-align: center;
  text-transform: uppercase;
  user-select: none;
  width: calc(100% - 24px);
  ${(p) => p.theme.Dialer.CallButton};
  ${(p) =>
    getBackgroundWithHoverCSS(
      p.theme.Dialer.CallButton.backgroundColor,
      p.theme.Dialer.CallButton.lightHover,
      false,
      p.disabled
    )};
`;

export const ShowDialpadButton = styled(ButtonContainer)``;

export const CloseDialpadButton = styled(ButtonContainer)`
  margin-bottom: 0px;
  margin-top: 16px;
`;

export const Caption = styled('label')`
  display: block;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 1.6;
  letter-spacing: 2px;
  margin-top: 16px;
  margin-bottom: 8px;
  width: 100%;
`;

export const DialerContainer = styled('div')`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 12px;
  padding: 0 11px;
  width: 276px;
  ${({ disabled, theme }) => disabled && theme.OutboundDialerPanel.Container.disabled};
`;

export const CallControls = styled('div')`
  position: relative;
  margin-top: 24px;
`;

export const CallButton = styled(IconButton)`
  box-sizing: content-box;
  padding: 8px;
  ${(p) => p.theme.Dialer.CallButton};
  ${(p) => p.disabled && p.theme.Dialer.CallButton.disabled};
  ${(p) =>
    getBackgroundWithHoverCSS(
      p.theme.Dialer.CallButton.backgroundColor,
      p.theme.Dialer.CallButton.lightHover,
      false,
      p.disabled
    )};
`;

export const CallAnimation = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
