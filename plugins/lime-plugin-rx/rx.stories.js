/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';

import { Page } from '../lime-plugin-rx/src/rxPage';
import { frameDecorator } from '../../.storybook/frameDecorator';


const nodeData =  {
	internet: {
	  DNS: {
			working: true
	  },
	  IPv6: {
			working: false
	  },
	  status: 'ok',
	  IPv4: {
			working: true
	  }
	},
	ips: [
	  {
			version: '4',
			address: '10.5.0.36/21'
	  },
	  {
			version: '6',
			address: '2801:1e8:2::7288:d100/64'
	  },
	  {
			version: '6',
			address: 'fe80::6670:2ff:fed1:8872/64'
	  }
	],
	hostname: 'ql-anaymarcos',
	status: 'ok',
	uptime: '6655.80\n',
	most_active: {
	  rx_bytes: 82509781,
	  station_mac: 'A8:40:41:1C:84:05',
	  station_hostname: 'ql_graciela_wlan2_adhoc',
	  tx_bytes: 12806307,
	  iface: 'wlan1-adhoc',
	  attributes: {
			inactive: 20,
			signal: '-63',
			channel: 136
	  },
	  link_type: 'wifi',
	  signal: '-62'
	}
};

export const actions = {
	getNodeStatusTimer: action('getNodeStatusTimer'),
	getNodeStatus: action('getNodeStatus'),
	stopTimer: action('stopTimer'),
	changeNode: action('changeNod')
};

storiesOf('Containers|Home screen (Rx)', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('with data', () => (
		<Page
			nodeData={object('Node data', nodeData)}
			isLoading={boolean('Is loading', false)}
			{...actions}
		/>
	))
	.add('loading node data', () => (
		<Page
			nodeData={object('Node data', nodeData)}
			isLoading={boolean('Is loading', true)}
			{...actions}
		/>
	));