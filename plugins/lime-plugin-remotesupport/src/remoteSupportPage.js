import { h } from 'preact';
import { useSession, useOpenSession, useCloseSession } from './remoteSupportQueries';
import { useState } from 'preact/hooks';

const RemoteSupportPage = () => {
	const {data: session} = useSession();
	const [consoleViewable, setConsoleViewable] = useState(false);
	const [openSession] = useOpenSession();
	const [closeSession] = useCloseSession();
	const onConsoleViewToggle = () => { setConsoleViewable(prev => !prev) }

	return <RemoteSupportPage_ session={session} onConsoleViewToggle={onConsoleViewToggle} onOpenSession={openSession} onCloseSession={closeSession} />;
};


export const RemoteSupportPage_ = ({session, consoleViewable=false, remoteHostAccesible=true, onOpenSession, onConsoleViewToggle, onCloseSession}) => {
	return <div>
		{!remoteHostAccesible &&
			<div> El host remoto está inaccesible, verifique la conexión con la internet para usar esta funcionalidad. </div>}
		{remoteHostAccesible && 
			<div> Hay conexión a internet, puede usar esta funcionalidad.</div>}
		{!session && remoteHostAccesible &&
			<div>
				No hay sesion abierta.
				<button onClick={onOpenSession}>Crear sesion</button>
			</div>
		}
		{session && remoteHostAccesible && !consoleViewable &&
			<div>
				Sesión abierta.<br/>
				Consola interactiva.
				<pre>{session.rw_ssh}</pre>
				Copie el texto de este cuadro y compártalo con quien le de soporte.
				<button onClick={onConsoleViewToggle}>ver</button>
				<button onClick={onCloseSession}>Cerrar sesion</button>
			</div>
		}
		{session && remoteHostAccesible && consoleViewable &&
			<div>
				<button onClick={onConsoleViewToggle}>Cerrar ventana</button>
				<button onClick={onCloseSession}>Cerrar sesion</button>
			</div>
		}
	</div>
}

export default RemoteSupportPage;