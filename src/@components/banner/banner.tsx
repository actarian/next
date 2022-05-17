import { Display, Text, useTheme } from '@geist-ui/core';
import React from 'react';

export default function Banner() {
  const { palette } = useTheme();

  return (
    <Display padding="20px" margin="0" style={{ backgroundColor: palette.cyan }}>
      <Text h3 margin="0">Banner</Text>
    </Display>
  );
}
