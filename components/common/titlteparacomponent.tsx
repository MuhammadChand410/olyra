interface TitleParaProps {
    title: string;
    description: string;
}

export default function TitlePara({ title, description }: TitleParaProps) {
    return (
        <div className="">
            <h4 className="text-xl font-semibold text-[#181D27]">{title}</h4>
            <p className="text-sm font-normal text-[#414651]">{description}</p>
        </div>
    )
}