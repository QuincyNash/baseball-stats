import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Baseball Stats</title>
				<meta name="description" content="Baseball Stats" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="w-full h-full overflow-auto">
				<div className="w-fit grid-rows-9 gap-lg grid grid-cols-8 bg-black border-2 border-black">
					{Array.from({ length: 72 }).map((_, i) => (
						<div key={i} className="bg-white">
							<div className="gap-sm grid grid-cols-4 grid-rows-2 bg-black border-b border-black">
								{Array.from({ length: 8 }).map((_, i2) => (
									<div key={i2} className="w-5 h-4 bg-white"></div>
								))}
							</div>
							<div className="gap-sm flex flex-row bg-black">
								<div className="w-12 h-8 bg-white">
									<div className="w-fit gap-sm grid grid-cols-2 bg-black border-b border-r border-black">
										<div className="w-5 h-3 bg-white"></div>
										<div className="w-5 h-3 bg-white"></div>
									</div>
									<div className="h-5"></div>
								</div>
								<div className="w-md flex items-center justify-center h-8 bg-white">
									<div className="flex items-center justify-center w-8 h-8 rotate-45">
										<div className="grid-cols-auto2 grid content-between justify-between w-5 h-5 border border-black">
											<div className="w-1 h-1 border-b border-r border-black"></div>
											<div className="w-1 h-1 border-b border-l border-black"></div>
											<div className="w-1 h-1 border-t border-r border-black"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
}
