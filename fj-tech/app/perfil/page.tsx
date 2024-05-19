import React from "react";
import { subtitle, title } from "@/components/primitives";
import { FormDoVoluntario } from "@/components/form-voluntario";

export default function VoluntariosPage() {
	return (
		<div>
			<h1 className={title()}>Perfil do Voluntário</h1>
			<h2 className={subtitle({ class: "mt-2 mb-4 text-red-400" })}>
				[código da credencial]
			</h2>
            <div>   
				<FormDoVoluntario />             
            </div>        
		</div>				
	);
}
