import React from "react";
import { subtitle, title } from "@/components/primitives";
import TabelaDeVoluntarios from "@/components/tabela-voluntarios";

export default function VoluntariosPage() {
	return (
		<div>
			<h1 className={title()}>Voluntários</h1>
			<h2 className={subtitle({ class: "mt-4" })}>
				Lista de voluntários cadastrados no evento
			</h2>
			<div>
				<TabelaDeVoluntarios />
			</div>
		</div>				
	);
}
