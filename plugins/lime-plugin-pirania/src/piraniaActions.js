import {
	LOAD_ACTIVE_VOUCHERS,
	LOAD_GOVERNANCE,
	LOAD_CONTENT,
	LOAD_VOUCHERS,
	LOAD_STATUS,
	ENABLE,
	DISABLE,
	CREATE_MEMBER_VOUCHER,
	CREATE_VISITOR_VOUCHER,
	RENEW_MEMBER_VOUCHERS,
	WRITE_GOVERNANCE,
	WRITE_CONTENT,
	REMOVE_VOUCHER
} from './piraniaConstants';

export const getActiveVouchers = () => ({
	type: LOAD_ACTIVE_VOUCHERS
});

export const getStatus = () => ({
	type: LOAD_STATUS
});

export const getPiraniaGovernance = () => ({
	type: LOAD_GOVERNANCE
});

export const getPiraniaContent = () => ({
	type: LOAD_CONTENT
});

export const getVoucherList = () => ({
	type: LOAD_VOUCHERS
});

export const enable = () => ({
	type: ENABLE
});

export const disable = () => ({
	type: DISABLE
});

export const createMemberVoucher = (payload) => ({
	type: CREATE_MEMBER_VOUCHER,
	payload
});

export const createVisitorVoucher = (payload) => ({
	type: CREATE_VISITOR_VOUCHER,
	payload
});

export const renewVouchers = (payload) => ({
	type: RENEW_MEMBER_VOUCHERS,
	payload
});

export const removeVoucher = (payload) => ({
	type: REMOVE_VOUCHER,
	payload
});

export const writeGovernance = (payload) => ({
	type: WRITE_GOVERNANCE,
	payload
});

export const writeContent = (payload) => ({
	type: WRITE_CONTENT,
	payload
});
