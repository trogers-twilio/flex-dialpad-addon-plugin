import React from 'react';

import CustomDirectory from './CustomDirectory';

export const loadCustomDirectoryInterface = (flex, manager) => {
  flex.WorkerDirectory.Tabs.Content.add(
    <flex.Tab
      key="custom-directory"
      label="Directory"
    >
      <CustomDirectory />
    </flex.Tab>
  );
};
