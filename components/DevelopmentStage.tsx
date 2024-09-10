const DevelopmentStage = ({developmentPhase}: { developmentPhase: string }) => {

    const bgColor = () => {
        if (developmentPhase == "Planning") {
            return "bg-[#63E0AB]"
        } else if(developmentPhase == "Development") {
            return "bg-[#63E0D6]"
        } else if (developmentPhase == "Testing") {
            return "bg-[#63C2E0]"
        } else {
            return "bg-[#639BE0]"
        }
    }

    return(
        <>
            <div className={`flex ${bgColor()} opacity-80 w-[95%] px-2 h-fit pt-1 items-center justify-center rounded-md drop-shadow-xl`}>
                <p className="p-3 items-center justify-center text-xl font-semibold text-white">{developmentPhase}</p>
            </div>
        </>
    )
}

export default DevelopmentStage