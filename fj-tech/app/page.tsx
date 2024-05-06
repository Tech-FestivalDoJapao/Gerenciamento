import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

export default function Home() {
	return (
		<div>
			<h1 className={title()}>Home</h1>
			<div className="flex gap-4 grid grid-cols-2 sm:grid-cols-3">
				{siteConfig.navItems.map((item) => (
					<Card 
						key={item.href} isPressable	
						className="flex gap-2"
					>
						<CardHeader 
							className="gap-2 grid grid-rows-1 sm:grid-rows-2"
						/>
						<CardBody>
							{item.label}
						</CardBody>
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
