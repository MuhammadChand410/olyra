

export default function Note() {
    return (
        <section>
            <div className="p-3 rounded-xl border border-[#805F00] bg-[#FDF7E6] flex items-start md:items-center gap-2.5">
                <span className="text-lg text-[#805F00] font-normal font-serif">Notice:</span>
                <p className="text-sm font-normal text-[#805F00]">This app does not provide medical advice, does not replace a doctor, and you should always contact a healthcare for medical concerns.</p>
            </div>
        </section>
    )
}