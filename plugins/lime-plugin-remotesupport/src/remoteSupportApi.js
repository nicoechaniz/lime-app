import api from 'utils/uhttpd.service';

export function getSession() {
	return api.call("lime-remotesupport", "get_session", {}).toPromise()
		.then(result => result.session !== 'not initialized' ? result.session : null)
}

export function openSession() {
	return api.call("lime-remotesupport", "open_session", {}).toPromise()
}

export function closeSession() {
	return api.call("lime-remotesupport", "close_session", {}).toPromise()
}
