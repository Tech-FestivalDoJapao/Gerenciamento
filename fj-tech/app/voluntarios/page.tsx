import React from "react";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { TabelaDeVoluntarios } from "@/components/tabela-voluntarios";

export default function VoluntariosPage() {
	return (
		<div>
			<h1 className={title()}>Voluntários</h1>
			<h2 className={subtitle({ class: "mt-4" })}>
				Lista de voluntários cadastrados no evento
			</h2>
			<div>
				<Button 
					href="/perfil"
					as={Link}
					color="primary"
					variant="solid"
				>
					Acessar perfil
				</Button>
				<TabelaDeVoluntarios />
			</div>
		</div>				
	);
}
