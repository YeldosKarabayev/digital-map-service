import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBDropdown>
      <MDBDropdownToggle>Dropdown button</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link>Action</MDBDropdownItem>
        <MDBDropdownItem link>Another action</MDBDropdownItem>
        <MDBDropdownItem link>Something else here</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}