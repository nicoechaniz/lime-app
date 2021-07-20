import api from './uhttpd.service';
import { getBatHost, checkInternet } from './api';
import { useQuery, useMutation } from 'react-query';
import queryCache from './queryCache';


function getSession() {
	return api.call('session', 'get', {ubus_rpc_session: api.sid()})
		.then(res => res.values);
}


export function useSession() {
	return useQuery(['session', 'get'], getSession, {
		initialData: {
			username: null
		}
	})
}

function login({username, password}) {
	return api.login(username, password)
}

export function useLogin() {
	return useMutation(login, {
		onSuccess: res => {
			queryCache.setQueryData(['session', 'get'], () => res.data)
		}
	});
}

function getBoardData() {
	return api.call('system', 'board', {});
}

export function useBoardData() {
	return useQuery(['system', 'board'], getBoardData, {
		initialData: {hostname: 'LiMe'},
		initialStale: true
	});
}

const DEFAULT_COMMUNITY_SETTINGS = {
	bad_signal: '-82',
	acceptable_loss: '20',
	bad_bandwidth: '1',
	good_signal: '-65',
	good_bandwidth: '5'
}


function getCommunitySettings() {
	return api.call('lime-utils', 'get_community_settings', {})
		.then(res => ({...res, DEFAULT_COMMUNITY_SETTINGS }))
		.catch(() => DEFAULT_COMMUNITY_SETTINGS);
}

export function useCommunitySettings() {
	return useQuery(['lime-utils', 'get_community_settings'], getCommunitySettings, {
		initialData: DEFAULT_COMMUNITY_SETTINGS,
		initialStale: true
	})
}

export function useBatHost(mac, outgoingIface, queryConfig) {
	return useQuery(['bat-hosts', 'get_bathost', mac, outgoingIface], async () => getBatHost(mac, outgoingIface), {
		retry: 3,
		...queryConfig
	});
}

export function useCheckInternet() {
	return useQuery(['check-internet', 'is_connected'], checkInternet);
}
