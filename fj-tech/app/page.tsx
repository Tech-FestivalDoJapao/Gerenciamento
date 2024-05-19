import React from "react";
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

export default function Home() {
	return (
		<div className="justify-center">						
			<div className="text-center mb-4">
				<h1 className={title({ class: "mt-4" })}>Início</h1>		
			</div>		
			<div className="mt-4 gap-4 grid grid-cols-1 sm:grid-cols-3">
				{siteConfig.cardsHomepage.map((item) => (
					<Card 						
						key={item.href} isPressable	
						className="flex gap-3 bg-default/60 dark:bg-default-100/50"
						href={item.href}
					>
						<CardHeader 
							className="gap-2 grid grid-rows-1 sm:grid-rows-2"
						/>
						<CardBody> {item.label} </CardBody>
						<CardFooter 
							className="justify-between bg-red-500"
						>
							<Link
								href={item.href}
								color="foreground"
								className="text-small text-default-500"
								showAnchorIcon
							>
								Acessar
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>			
		</div>
	);
}
