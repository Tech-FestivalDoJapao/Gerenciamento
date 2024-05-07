import React from "react";
import { title, subtitle } from "@/components/primitives";

export default function RecursosPage() {
	return (
		<div>
			<h1 className={title()}>Gerenciador de Recursos</h1>
			<h2 className={subtitle({ class: "mt-4" })}>
				Credenciais, hapis e vouchers alimentícios
			</h2>		
		</div>
	);
}
