import {
	LOAD_ACTIVE_VOUCHERS, LOAD_ACTIVE_VOUCHERS_SUCCESS, LOAD_ACTIVE_VOUCHERS_ERROR,
	LOAD_GOVERNANCE, LOAD_GOVERNANCE_SUCCESS, LOAD_GOVERNANCE_ERROR,
	LOAD_STATUS, LOAD_STATUS_SUCCESS, LOAD_STATUS_ERROR,
	LOAD_VOUCHERS, LOAD_VOUCHERS_SUCCESS, LOAD_VOUCHERS_ERROR,
	LOAD_CONTENT, LOAD_CONTENT_SUCCESS, LOAD_CONTENT_ERROR,
	ENABLE, ENABLE_SUCCESS, ENABLE_ERROR,
	DISABLE, DISABLE_SUCCESS, DISABLE_ERROR,
	CREATE_MEMBER_VOUCHER, CREATE_MEMBER_VOUCHER_SUCCESS, CREATE_MEMBER_VOUCHER_ERROR,
	CREATE_VISITOR_VOUCHER, CREATE_VISITOR_VOUCHER_SUCCESS, CREATE_VISITOR_VOUCHER_ERROR,
	RENEW_MEMBER_VOUCHERS, RENEW_MEMBER_VOUCHERS_SUCCESS, RENEW_MEMBER_VOUCHERS_ERROR,
	REMOVE_VOUCHER, REMOVE_VOUCHER_SUCCESS, REMOVE_VOUCHER_ERROR,
	WRITE_GOVERNANCE, WRITE_GOVERNANCE_SUCCESS, WRITE_GOVERNANCE_ERROR,
	WRITE_CONTENT, WRITE_CONTENT_SUCCESS, WRITE_CONTENT_ERROR
} from './piraniaConstants';

export const initialState = {
	governance: null,
	loading: false,
	vouchers: null,
	createVoucher: null,
	status: undefined,
	content: null
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_ACTIVE_VOUCHERS:
		case LOAD_GOVERNANCE:
		case LOAD_STATUS:
		case LOAD_VOUCHERS:
		case LOAD_CONTENT:
		case ENABLE:
		case DISABLE:
		case CREATE_VISITOR_VOUCHER:
		case CREATE_MEMBER_VOUCHER:
		case RENEW_MEMBER_VOUCHERS:
		case REMOVE_VOUCHER:
		case WRITE_GOVERNANCE:
		case WRITE_CONTENT:
			return Object.assign({}, state, { loading: true });
		case LOAD_ACTIVE_VOUCHERS_SUCCESS:
			return Object.assign({}, state, { activeVouchers: payload, loading: false });
		case LOAD_ACTIVE_VOUCHERS_ERROR:
			return Object.assign({}, state, { activeVouchers: { error: payload.message }, loading: false });
		case LOAD_GOVERNANCE_SUCCESS:
			return Object.assign({}, state, { governance: payload, loading: false });
		case LOAD_GOVERNANCE_ERROR:
			return Object.assign({}, state, { governance: { error: payload.message }, loading: false });
		case LOAD_CONTENT_SUCCESS:
			return Object.assign({}, state, { content: payload, loading: false });
		case LOAD_CONTENT_ERROR:
			return Object.assign({}, state, { content: { error: payload.message }, loading: false });
		case LOAD_VOUCHERS_SUCCESS:
			return Object.assign({}, state, { vouchers: payload.vouchers, loading: false });
		case LOAD_VOUCHERS_ERROR:
			return Object.assign({}, state, { vouchers: { error: payload.message }, loading: false });
		case LOAD_STATUS_SUCCESS:
			return Object.assign({}, state, { status: payload.enabled, loading: false });
		case ENABLE_SUCCESS:
			return Object.assign({}, state, { status: true, loading: false });
		case DISABLE_SUCCESS:
			return Object.assign({}, state, { status: false, loading: false });
		case REMOVE_VOUCHER_SUCCESS:
		case CREATE_MEMBER_VOUCHER_SUCCESS:
		case CREATE_VISITOR_VOUCHER_SUCCESS:
			return Object.assign({}, state, { createVoucher: payload, loading: false });
		case RENEW_MEMBER_VOUCHERS_SUCCESS:
			return Object.assign({}, state, { renewed: payload, loading: false });
		case WRITE_GOVERNANCE_SUCCESS:
		case WRITE_CONTENT_SUCCESS:
		case LOAD_STATUS_ERROR:
		case ENABLE_ERROR:
		case DISABLE_ERROR:
		case CREATE_MEMBER_VOUCHER_ERROR:
		case CREATE_VISITOR_VOUCHER_ERROR:
		case RENEW_MEMBER_VOUCHERS_ERROR:
		case REMOVE_VOUCHER_ERROR:
		case WRITE_GOVERNANCE_ERROR:
		case WRITE_CONTENT_ERROR:
			return Object.assign({}, state, { loading: false });
		default:
			return state;
	}
};
