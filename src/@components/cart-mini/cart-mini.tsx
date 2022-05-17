
import { Drawer } from '@geist-ui/core';
import React from 'react';

export default function CartMini({ children, active, setActive }) {
  return (
    <Drawer visible={active} onClose={() => setActive(false)} placement="right">
      <Drawer.Title>Drawer</Drawer.Title>
      <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
      <Drawer.Content>
        <p>Some content contained within the drawer.</p>
      </Drawer.Content>
    </Drawer>
  )
}
