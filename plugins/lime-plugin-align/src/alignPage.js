import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { useBatHost } from 'utils/queries';
import { useAssocList, useMeshIfaces } from './alignQueries';
import { ifaceToRadioNumber } from './utils';
import { SignalBar } from './components/signalBar';
import { SecondsAgo } from './components/secondsAgo';
import I18n from 'i18n-js';

import Loading from 'components/loading';
import { List, ListItem } from 'components/list';
import Tabs from 'components/tabs';
import style from './style.less';
import { route } from 'preact-router';

export const AssocRow = ({station, iface}) => {
	const { data: bathost, isLoading, isError } = useBatHost(station.mac, iface);
	
	function goToAlignSingle() {
		route(`/align-single/${iface}/${station.mac}`)
	}

	return (
		<ListItem onClick={goToAlignSingle} >
			<div>
				{( isLoading || isError ?
					<div class={`${style.fetchingName} withLoadingEllipsis`}>
						{ I18n.t('Fetching name') }
					</div>
					:
					<div class={style.stationHostname}>
						{ bathost.hostname }
					</div>
				)}
				{ bathost && bathost.iface &&
					<div> {I18n.t("On its radio %{radio}", {radio: ifaceToRadioNumber(bathost.iface)}) }</div>
				}
				{ station.inactive >= 3000 && (
					<div>
						<div>{I18n.t('Signal lost')}</div>
						<div>{`${I18n.t('Last packet')}:`} <SecondsAgo initialMs={station.inactive} isStatic /></div>
					</div>
				)}
			</div>
			{station.inactive >= 3000 ? (
				<div class={style.signal}>
					X
					<SignalBar signal={null} className={style.bar} />
				</div>
			): (
				<div class={style.signal}>
					<div class="d-flex flex-grow-1 align-items-baseline">
						<div>{ station.signal }</div>
						<div class={style.unit}>dBm</div>
					</div>
					<SignalBar signal={station.signal} className={style.bar} />
				</div>
			)}
		</ListItem>
	)
}

export const AssocList = ({iface}) => {
	const { data: assoclist, isLoading } = useAssocList(iface, {
		refetchInterval: 2000
	});

	if (isLoading) {
		return <div className="container container-center"><Loading /></div>
	}

	return (
		<List>
			{assoclist.length > 0 &&
				<div class={style.assoclistHeader}>{I18n.t("These are the nodes associated on this radio")}</div>
			}
			{assoclist.map(station => <AssocRow key={station.mac} station={station} iface={iface} />)}
			{assoclist.length === 0 &&
				<div className="container-center">
					{I18n.t("This radio is not associated with other nodes")}
				</div>
			}
		</List>
	)
}


export const Align = ({}) => {
	const [ tabs, setTabs ] = useState([]);
	const [ selectedIface, setSelectedIface ] = useState(null);
	const { data: ifaces, isLoading } = useMeshIfaces();

	useEffect(() => {
		if (!ifaces) return;
		const tabs = ifaces.sort().map(iface => ({
			key: iface,
			repr: I18n.t("Radio").concat(` ${ifaceToRadioNumber(iface)}`)
		}))
		setTabs(tabs);
		if (ifaces.length > 0) {
			setSelectedIface(ifaces[0]);
		}
	}, [ifaces])

	if (isLoading) {
		return <div className="container container-center"><Loading /></div>
	}

	if (!ifaces || ifaces.length === 0) {
		return <div className="container container-center">
			{I18n.t('The are not mesh interfaces available')}
		</div>
	}

	return (
		<div class="d-flex flex-column flex-grow-1 overflow-auto">
			<Tabs tabs={tabs} current={selectedIface} onChange={setSelectedIface} />
			{selectedIface && <AssocList iface={selectedIface} />}
		</div>
	);
}

export default Align;
