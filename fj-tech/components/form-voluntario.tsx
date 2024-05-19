import React from "react";
import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/react";

export const FormDoVoluntario = () => {
	return (
        <form>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input type="email" variant="underlined"label="E-mail" />
                <Input type="text" variant="underlined" label="Nome completo" />
				<Input type="number" variant="underlined" label="Idade" />
			</div>
			<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
				<RadioGroup label="Sexo" orientation="horizontal">
					<Radio value="feminino">Feminino</Radio>
					<Radio value="masculino">Masculino</Radio>
				</RadioGroup>
				<Input type="text" variant="underlined" label="CPF" placeholder="xxx.xxx.xxx-xx" />
            </div>
        </form>
	);
};