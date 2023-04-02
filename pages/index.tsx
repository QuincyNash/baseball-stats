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
			<main className="flex items-center justify-center w-full h-full">
				<div className="w-fit grid grid-cols-8 grid-rows-[repeat(9,minmax(0,1fr))] gap-0.5 bg-black border-2 border-black">
					{Array.from({ length: 72 }).map((_, i) => (
						<div key={i} className="bg-white">
							<div className="grid grid-cols-4 grid-rows-2 gap-[1px] bg-black border-b border-black">
								{Array.from({ length: 8 }).map((_, i2) => (
									<div key={i2} className="w-[25px] h-[20px] bg-white"></div>
								))}
							</div>
							<div className="flex flex-row gap-[1px] bg-black">
								<div className="w-[60px] h-10 bg-white">
									<div className="w-fit grid grid-cols-2 gap-[1px] bg-black border-b border-r border-black">
										<div className="w-[25px] h-[15px] bg-white"></div>
										<div className="w-[25px] h-[15px] bg-white"></div>
									</div>
									<div className="h-[25px]"></div>
								</div>
								<div className="flex items-center justify-center w-[42px] h-10 bg-white">
									<div className="flex items-center justify-center w-10 h-10 rotate-45">
										<div className="grid content-between justify-between w-5 h-5 grid-cols-[auto,auto] border border-black">
											<div className="w-[5px] h-[5px] border-black border-r border-b"></div>
											<div className="w-[5px] h-[5px] border-black border-l border-b"></div>
											<div className="w-[5px] h-[5px] border-black border-r border-t"></div>
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
