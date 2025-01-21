import React from 'react'

function ResearchComp() {
  return (
    <div>
<div className="mt-5 text-2xl text-center text-white">
    Citation Bias in Computing Literature
</div>

<div className="flex flex-col md:flex-row items-center md:items-start mt-4 text-white text-lg">
    <div className="md:w-2/3">
        <p className="mb-4">
            As an Undergraduate Researcher at the <strong>DARE! Lab at York University</strong>, I focused on detecting and mitigating citation biases in computing literature. My research involved:
        </p>

        <ul className="list-disc list-inside space-y-2">
            <li>
                Conducting a bibliographic analysis of <strong>90,000 research articles</strong> from top software engineering journals (2009-2024).
            </li>
            <li>
                Developing data processing scripts using <strong>Python</strong> to extract and analyze citation patterns.
            </li>
            <li>
                Integrating external APIs such as <strong>CrossRef</strong> and <strong>Gender-API</strong> to classify author demographics.
            </li>
            <li>
                Storing and managing data efficiently using <strong>MongoDB</strong>.
            </li>
            <li>
                Identifying trends showing that women are under-cited and men are over-cited, with disparities increasing over time.
            </li>
            <li>
                Presenting research findings at the <strong>2024 Lassonde Undergraduate Research Conference</strong> and the <strong>2024 Canadian Celebration of Women in Computing</strong>.
            </li>
        </ul>
    </div>

    <div className="md:w-1/3 flex justify-center mt-5 md:mt-0 md:ml-5">
        <img src="/figs/bias.png" alt="Citation Bias Graph" className="w-full max-w-sm rounded-lg shadow-lg" />
    </div>
</div>


    </div>
  )
}

export default ResearchComp
