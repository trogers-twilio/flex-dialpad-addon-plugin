import styled from 'react-emotion';
import { FlexBox } from '@twilio/flex-ui';

export const WorkerMarginPlaceholder = styled(FlexBox)`
  width: 6px;
`;

export const ItemContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 4px;
  padding-right: 6px;
  overflow: hidden;
`;

export const ItemFirstLine = styled('div')`
  margin: 1px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
`;

export const ItemSecondLine = styled('div')`
  margin: 1px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  font-size: 10px;
  font-weight: normal;
`;
