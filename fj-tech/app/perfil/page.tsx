import React from "react";
import { subtitle, title } from "@/components/primitives";
import {Input} from "@nextui-org/input";

export default function VoluntariosPage() {
	return (
		<div>
			<h1 className={title()}>Perfil do Voluntário</h1>
			<h2 className={subtitle({ class: "mt-4" })}>
				[nome completo]
			</h2>
            <div>
                
            </div>            
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input type="email" variant="underlined" label="Email" />
                <Input type="email" variant="underlined" label="Email" placeholder="Enter your email" />
            </div>
		</div>				
	);
}
