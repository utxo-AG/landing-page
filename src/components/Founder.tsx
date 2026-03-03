export default function Founder() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[760px] mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Headshot placeholder */}
          <div className="shrink-0">
            <img
              src="/patrick.jpg"
              alt="Patrick Tobler"
              className="w-[120px] h-[120px] rounded-full object-cover border border-[#e8e8e8]"
            />
          </div>

          <div>
            <blockquote className="text-[17px] md:text-[19px] leading-[1.65] text-[#555] mb-5">
              &ldquo;We believe the best AI tools disappear into workflows you already use.
              No dashboards to learn, no apps to install — just email. That&apos;s how work
              should be.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[15px] font-bold tracking-[-0.2px]">Patrick Tobler</p>
                <p className="text-[13px] text-[#999]">Founder &amp; CEO · Speaker at Cardano Summit &amp; World Economic Forum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
